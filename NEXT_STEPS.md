# Next Steps: Running & Fixing Playwright Tests

**Status:** ✅ Configuration Complete | ⏳ Ready to Run Tests
**Date:** October 27, 2025

---

## ✅ What's Complete

1. ✅ **All Playwright configs modernized** (3 configs with cross-browser support)
2. ✅ **GitHub Actions workflow created** (`.github/workflows/playwright.yml`)
3. ✅ **CI workflow updated** (`.github/workflows/ci.yml`)
4. ✅ **New test file created** (`tests/e2e/timeline-nested-keyboard-nav.spec.ts`)
5. ✅ **Test fixtures enhanced** with modern helpers
6. ✅ **Documentation updated** (CLAUDE.md)
7. ✅ **Chromium browser installed** (Playwright ready)
8. ✅ **Summary documents created** (this file + PLAYWRIGHT_SETUP_COMPLETE.md)

---

## 🚀 Immediate Next Steps (Required)

### Step 1: Run Tests with Dev Server

The Playwright tests require the dev server to be running. Run:

```bash
# Terminal 1: Start dev server
pnpm dev

# Terminal 2 (in another terminal): Run tests
pnpm test:e2e:chrome
```

**Expected Result:**
- Some tests will pass ✅
- Some tests will fail ❌ (expected on first run)
- You'll get HTML report, screenshots, and videos of failures

### Step 2: Review Test Results

```bash
# Open the HTML report
pnpm run test:report
```

**Look for:**
- Routes that don't exist or need updating
- Selectors that need fixing
- Timing issues
- Component structure mismatches

### Step 3: Fix Common Issues

#### Issue #1: Route Not Found
**Symptoms:** Tests timeout waiting for elements
**Solution:** Verify route exists in `src/demo/App.tsx`

Available routes (confirmed):
```
/                               (Home)
/vertical-basic                 (Basic vertical timeline)
/vertical-basic-nested          (Nested vertical - NEW TEST USES THIS)
/vertical-alternating           (Alternating vertical)
/vertical-alternating-nested    (Nested alternating)
/horizontal                     (Horizontal timeline)
/horizontal-all                 (Horizontal all mode)
/timeline-without-cards         (Cardless)
/theme-showcase                 (Theme examples)
```

#### Issue #2: Selectors Don't Match
**Symptoms:** "Element not found" errors
**Solution:**
1. Open failed test screenshot in `test-results/`
2. Compare with actual page structure
3. Update selectors in test file

#### Issue #3: Timing Issues
**Symptoms:** Intermittent failures, race conditions
**Solution:** Use new helper methods:
```typescript
// Replace hardcoded waits
await testHelpers.waitForTimelineReady();
await expect(element).toBeVisible();
```

### Step 4: Install Other Browsers (Optional)

For full cross-browser testing:
```bash
# Install Firefox
pnpm exec playwright install firefox --with-deps

# Install WebKit
pnpm exec playwright install webkit --with-deps

# Or install all at once
pnpm run test:install
```

Then run:
```bash
pnpm test:e2e        # All browsers
pnpm test:e2e:firefox  # Firefox only
pnpm test:e2e:webkit   # WebKit only
```

---

## 📝 Test Fixing Workflow

### For Each Failing Test:

1. **View the failure:**
   ```bash
   pnpm run test:report
   ```
   - Click on failed test
   - View screenshot
   - Watch video recording
   - Read error message

2. **Debug interactively:**
   ```bash
   pnpm run test:e2e:ui
   ```
   - Select failing test
   - Step through execution
   - Inspect elements
   - Try different selectors

3. **Fix the test:**
   - Update route if needed
   - Fix selectors
   - Replace hardcoded waits with `expect()`
   - Add better error handling

4. **Re-run specific test:**
   ```bash
   pnpm test:e2e:chrome --grep "test name"
   ```

5. **Verify fix works:**
   - Test should pass ✅
   - No flakiness
   - Works on other browsers

---

## 🎯 Priority Test Files to Fix (In Order)

### High Priority (Fix First):
1. **`timeline-nested-keyboard-nav.spec.ts`** (NEW)
   - Status: ⚠️ Needs route validation
   - Route: `/vertical-basic-nested` (exists ✅)
   - Action: Run with dev server, fix any selector issues

2. **`timeline-accessibility.spec.ts`**
   - Status: ⚠️ May need selector updates
   - Critical for WCAG compliance
   - Action: Validate all accessibility tests pass

3. **`timeline-navigation-controls.spec.ts`**
   - Status: ⚠️ May have hardcoded waits
   - Core functionality tests
   - Action: Replace waits with web-first assertions

### Medium Priority:
4. `timeline-horizontal.spec.ts`
5. `timeline-vertical.spec.ts`
6. `modes/horizontal-mode.spec.ts`
7. `modes/vertical-mode.spec.ts`

### Low Priority (Optimization):
8. Replace remaining `waitForTimeout()` in all files
9. Add more test coverage for edge cases
10. Add visual regression tests if needed

---

## 📊 Success Metrics

### Target Goals:
- ✅ **Pass rate:** >95% on Chromium
- ✅ **Pass rate:** >90% on Firefox & WebKit
- ✅ **Test execution:** <10 minutes for E2E suite on single browser
- ✅ **Flaky tests:** <5% (tests that fail intermittently)

