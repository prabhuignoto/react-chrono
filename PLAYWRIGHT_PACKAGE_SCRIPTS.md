# Playwright Package.json Updates

Add these scripts to your package.json:

```json
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:chrome": "playwright test --project=chromium",
    "test:e2e:firefox": "playwright test --project=firefox",
    "test:e2e:webkit": "playwright test --project=webkit",
    "test:e2e:mobile": "playwright test --project='Mobile Chrome' --project='Mobile Safari'",
    "test:ct": "playwright test -c playwright-ct.config.ts",
    "test:ct:ui": "playwright test -c playwright-ct.config.ts --ui",
    "test:report": "playwright show-report",
    "test:trace": "playwright show-trace",
    "test:install": "playwright install --with-deps",
    "test:codegen": "playwright codegen",
    "test:update-snapshots": "playwright test --update-snapshots",
    "test:ci": "playwright test --reporter=github --reporter=html",
    "test:shard": "playwright test --shard=$SHARD"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@playwright/experimental-ct-react": "^1.40.0"
  }
}
```

## Installation Commands

```bash
# Install Playwright
pnpm add -D @playwright/test @playwright/experimental-ct-react

# Install browsers
pnpm exec playwright install --with-deps

# Or install specific browsers only
pnpm exec playwright install chromium firefox webkit
```

## Running Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run in UI mode (recommended for development)
pnpm test:e2e:ui

# Run component tests
pnpm test:ct

# Run specific test file
pnpm test:e2e tests/e2e/timeline-horizontal.spec.ts

# Run tests in headed mode
pnpm test:e2e:headed

# Run only Chrome tests
pnpm test:e2e:chrome

# Generate new tests with codegen
pnpm test:codegen http://localhost:4444

# Update visual snapshots
pnpm test:update-snapshots

# View test report
pnpm test:report

# View trace file
pnpm test:trace trace.zip
```

## Debugging

```bash
# Debug mode with Playwright Inspector
pnpm test:e2e:debug

# Run with verbose logging
DEBUG=pw:api pnpm test:e2e

# Run single test in debug mode
pnpm test:e2e:debug -g "should display correct number of timeline items"
```

## CI/CD

```bash
# Run in CI mode with GitHub Actions reporter
pnpm test:ci

# Run with sharding (for parallel CI)
SHARD=1/4 pnpm test:shard
SHARD=2/4 pnpm test:shard
# etc...
```