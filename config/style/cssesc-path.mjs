import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function resolveCssescDistPath() {
  const nodeModulesDir = path.resolve(__dirname, '../../node_modules');
  
  // Try pnpm layout first
  const pnpmDir = path.resolve(nodeModulesDir, '.pnpm');
  if (fs.existsSync(pnpmDir)) {
    const entries = fs.readdirSync(pnpmDir, { withFileTypes: true });
    const cssescEntry = entries.find(
      (entry) => entry.isDirectory() && entry.name.startsWith('cssesc@'),
    );

    if (cssescEntry) {
      const candidate = path.join(
        pnpmDir,
        cssescEntry.name,
        'node_modules',
        'cssesc',
        'cssesc.js',
      );

      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  // Try standard npm/bun layout (hoisted to root)
  const standardPath = path.join(nodeModulesDir, 'cssesc', 'cssesc.js');
  if (fs.existsSync(standardPath)) {
    return standardPath;
  }

  // Try nested in @vanilla-extract/css (common for transitive dependencies)
  const nestedPath = path.join(
    nodeModulesDir,
    '@vanilla-extract',
    'css',
    'node_modules',
    'cssesc',
    'cssesc.js',
  );
  if (fs.existsSync(nestedPath)) {
    return nestedPath;
  }

  // Try using Node's module resolution as a last resort
  try {
    const resolved = require.resolve('cssesc/cssesc.js');
    if (fs.existsSync(resolved)) {
      return resolved;
    }
  } catch {
    // require.resolve failed, continue to error
  }

  throw new Error(
    'Unable to locate "cssesc" in node_modules. Tried:\n' +
    '  - pnpm layout (.pnpm/cssesc@*/node_modules/cssesc/cssesc.js)\n' +
    '  - standard layout (node_modules/cssesc/cssesc.js)\n' +
    '  - nested layout (node_modules/@vanilla-extract/css/node_modules/cssesc/cssesc.js)\n' +
    '  - Node module resolution (require.resolve)',
  );
}

export const cssescDistPath = resolveCssescDistPath();