### Track Progress:
```bash
# Run all E2E tests
pnpm test:e2e:chrome

# Count passing vs failing
# Results shown at end of test run
```

---

## 🔧 Troubleshooting Guide

### Problem: Dev server won't start
```bash
# Check if port is in use
lsof -i :4444

# Kill process if needed
kill -9 <PID>

# Start server
pnpm dev
```

### Problem: Tests still fail after fixes
```bash
# Clear Playwright cache
pnpm exec playwright install --force

# Clear test results
rm -rf test-results/ playwright-report/

# Re-run tests
pnpm test:e2e:chrome
```

### Problem: Can't see what's happening
```bash
# Run in headed mode (see browser)
pnpm test:e2e:headed --grep "test name"

# Or use debug mode (step through)
pnpm test:e2e:debug --grep "test name"
```

### Problem: Need to update snapshots
```bash
pnpm run test:update-snapshots
```

---

## 📋 Integration Tests (Separate from E2E)

Integration tests validate the **built package** works correctly:

```bash
# Step 1: Build the library
pnpm build

# Step 2: Run integration tests
pnpm test:integration

# These tests:
# - Install built package in demo app
# - Launch demo app in browser
# - Verify timeline renders correctly
# - Validate TypeScript types work
```

**Note:** Integration tests use port 5555 (different from E2E port 4444)

---

## 🎬 Component Tests (Separate from E2E)

Component tests run isolated component testing:

```bash
# Run component tests
pnpm test:ct

# Or with UI
pnpm test:ct:ui
```

These don't require dev server - they mount components directly.

---

## 🚦 GitHub Actions (CI)

Once local tests pass, push to GitHub:

```bash
git add .
git commit -m "feat: enable Playwright cross-browser testing"
git push
```

**GitHub Actions will:**
1. Run unit tests (Vitest)
2. Build library
3. Run E2E tests (3 jobs: Chromium, Firefox, WebKit)
4. Run Integration tests (2 jobs: Chromium, Firefox)
5. Run Component tests (3 jobs: Chromium, Firefox, WebKit)
6. Merge all reports
7. Comment on PR with results

**View results:**
- Go to GitHub → Actions tab
- Click on workflow run
- View job results
- Download artifacts (HTML reports, traces, videos)

---

## 📚 Key Commands Reference

```bash
# Development
pnpm dev                      # Start dev server (required for tests)
pnpm build                    # Build library (required for integration tests)

# Testing
pnpm test                     # Unit tests (Vitest)
pnpm test:e2e:chrome          # E2E tests (Chromium only)
pnpm test:e2e                 # E2E tests (all browsers)
pnpm test:integration         # Integration tests (built package)
pnpm test:ct                  # Component tests

# Debugging
pnpm test:e2e:ui              # Interactive test UI
pnpm test:e2e:headed          # See browser (not headless)
pnpm test:e2e:debug           # Step-through debugging
pnpm test:report              # View HTML report
pnpm test:trace               # View test traces

# Installation
pnpm run test:install         # Install Playwright browsers
```

---

## ✅ Definition of Done

Tests are ready for production when:

- [ ] Dev server starts successfully (`pnpm dev`)
- [ ] E2E tests run on Chromium (`pnpm test:e2e:chrome`)
- [ ] >90% of E2E tests pass
- [ ] Critical test files pass 100%:
  - `timeline-accessibility.spec.ts`
  - `timeline-navigation-controls.spec.ts`
  - `timeline-nested-keyboard-nav.spec.ts`
- [ ] Integration tests pass (`pnpm test:integration`)
- [ ] Component tests pass (`pnpm test:ct`)
- [ ] Cross-browser tests work (Firefox, WebKit)
- [ ] GitHub Actions workflow runs successfully
- [ ] Test artifacts appear in CI (reports, traces)
- [ ] No critical flaky tests
- [ ] Documentation is accurate and complete

---

## 🎉 Final Checklist

Before marking this task complete:

1. [ ] Run `pnpm dev` in one terminal
2. [ ] Run `pnpm test:e2e:chrome` in another terminal
3. [ ] Review test report (`pnpm run test:report`)
4. [ ] Fix failing tests one by one
5. [ ] Verify tests pass consistently (run 3 times)
6. [ ] Install other browsers (`pnpm run test:install`)
7. [ ] Run cross-browser tests (`pnpm test:e2e`)
8. [ ] Run integration tests (`pnpm build && pnpm test:integration`)
9. [ ] Push to GitHub and verify Actions run
10. [ ] Review CI results and ensure tests pass

---

## 📞 Support & Documentation

- **Setup Guide:** `PLAYWRIGHT_SETUP_COMPLETE.md` (this directory)
- **Project Docs:** `CLAUDE.md` (Testing section)
- **Test Fixtures:** `tests/fixtures/test-fixtures.ts`
- **Playwright Docs:** https://playwright.dev/docs/intro
- **CI Workflow:** `.github/workflows/playwright.yml`

---

**Ready to proceed!** 🚀

Start with:
```bash
# Terminal 1
pnpm dev

# Terminal 2
pnpm test:e2e:chrome
```

Then review results and fix failing tests iteratively.

---

Generated: October 27, 2025
Status: ✅ Ready for Testing Phase
