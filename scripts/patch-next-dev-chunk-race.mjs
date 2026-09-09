import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const PATCH_MARKER = '/* __KIDOLD_DEV_CHUNK_GUARD__ */';

export function applyPatch() {
  try {
    // 1. Patch node_modules/next/dist/lib/file-exists.js (CJS)
    const fileExistsCjsPath = path.join(rootDir, 'node_modules/next/dist/lib/file-exists.js');
    if (fs.existsSync(fileExistsCjsPath)) {
      let content = fs.readFileSync(fileExistsCjsPath, 'utf8');
      if (!content.includes(PATCH_MARKER)) {
        const target = 'async function fileExists(fileName, type) {';
        const replacement = `async function fileExists(fileName, type) {
    ${PATCH_MARKER}
    try {
        if (type === "file" && typeof fileName === "string" && fileName.includes("chunks") && fileName.endsWith(".js")) {
            let attempts = 0;
            while (attempts < 60) {
                try {
                    const stats = await _fs.promises.stat(fileName);
                    if (stats.isFile() && stats.size > 0) {
                        return true;
                    }
                } catch (e) {
                    if (!(0, _iserror.default)(e) || (e.code !== "ENOENT" && e.code !== "ENAMETOOLONG" && e.code !== "EBUSY" && e.code !== "EPERM")) {
                        throw e;
                    }
                }
                await new Promise((resolve) => setTimeout(resolve, 50));
                attempts++;
            }
        }
    } catch (_) {}`;
        if (content.includes(target)) {
          content = content.replace(target, replacement);
          fs.writeFileSync(fileExistsCjsPath, content, 'utf8');
          console.log('[patch-chunk-race] Patched next/dist/lib/file-exists.js');
        }
      }
    }

    // 2. Patch node_modules/next/dist/esm/lib/file-exists.js (ESM)
    const fileExistsEsmPath = path.join(rootDir, 'node_modules/next/dist/esm/lib/file-exists.js');
    if (fs.existsSync(fileExistsEsmPath)) {
      let content = fs.readFileSync(fileExistsEsmPath, 'utf8');
      if (!content.includes(PATCH_MARKER)) {
        const target = 'export async function fileExists(fileName, type) {';
        const replacement = `export async function fileExists(fileName, type) {
    ${PATCH_MARKER}
    try {
        if (type === "file" && typeof fileName === "string" && fileName.includes("chunks") && fileName.endsWith(".js")) {
            let attempts = 0;
            while (attempts < 60) {
                try {
                    const stats = await promises.stat(fileName);
                    if (stats.isFile() && stats.size > 0) {
                        return true;
                    }
                } catch (e) {
                    if (!isError(e) || (e.code !== "ENOENT" && e.code !== "ENAMETOOLONG" && e.code !== "EBUSY" && e.code !== "EPERM")) {
                        throw e;
                    }
                }
                await new Promise((resolve) => setTimeout(resolve, 50));
                attempts++;
            }
        }
    } catch (_) {}`;
        if (content.includes(target)) {
          content = content.replace(target, replacement);
          fs.writeFileSync(fileExistsEsmPath, content, 'utf8');
          console.log('[patch-chunk-race] Patched next/dist/esm/lib/file-exists.js');
        }
      }
    }

    // 3. Patch node_modules/next/dist/server/serve-static.js (CJS)
    const serveStaticCjsPath = path.join(rootDir, 'node_modules/next/dist/server/serve-static.js');
    if (fs.existsSync(serveStaticCjsPath)) {
      let content = fs.readFileSync(serveStaticCjsPath, 'utf8');
      if (!content.includes(PATCH_MARKER)) {
        const target = 'function serveStatic(req, res, path, opts) {';
        const replacement = `const _chunkFs = require("fs");
const _chunkPath = require("path");
async function serveStatic(req, res, path, opts) {
    \${PATCH_MARKER}
    if (opts && opts.root && typeof path === "string" && path.includes("chunks") && path.endsWith(".js")) {
        const fullChunkPath = _chunkPath.join(opts.root, path);
        let attempts = 0;
        let content = null;
        while (attempts < 60) {
            try {
                const buf = await _chunkFs.promises.readFile(fullChunkPath);
                if (buf && buf.length > 0) {
                    content = buf;
                    break;
                }
            } catch (e) {}
            await new Promise((resolve) => setTimeout(resolve, 50));
            attempts++;
        }
        if (content && content.length > 0) {
            if (!res.getHeader("Content-Type")) {
                res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
            }
            res.setHeader("Content-Length", content.length);
            res.end(content);
            return;
        }
    }`;
        if (content.includes(target)) {
          content = content.replace(target, replacement);
          fs.writeFileSync(serveStaticCjsPath, content, 'utf8');
          console.log('[patch-chunk-race] Patched next/dist/server/serve-static.js');
        }
      }
    }

    // 4. Patch node_modules/next/dist/esm/server/serve-static.js (ESM)
    const serveStaticEsmPath = path.join(rootDir, 'node_modules/next/dist/esm/server/serve-static.js');
    if (fs.existsSync(serveStaticEsmPath)) {
      let content = fs.readFileSync(serveStaticEsmPath, 'utf8');
      if (!content.includes(PATCH_MARKER)) {
        const target = 'export function serveStatic(req, res, path, opts) {';
        const replacement = `import _chunkFs from "fs";
import _chunkPath from "path";
export async function serveStatic(req, res, path, opts) {
    \${PATCH_MARKER}
    if (opts && opts.root && typeof path === "string" && path.includes("chunks") && path.endsWith(".js")) {
        const fullChunkPath = _chunkPath.join(opts.root, path);
        let attempts = 0;
        let content = null;
        while (attempts < 60) {
            try {
                const buf = await _chunkFs.promises.readFile(fullChunkPath);
                if (buf && buf.length > 0) {
                    content = buf;
                    break;
                }
            } catch (e) {}
            await new Promise((resolve) => setTimeout(resolve, 50));
            attempts++;
        }
        if (content && content.length > 0) {
            if (!res.getHeader("Content-Type")) {
                res.setHeader("Content-Type", "application/javascript; charset=UTF-8");
            }
            res.setHeader("Content-Length", content.length);
            res.end(content);
            return;
        }
    }`;
        if (content.includes(target)) {
          content = content.replace(target, replacement);
          fs.writeFileSync(serveStaticEsmPath, content, 'utf8');
          console.log('[patch-chunk-race] Patched next/dist/esm/server/serve-static.js');
        }
      }
    }
  } catch (err) {
    console.error('[patch-chunk-race] Warning: Failed to apply chunk guard:', err.message);
  }
}

applyPatch();
