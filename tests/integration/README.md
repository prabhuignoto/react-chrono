# Integration Tests

This directory contains integration tests for the React Chrono library build output.

## Test Files

### `build-output.test.ts`
Validates the Vite build output to ensure:
- ESM and CJS bundles are generated correctly
- TypeScript definitions are created
- **Vanilla Extract CSS assets are bundled and minified**
- **CSS contains design tokens (CSS custom properties)**
- **No source .css.ts references in production CSS**
- Bundles meet size limits
- Package.json exports are configured correctly
- Peer dependencies are externalized

### `demo-app.e2e.test.ts`
End-to-end test using Playwright that:
- Builds the library with Vite
- Installs the built package in a demo React app (using `file:` protocol)
- Launches the demo app in a real browser
- **Verifies timeline component renders in the DOM**
- **Validates Vanilla Extract CSS is loaded and applied correctly** (computed styles check)
- **Checks for Vanilla Extract hash-based class names**
- **Verifies CSS custom properties (design tokens) are applied**
- **Tests timeline items and cards are visible and styled**
- Checks navigation controls are functional
- Monitors for console errors during rendering
- Validates TypeScript types work correctly
- Ensures the demo app builds successfully

## Running Tests

```bash
# Run build validation tests (Vitest)
pnpm vitest run tests/integration/build-output.test.ts

# Run E2E integration tests (Playwright - validates rendering and CSS)
pnpm test:integration

# Run E2E tests with UI mode (interactive debugging)
pnpm test:integration:ui

# Run E2E tests in headed mode (visible browser)
pnpm test:integration:headed
```

## Demo App

The `demo-app/` directory contains a minimal React application that imports `react-chrono` from the built package (`file:../../../`). This ensures the package can be consumed correctly in a real-world scenario.

### Demo App Structure
- `package.json` - Uses `file:` protocol to reference the parent package
- `src/App.tsx` - Simple timeline implementation
- `vite.config.ts` - Standard Vite configuration

### Testing the Demo App Manually

```bash
# Build the library
pnpm build

# Navigate to demo app
cd tests/integration/demo-app

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build demo app
pnpm build
```

## Why These Tests Matter

These integration tests provide confidence that:
1. **Build Artifacts** - The Vite build produces valid ESM/CJS bundles and TypeScript definitions
2. **Real-World Usage** - The package can be imported and used in real React applications
3. **Rendering Validation** - Timeline component actually renders in a browser (not just builds)
4. **Vanilla Extract CSS** - Styles generated from `.css.ts` files are correctly bundled, minified, and applied
5. **Design Tokens** - CSS custom properties (design tokens) are present and functional
6. **Style Application** - Computed styles verify CSS is loaded and active in the browser
7. **TypeScript Support** - Types are correctly generated and usable in consuming apps
8. **Bundle Quality** - Build output meets size limits and minification standards

This is critical for catching issues before publishing to npm, ensuring the package works end-to-end in production scenarios. The Vanilla Extract specific tests ensure the migration from styled-components is complete and functional.
