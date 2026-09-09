const { spawn } = require('child_process');

async function main() {
  const edge = spawn('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--window-size=1280,900',
    '--disable-gpu',
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  const res = await fetch('http://localhost:9223/json');
  const targets = await res.json();
  const pageTarget = targets.find((t) => t.type === 'page' && t.url.includes('localhost:3000'));
  
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  ws.onopen = async () => {
    await send('Runtime.enable');
    await send('Page.enable');

    await new Promise((r) => setTimeout(r, 2500));

    const testResults = await send('Runtime.evaluate', {
      expression: `
        (async function() {
          const results = [];

          // 1. Check Category Section
          const categorySection = document.getElementById('categories');
          if (!categorySection) return { error: '#categories not found' };

          const categoryCards = Array.from(categorySection.querySelectorAll('.group'));
          const categoryTitles = categoryCards.map(c => c.querySelector('h3')?.textContent?.trim());
          
          results.push({
            test: 'Category Cards Count is 6',
            count: categoryCards.length,
            pass: categoryCards.length === 6
          });

          results.push({
            test: 'Category Titles Ordered by sortOrder',
            titles: categoryTitles,
            pass: categoryTitles[0] === 'Celebration & Custom Cakes' &&
                  categoryTitles[1] === 'Artisan Pastries & Slices' &&
                  categoryTitles[2] === 'Artisanal Breads & Buns' &&
                  categoryTitles[3] === 'Savory Bakes & Patties' &&
                  categoryTitles[4] === 'Tea Bakes & Cookies' &&
                  categoryTitles[5] === 'Festive Gift Hampers'
          });

          // 2. Check Signature Section
          const signatureSection = document.getElementById('signature-cakes');
          if (!signatureSection) return { error: '#signature-cakes not found' };

          const productCards = Array.from(signatureSection.querySelectorAll('.group'));
          results.push({
            test: 'Signature Products Initial Count is 8',
            count: productCards.length,
            pass: productCards.length === 8
          });

          // 3. Test Occasion Filter: Click Anniversaries
          const anniversaryTab = Array.from(signatureSection.querySelectorAll('button')).find(b => b.textContent.includes('Anniversaries'));
          if (anniversaryTab) {
            anniversaryTab.click();
            await new Promise(r => setTimeout(r, 200));

            const anniversaryCards = Array.from(signatureSection.querySelectorAll('.group'));
            const anniversaryTitles = anniversaryCards.map(c => c.querySelector('h3')?.textContent?.trim());
            results.push({
              test: 'Anniversaries Filter shows Red Velvet',
              count: anniversaryCards.length,
              titles: anniversaryTitles,
              pass: anniversaryTitles.includes('Red Velvet')
            });
          }

          // 4. Test Occasion Filter: Click All Specials
          const allTab = Array.from(signatureSection.querySelectorAll('button')).find(b => b.textContent.includes('All 8 Specials'));
          if (allTab) {
            allTab.click();
            await new Promise(r => setTimeout(r, 200));

            const restoredCards = Array.from(signatureSection.querySelectorAll('.group'));
            results.push({
              test: 'All Specials restores 8 cards',
              count: restoredCards.length,
              pass: restoredCards.length === 8
            });
          }

          return results;
        })()
      `,
      awaitPromise: true,
      returnByValue: true
    });

    console.log('CATALOG_TEST_RESULTS:\n', JSON.stringify(testResults.result?.result?.value, null, 2));

    ws.close();
    edge.kill();
    process.exit(0);
  };
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});