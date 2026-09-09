import { spawn, execSync } from 'child_process';
import fs from 'fs';

function killProcessTree(pid) {
  try {
    execSync(`taskkill /T /F /PID ${pid}`, { stdio: 'ignore' });
  } catch (_) {}
}

function freePort3000() {
  try {
    const out = execSync('netstat -ano | findstr :3000', { encoding: 'utf8' });
    const lines = out.trim().split('\n');
    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const pid = parts[parts.length - 1];
      if (pid && !isNaN(pid) && pid !== '0') {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
        } catch (_) {}
      }
    }
  } catch (_) {}
}

async function runColdStartTest(iteration) {
  console.log(`\n======================================================`);
  console.log(`TEST RUN #${iteration}: Cold Start Verification`);
  console.log(`======================================================`);

  // Ensure port 3000 is free
  freePort3000();

  // Clean .next cache to ensure 100% cold compilation
  if (fs.existsSync('.next')) {
    try {
      fs.rmSync('.next', { recursive: true, force: true });
      console.log('✓ Cache cleared (.next deleted)');
    } catch (e) {
      console.log('Notice: .next removal error:', e.message);
    }
  }

  // Spawn dev server with bounded timeout
  const dev = spawn('npm.cmd', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  const devPid = dev.pid;
  let devKilled = false;

  const cleanup = () => {
    if (!devKilled) {
      devKilled = true;
      if (devPid) killProcessTree(devPid);
      freePort3000();
    }
  };

  // Hard timeout: 45 seconds max for this entire run
  const timeoutId = setTimeout(() => {
    console.error('❌ RUN TIMEOUT EXCEEDED (45s)! Terminating...');
    cleanup();
    process.exit(1);
  }, 45000);

  try {
    // Wait for "Ready in" or "localhost:3000"
    await new Promise((resolve, reject) => {
      const onData = (data) => {
        const text = data.toString();
        if (text.includes('Ready in') || text.includes('localhost:3000')) {
          dev.stdout.off('data', onData);
          resolve();
        }
      };
      dev.stdout.on('data', onData);
      dev.on('error', reject);
      dev.on('exit', (code) => {
        if (code !== null && code !== 0) {
          reject(new Error(`Dev server exited prematurely with code ${code}`));
        }
      });
    });

    console.log('✓ Dev server ready on http://localhost:3000');

    // First cold GET /
    const t0 = Date.now();
    const res = await fetch('http://localhost:3000/');
    const html = await res.text();
    const htmlTime = Date.now() - t0;
    console.log(`✓ Cold HTML fetched: Status ${res.status}, ${html.length} bytes, in ${htmlTime}ms`);

    if (res.status !== 200 || html.length === 0) {
      throw new Error(`Cold HTML fetch failed: Status ${res.status}, length ${html.length}`);
    }

    // Extract all scripts
    const scriptSrcs = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/g)].map((m) => m[1]);
    console.log(`✓ Discovered ${scriptSrcs.length} client chunk scripts in initial HTML`);

    // Fetch all scripts concurrently as a browser would on cold load
    const chunkResults = await Promise.all(
      scriptSrcs.map(async (src) => {
        const url = src.startsWith('http') ? src : 'http://localhost:3000' + src;
        const st = Date.now();
        try {
          const r = await fetch(url);
          const body = await r.text();
          return {
            src,
            status: r.status,
            size: body.length,
            duration: Date.now() - st,
          };
        } catch (err) {
          return {
            src,
            status: 0,
            size: 0,
            duration: Date.now() - st,
            error: err.message,
          };
        }
      })
    );

    let failedChunks = 0;
    let zeroByteChunks = 0;

    for (const chunk of chunkResults) {
      if (chunk.status !== 200) {
        console.error(`❌ HTTP FAIL: ${chunk.src} -> Status ${chunk.status}`);
        failedChunks++;
      } else if (chunk.size === 0) {
        console.error(`❌ ZERO BYTES: ${chunk.src} -> 0 bytes served!`);
        zeroByteChunks++;
      } else {
        console.log(`  ✓ ${chunk.src} -> 200 OK (${chunk.size} bytes, ${chunk.duration}ms)`);
      }
    }

    if (failedChunks > 0 || zeroByteChunks > 0) {
      throw new Error(`COLD LOAD DEFECT: ${failedChunks} failed chunks, ${zeroByteChunks} zero-byte chunks!`);
    }

    console.log(`✓ PASSED RUN #${iteration}: 100% of chunks non-zero, full content delivered.`);
    return true;
  } finally {
    clearTimeout(timeoutId);
    cleanup();
    // Allow OS to release port
    await new Promise((r) => setTimeout(r, 1500));
  }
}

async function main() {
  const NUM_RUNS = 5;
  console.log(`Starting ${NUM_RUNS} consecutive cold-start verification runs...`);
  for (let i = 1; i <= NUM_RUNS; i++) {
    await runColdStartTest(i);
  }
  console.log(`\n======================================================`);
  console.log(`ALL ${NUM_RUNS} COLD-START RUNS PASSED WITH 100% INTEGRITY!`);
  console.log(`Zero 0-byte chunks. Zero ChunkLoadErrors. Zero hung processes.`);
  console.log(`======================================================\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error('Test Suite Failed:', err);
  freePort3000();
  process.exit(1);
});
