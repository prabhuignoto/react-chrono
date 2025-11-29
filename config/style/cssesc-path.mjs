import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolveCssescDistPath() {
  const pnpmDir = path.resolve(__dirname, '../../node_modules/.pnpm');
  if (!fs.existsSync(pnpmDir)) {
    throw new Error(
      'cssesc helper requires pnpm layout, but ".pnpm" directory was not found.',
    );
  }

  const entries = fs.readdirSync(pnpmDir, { withFileTypes: true });
  const cssescEntry = entries.find(
    (entry) => entry.isDirectory() && entry.name.startsWith('cssesc@'),
  );

  if (!cssescEntry) {
    throw new Error('Unable to locate "cssesc" in node_modules/.pnpm.');
  }

  const candidate = path.join(
    pnpmDir,
    cssescEntry.name,
    'node_modules',
    'cssesc',
    'cssesc.js',
  );

  if (!fs.existsSync(candidate)) {
    throw new Error(`Expected cssesc dist at ${candidate}, but it was missing.`);
  }

  return candidate;
}

export const cssescDistPath = resolveCssescDistPath();

