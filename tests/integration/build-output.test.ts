import { describe, it, expect, beforeAll } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const DIST_DIR = resolve(__dirname, '../../dist');

describe('Build Output Validation', () => {
  beforeAll(() => {
    if (!existsSync(DIST_DIR)) {
      throw new Error(
        'dist directory does not exist. Run "pnpm build" before running integration tests.'
      );
    }
  });

  describe('ESM Bundle', () => {
    it('should generate index.esm.js', () => {
      const esmPath = resolve(DIST_DIR, 'index.esm.js');
      expect(existsSync(esmPath)).toBe(true);
    });

    it('should generate ESM source map', () => {
      const mapPath = resolve(DIST_DIR, 'index.esm.js.map');
      expect(existsSync(mapPath)).toBe(true);
    });

    it('should contain valid ES module exports', () => {
      const esmPath = resolve(DIST_DIR, 'index.esm.js');
      const content = readFileSync(esmPath, 'utf-8');

      // Should export Chrono component
      expect(content).toContain('export');
      expect(content).toContain('Chrono');
    });

    it('should externalize peer dependencies', () => {
      const esmPath = resolve(DIST_DIR, 'index.esm.js');
      const content = readFileSync(esmPath, 'utf-8');

      // Should not bundle React or React-DOM
      expect(content).not.toMatch(/function\s+createElement/);
      expect(content).not.toMatch(/react-dom\/client/);
    });
  });

  describe('CJS Bundle', () => {
    it('should generate index.cjs', () => {
      const cjsPath = resolve(DIST_DIR, 'index.cjs');
      expect(existsSync(cjsPath)).toBe(true);
    });

    it('should generate CJS source map', () => {
      const mapPath = resolve(DIST_DIR, 'index.cjs.map');
      expect(existsSync(mapPath)).toBe(true);
    });

    it('should contain valid CommonJS exports', () => {
      const cjsPath = resolve(DIST_DIR, 'index.cjs');
      const content = readFileSync(cjsPath, 'utf-8');

      // Should use CommonJS exports
      expect(content).toMatch(/exports\./);
      expect(content).toContain('Chrono');
    });
  });

  describe('TypeScript Definitions', () => {
    it('should generate types directory', () => {
      const typesPath = resolve(DIST_DIR, 'types');
      expect(existsSync(typesPath)).toBe(true);
    });

    it('should generate index.d.ts', () => {
      const indexDts = resolve(DIST_DIR, 'types/index.d.ts');
      expect(existsSync(indexDts)).toBe(true);
    });

    it('should contain Chrono component type definitions', () => {
      const indexDts = resolve(DIST_DIR, 'types/index.d.ts');
      const content = readFileSync(indexDts, 'utf-8');

      // Should export type definitions
      expect(content).toMatch(/export/);
    });

    it('should generate model type definitions', () => {
      const modelsPath = resolve(DIST_DIR, 'types/models');
      expect(existsSync(modelsPath)).toBe(true);
    });
  });

  describe('CSS Assets (Vanilla Extract)', () => {
    it('should generate CSS assets from Vanilla Extract', () => {
      const assetsPath = resolve(DIST_DIR, 'assets');
      expect(existsSync(assetsPath)).toBe(true);
    });

    it('should have minified CSS in production', () => {
      const assetsPath = resolve(DIST_DIR, 'assets');
      const files = require('fs').readdirSync(assetsPath);
      const cssFiles = files.filter((f: string) => f.endsWith('.css'));

      expect(cssFiles.length).toBeGreaterThan(0);

      // Check that CSS is minified (no unnecessary whitespace)
      const cssContent = readFileSync(
        resolve(assetsPath, cssFiles[0]),
        'utf-8'
      );

      // Minified CSS should not have excessive newlines
      const newlineCount = (cssContent.match(/\n/g) || []).length;
      expect(newlineCount).toBeLessThan(50); // Arbitrary but reasonable limit
    });

    it('should contain Vanilla Extract generated styles', () => {
      const assetsPath = resolve(DIST_DIR, 'assets');
      const files = require('fs').readdirSync(assetsPath);
      const cssFiles = files.filter((f: string) => f.endsWith('.css'));

      expect(cssFiles.length).toBeGreaterThan(0);

      const cssContent = readFileSync(
        resolve(assetsPath, cssFiles[0]),
        'utf-8'
      );

      // Vanilla Extract generates hash-based class names
      // Check for common patterns
      expect(cssContent.length).toBeGreaterThan(1000); // Should have substantial CSS

      // Should contain CSS custom properties (design tokens)
      // Vanilla Extract uses these for theming
      const hasCustomProps = cssContent.includes('--') ||
                            cssContent.includes('var(');
      expect(hasCustomProps).toBe(true);
    });

    it('should not contain source .css.ts references', () => {
      const assetsPath = resolve(DIST_DIR, 'assets');
      const files = require('fs').readdirSync(assetsPath);
      const cssFiles = files.filter((f: string) => f.endsWith('.css'));

      const cssContent = readFileSync(
        resolve(assetsPath, cssFiles[0]),
        'utf-8'
      );

      // Should not contain source file references
      expect(cssContent).not.toContain('.css.ts');
      expect(cssContent).not.toContain('src/');
    });
  });

  describe('Bundle Size', () => {
    it('should meet size limits for ESM bundle', () => {
      const esmPath = resolve(DIST_DIR, 'index.esm.js');
      const stats = require('fs').statSync(esmPath);
      const sizeInKB = stats.size / 1024;

      // Should be under 300KB (uncompressed)
      expect(sizeInKB).toBeLessThan(300);
    });

    it('should meet size limits for CJS bundle', () => {
      const cjsPath = resolve(DIST_DIR, 'index.cjs');
      const stats = require('fs').statSync(cjsPath);
      const sizeInKB = stats.size / 1024;

      // Should be under 300KB (uncompressed)
      expect(sizeInKB).toBeLessThan(300);
    });
  });

  describe('Package Exports', () => {
    it('should have valid package.json exports configuration', () => {
      const pkgPath = resolve(__dirname, '../../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

      expect(pkg.exports).toBeDefined();
      expect(pkg.exports['.']).toBeDefined();
      expect(pkg.exports['.'].types).toBe('./dist/types/index.d.ts');
      expect(pkg.exports['.'].import).toBe('./dist/index.esm.js');
      expect(pkg.exports['.'].require).toBe('./dist/index.cjs');
    });

    it('should have valid main/module/types fields', () => {
      const pkgPath = resolve(__dirname, '../../package.json');
      const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

      expect(pkg.main).toBe('dist/index.cjs');
      expect(pkg.module).toBe('dist/index.esm.js');
      expect(pkg.types).toBe('dist/types/index.d.ts');
    });
  });
});
