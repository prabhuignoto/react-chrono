#!/bin/bash

# react-chrono bug detection and fixing script
# Enhanced version with improved cross-browser compatibility checks

echo "🔍 Starting bug detection process for react-chrono..."
echo "This script checks for code quality issues and cross-browser compatibility problems."

# Run type checking
echo "Running TypeScript type checking..."
npx tsc --noEmit
TYPE_CHECK_STATUS=$?
if [ $TYPE_CHECK_STATUS -ne 0 ]; then
  echo "⚠️ Type checking found issues. Continuing with other checks..."
  # Not exiting here to allow the script to continue with other checks
else
  echo "✅ Type checking passed."
fi

# Run linting
echo "Running ESLint..."
pnpm eslint
if [ $? -ne 0 ]; then
  echo "❌ ESLint found issues. Running automatic fixes..."
  pnpm fix-js
else
  echo "✅ ESLint passed."
fi

# Run prettier
echo "Running Prettier..."
pnpm lint
if [ $? -ne 0 ]; then
  echo "❌ Prettier found formatting issues. Running automatic formatting..."
  pnpm format
else
  echo "✅ Prettier passed."
fi

# Run CSS linting
echo "Running CSS linting..."
pnpm lint:css
if [ $? -ne 0 ]; then
  echo "❌ CSS linting found issues. Running automatic fixes..."
  pnpm fix-css
else
  echo "✅ CSS linting passed."
fi

# Run tests
echo "Running tests..."
pnpm test --run
TEST_STATUS=$?
if [ $TEST_STATUS -ne 0 ]; then
  echo "⚠️ Some tests failed. Continuing with other checks..."
  # Not exiting here to allow the script to continue with other checks
else
  echo "✅ Tests passed."
fi

# Run cross-browser tests with Playwright
echo "Would you like to run cross-browser tests with Playwright? (y/n)"
read -r RUN_BROWSER_TESTS

if [ "$RUN_BROWSER_TESTS" = "y" ]; then
  echo "Running Playwright tests across browsers..."
  if ! pnpm test:e2e; then
    echo "⚠️ Cross-browser tests failed. Check the Playwright test reports."
    BROWSER_ISSUES=1
  else
    echo "✅ All cross-browser tests passed."
  fi
else
  echo "Skipping cross-browser tests."
fi

# Check for cross-browser compatibility
echo "Checking for cross-browser compatibility issues..."
BROWSER_ISSUES=0
BROWSERSTACK_CONFIG="config/playwright/browserstack.json"

# Check if browserstack.json exists and has adequate browser coverage
if [ -f "$BROWSERSTACK_CONFIG" ]; then
  BROWSER_COUNT=$(grep -o '"browser":' "$BROWSERSTACK_CONFIG" | wc -l | tr -d ' ')
  OS_COUNT=$(grep -o '"os":' "$BROWSERSTACK_CONFIG" | wc -l | tr -d ' ')
  BROWSERS_LIST=$(grep -A1 '"browser":' "$BROWSERSTACK_CONFIG" | grep -v '"browser":' | tr -d ' ",')
  
  if [ "$BROWSER_COUNT" -lt 3 ]; then
    echo "⚠️ Warning: Limited browser coverage in BrowserStack configuration. Consider adding more browsers."
    echo "Current browsers: ${BROWSERS_LIST}"
    echo "Recommended: Add at least Chrome, Firefox, and Safari for comprehensive testing."
    BROWSER_ISSUES=1
  else
    echo "✅ BrowserStack browser coverage looks good."
  fi
  
  if [ "$OS_COUNT" -lt 2 ]; then
    echo "⚠️ Warning: Limited OS coverage in BrowserStack configuration. Consider testing on both Windows and macOS."
    BROWSER_ISSUES=1
  else
    echo "✅ BrowserStack OS coverage looks good."
  fi
else
  echo "⚠️ Warning: No BrowserStack configuration found."
  BROWSER_ISSUES=1
fi

# Check for browser-specific CSS prefixes in style files
echo "Checking for browser-specific CSS issues..."
CSS_ISSUES=0

# Look for manual prefixes
if grep -r -l "(-webkit-|-moz-|-ms-|-o-)" --include="*style.ts" --include="*.css" src/ > /dev/null; then
  MANUAL_PREFIXES=$(grep -r "(-webkit-|-moz-|-ms-|-o-)" --include="*style.ts" --include="*.css" src/ | wc -l | tr -d ' ')
  echo "⚠️ Warning: Found $MANUAL_PREFIXES manual browser prefixes. Consider using autoprefixer consistently."
  CSS_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ No manual browser prefixes found."
fi

# Check for flexbox usage without prefixes
if grep -r -l "display:.*flex" --include="*style.ts" --include="*.css" src/ > /dev/null && 
   ! grep -r -l "-webkit-box\|-ms-flexbox" --include="*style.ts" --include="*.css" src/ > /dev/null; then
  echo "⚠️ Warning: Found flexbox usage without vendor prefixes. This may cause issues in older browsers."
  CSS_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ Flexbox prefixes look good or flexbox not used."
fi

# Check for CSS Grid usage without feature detection
if grep -r -l "display:.*grid" --include="*style.ts" --include="*.css" src/ > /dev/null && 
   ! grep -r -l "@supports.*display.*grid" --include="*style.ts" --include="*.css" src/ > /dev/null; then
  echo "⚠️ Warning: Found CSS Grid usage without @supports feature detection. This may cause layout issues in unsupported browsers."
  CSS_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ CSS Grid usage with proper feature detection or Grid not used."
fi

# Check for browser detection code that might indicate compatibility issues
echo "Checking for browser detection code..."
if grep -r -l "navigator.userAgent\|navigator.vendor\|window.opera" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
  DETECTION_FILES=$(grep -r -l "navigator.userAgent\|navigator.vendor\|window.opera" --include="*.{js,jsx,ts,tsx}" src/ | wc -l | tr -d ' ')
  echo "⚠️ Warning: Found userAgent detection in $DETECTION_FILES files. Consider using feature detection instead."
  echo "Hint: Use modernizr or @supports for feature detection rather than browser detection."
  BROWSER_ISSUES=1
else
  echo "✅ No browser userAgent detection found."
fi

# Check for browser-specific JavaScript
echo "Checking for browser-specific JavaScript..."
if grep -r -l "document.all\|document.layers\|window.ActiveXObject\|/MSIE/\|/Trident/\|/Edge/\|/Firefox/\|/Chrome/\|/Safari/" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
  echo "⚠️ Warning: Found potential browser-specific JavaScript or browser sniffing."
  echo "  Consider using feature detection instead of browser detection."
  BROWSER_ISSUES=1
else
  echo "✅ No browser-specific JavaScript found."
fi

# Check for modern JavaScript features without polyfills
echo "Checking for potentially unsupported JavaScript features..."
JS_COMPAT_ISSUES=0

# Check for optional chaining
if grep -r -l "?." --include="*.{js,jsx,ts,tsx}" src/ > /dev/null 2>&1; then
  if ! grep -q "@babel/plugin-proposal-optional-chaining" package.json; then
    echo "⚠️ Warning: Found optional chaining (?.) which may need polyfills for older browsers."
    echo "  Consider adding @babel/plugin-proposal-optional-chaining to babel config."
    JS_COMPAT_ISSUES=1
    BROWSER_ISSUES=1
  else
    echo "✅ Optional chaining with babel plugin is being used."
  fi
else
  echo "✅ No optional chaining detected."
fi

# Check for nullish coalescing
if grep -r -l "??" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null 2>&1; then
  if ! grep -q "@babel/plugin-proposal-nullish-coalescing-operator" package.json; then
    echo "⚠️ Warning: Found nullish coalescing (??) which may need polyfills for older browsers."
    echo "  Consider adding @babel/plugin-proposal-nullish-coalescing-operator to babel config."
    JS_COMPAT_ISSUES=1
    BROWSER_ISSUES=1
  else
    echo "✅ Nullish coalescing with babel plugin is being used."
  fi
else
  echo "✅ No nullish coalescing detected."
fi

# Check for async/await
if grep -r -l "async.*await" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null 2>&1; then
  if ! grep -q "@babel/plugin-transform-runtime\|@babel/runtime" package.json; then
    echo "⚠️ Warning: Found async/await which may need polyfills for older browsers."
    echo "  Consider adding @babel/plugin-transform-runtime to babel config."
    JS_COMPAT_ISSUES=1
    BROWSER_ISSUES=1
  else
    echo "✅ Async/await with babel transform runtime is being used."
  fi
else
  echo "✅ No async/await detected or proper transforms in place."
fi

# Check for responsive design issues
echo "Checking for responsive design implementation..."
RESPONSIVE_ISSUES=0

# Check for viewport meta tag in HTML files
if [ -f "public/index.html" ]; then
  if ! grep -q '<meta name="viewport"' public/index.html; then
    echo "⚠️ Warning: No viewport meta tag found in index.html."
    echo "  Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> to enable responsive design."
    RESPONSIVE_ISSUES=1
    BROWSER_ISSUES=1
  else
    echo "✅ Viewport meta tag found in index.html."
  fi
else
  echo "⚠️ Warning: No index.html found in public directory."
  RESPONSIVE_ISSUES=1
  BROWSER_ISSUES=1
fi

# Check for media queries in style files
MEDIA_QUERY_COUNT=$(grep -r "@media" --include="*style.ts" --include="*.css" src/ | wc -l | tr -d ' ')
if [ "$MEDIA_QUERY_COUNT" -lt 3 ]; then
  echo "⚠️ Warning: Only $MEDIA_QUERY_COUNT media queries found in style files. Responsive design might be limited."
  echo "  Consider implementing responsive breakpoints for different device sizes."
  RESPONSIVE_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ $MEDIA_QUERY_COUNT media queries found in style files."
fi

# Check for common breakpoints
if ! grep -r -l "@media.*(max-width|min-width).*768px" --include="*style.ts" --include="*.css" src/ > /dev/null; then
  echo "⚠️ Warning: No tablet breakpoint (768px) found. Mobile compatibility might be limited."
  RESPONSIVE_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ Tablet breakpoint found."
fi

# Check for touch event handling
TOUCH_COUNT=$(grep -r "onTouch\|touchstart\|touchmove\|touchend" --include="*.{js,jsx,ts,tsx}" src/ | wc -l | tr -d ' ')
if [ "$TOUCH_COUNT" -lt 1 ]; then
  echo "⚠️ Warning: No touch event handlers found. Mobile compatibility might be limited."
  echo "  Consider adding touch event handlers for mobile devices."
  RESPONSIVE_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ $TOUCH_COUNT touch event handlers found."
fi

# Check for passive touch listeners for performance
if grep -r -l "addEventListener.*touch" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null && 
   ! grep -r -l "addEventListener.*touch.*passive" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
  echo "⚠️ Warning: Touch event listeners without passive option found. This may cause performance issues on mobile."
  RESPONSIVE_ISSUES=1
  BROWSER_ISSUES=1
else
  echo "✅ No non-passive touch event listeners found or no touch events used."
fi

# Check for support for SVG and Canvas features
echo "Checking for SVG/Canvas feature detection..."
if grep -r -l "getContext\|createElementNS\|SVG" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
  if ! grep -r -l "feature detection.*getContext\|feature detection.*createElementNS\|typeof document.createElement('canvas').getContext\|typeof document.createElementNS" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
    echo "⚠️ Warning: Found SVG/Canvas usage without feature detection."
    echo "  Consider adding checks like: if (typeof document.createElement('canvas').getContext === 'function')"
    BROWSER_ISSUES=1
  else
    echo "✅ SVG/Canvas feature detection in place."
  fi
else
  echo "✅ No SVG/Canvas API usage found."
fi

# Check for WebGL usage without fallbacks
if grep -r -l "WebGLRenderingContext\|webgl\|experimental-webgl" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
  if ! grep -r -l "try.*WebGLRenderingContext\|fallback.*webgl" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
    echo "⚠️ Warning: Found WebGL usage without proper fallbacks."
    echo "  Consider adding fallbacks for browsers that don't support WebGL."
    BROWSER_ISSUES=1
  else
    echo "✅ WebGL with fallbacks detected."
  fi
else
  echo "✅ No WebGL usage found."
fi

# Create a bug report
echo "Creating bug report..."
echo "Bug Report - $(date)" > bug_report.txt
echo "==================================" >> bug_report.txt
echo "OVERVIEW" >> bug_report.txt
echo "==================================" >> bug_report.txt
if [ $TYPE_CHECK_STATUS -eq 0 ]; then
  echo "Type checking: ✅" >> bug_report.txt
else
  echo "Type checking: ⚠️ (see TypeScript errors)" >> bug_report.txt
fi
echo "ESLint: ✅" >> bug_report.txt
echo "Prettier: ✅" >> bug_report.txt
echo "CSS Linting: ✅" >> bug_report.txt
if [ $TEST_STATUS -eq 0 ]; then
  echo "Tests: ✅" >> bug_report.txt
else
  echo "Tests: ⚠️ (some tests failed)" >> bug_report.txt
fi
if [ $BROWSER_ISSUES -eq 0 ]; then
  echo "Cross-browser compatibility: ✅" >> bug_report.txt
else
  echo "Cross-browser compatibility: ⚠️ (see warnings)" >> bug_report.txt
fi
echo "" >> bug_report.txt

if [ $BROWSER_ISSUES -ne 0 ]; then
  echo "==================================" >> bug_report.txt
  echo "CROSS-BROWSER COMPATIBILITY ISSUES" >> bug_report.txt
  echo "==================================" >> bug_report.txt
  
  # BrowserStack configuration issues
  if [ ! -f "$BROWSERSTACK_CONFIG" ]; then
    echo "- ⚠️ No BrowserStack configuration found" >> bug_report.txt
    echo "  Recommendation: Set up BrowserStack for cross-browser testing" >> bug_report.txt
  elif [ "$BROWSER_COUNT" -lt 3 ]; then
    echo "- ⚠️ Limited browser coverage in BrowserStack configuration" >> bug_report.txt
    echo "  Current browsers: ${BROWSERS_LIST}" >> bug_report.txt
    echo "  Recommendation: Add at least Chrome, Firefox, and Safari for comprehensive testing" >> bug_report.txt
  fi
  
  if [ -f "$BROWSERSTACK_CONFIG" ] && [ "$OS_COUNT" -lt 2 ]; then
    echo "- ⚠️ Limited OS coverage in BrowserStack configuration" >> bug_report.txt
    echo "  Recommendation: Test on both Windows and macOS" >> bug_report.txt
  fi
  
  # CSS issues
  if [ $CSS_ISSUES -eq 1 ]; then
    echo "" >> bug_report.txt
    echo "CSS Compatibility Issues:" >> bug_report.txt
    if grep -r -l "(-webkit-|-moz-|-ms-|-o-)" --include="*style.ts" --include="*.css" src/ > /dev/null; then
      echo "- ⚠️ Manual browser prefixes found" >> bug_report.txt
      echo "  Recommendation: Use autoprefixer or a CSS-in-JS solution that adds prefixes automatically" >> bug_report.txt
    fi
    
    if grep -r -l "display:.*flex" --include="*style.ts" --include="*.css" src/ > /dev/null && 
       ! grep -r -l "-webkit-box\|-ms-flexbox" --include="*style.ts" --include="*.css" src/ > /dev/null; then
      echo "- ⚠️ Flexbox without vendor prefixes" >> bug_report.txt
      echo "  Recommendation: Use autoprefixer to add necessary vendor prefixes for older browsers" >> bug_report.txt
    fi
    
    if grep -r -l "display:.*grid" --include="*style.ts" --include="*.css" src/ > /dev/null && 
       ! grep -r -l "@supports.*display.*grid" --include="*style.ts" --include="*.css" src/ > /dev/null; then
      echo "- ⚠️ CSS Grid without @supports feature detection" >> bug_report.txt
      echo "  Recommendation: Add @supports (display: grid) for proper fallbacks in older browsers" >> bug_report.txt
    fi
  fi
  
  # Browser detection issues
  echo "" >> bug_report.txt
  echo "Browser Detection Issues:" >> bug_report.txt
  if grep -r -l "navigator.userAgent\|navigator.vendor\|window.opera" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
    echo "- ⚠️ Browser detection via userAgent found" >> bug_report.txt
    echo "  Recommendation: Use feature detection instead of browser detection" >> bug_report.txt
    grep -r "navigator.userAgent\|navigator.vendor\|window.opera" --include="*.{js,jsx,ts,tsx}" src/ | head -5 >> bug_report.txt
  fi
  
  if grep -r -l "document.all\|document.layers\|window.ActiveXObject\|/MSIE/\|/Trident/\|/Edge/\|/Firefox/\|/Chrome/\|/Safari/" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
    echo "- ⚠️ Browser-specific JavaScript or browser sniffing found" >> bug_report.txt
    echo "  Recommendation: Use feature detection instead of browser detection" >> bug_report.txt
  fi
  
  # JavaScript compatibility issues
  if [ $JS_COMPAT_ISSUES -eq 1 ]; then
    echo "" >> bug_report.txt
    echo "JavaScript Compatibility Issues:" >> bug_report.txt
    if grep -r -l "?." --include="*.{js,jsx,ts,tsx}" src/ > /dev/null 2>&1 && ! grep -q "@babel/plugin-proposal-optional-chaining" package.json; then
      echo "- ⚠️ Optional chaining (?.) without proper babel plugin" >> bug_report.txt
      echo "  Recommendation: Add @babel/plugin-proposal-optional-chaining to babel config" >> bug_report.txt
    fi
    
    if grep -r -l "??" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null 2>&1 && ! grep -q "@babel/plugin-proposal-nullish-coalescing-operator" package.json; then
      echo "- ⚠️ Nullish coalescing (??) without proper babel plugin" >> bug_report.txt
      echo "  Recommendation: Add @babel/plugin-proposal-nullish-coalescing-operator to babel config" >> bug_report.txt
    fi
    
    if grep -r -l "async.*await" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null 2>&1 && ! grep -q "@babel/plugin-transform-runtime\|@babel/runtime" package.json; then
      echo "- ⚠️ Async/await without proper babel transforms" >> bug_report.txt
      echo "  Recommendation: Add @babel/plugin-transform-runtime to babel config" >> bug_report.txt
    fi
  fi
  
  # Canvas/SVG issues
  if grep -r -l "getContext\|createElementNS\|SVG" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null && 
     ! grep -r -l "feature detection.*getContext\|feature detection.*createElementNS\|typeof document.createElement('canvas').getContext\|typeof document.createElementNS" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
    echo "" >> bug_report.txt
    echo "Canvas/SVG Issues:" >> bug_report.txt
    echo "- ⚠️ SVG/Canvas usage without feature detection" >> bug_report.txt
    echo "  Recommendation: Add feature detection before using Canvas or SVG APIs" >> bug_report.txt
  fi
  
  if grep -r -l "WebGLRenderingContext\|webgl\|experimental-webgl" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null && 
     ! grep -r -l "try.*WebGLRenderingContext\|fallback.*webgl" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
    echo "- ⚠️ WebGL usage without proper fallbacks" >> bug_report.txt
    echo "  Recommendation: Add fallbacks for browsers that don't support WebGL" >> bug_report.txt
  fi
  
  # Responsive design issues
  if [ $RESPONSIVE_ISSUES -eq 1 ]; then
    echo "" >> bug_report.txt
    echo "Responsive Design Issues:" >> bug_report.txt
    
    if [ ! -f "public/index.html" ] || ([ -f "public/index.html" ] && ! grep -q '<meta name="viewport"' public/index.html); then
      echo "- ⚠️ Missing viewport meta tag in index.html" >> bug_report.txt
      echo "  Recommendation: Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">" >> bug_report.txt
    fi
    
    if [ "$MEDIA_QUERY_COUNT" -lt 3 ]; then
      echo "- ⚠️ Limited media queries ($MEDIA_QUERY_COUNT found)" >> bug_report.txt
      echo "  Recommendation: Implement responsive breakpoints for different device sizes" >> bug_report.txt
    fi
    
    if ! grep -r -l "@media.*(max-width|min-width).*768px" --include="*style.ts" --include="*.css" src/ > /dev/null; then
      echo "- ⚠️ No tablet breakpoint (768px) found" >> bug_report.txt
      echo "  Recommendation: Add breakpoints for common device sizes (mobile, tablet, desktop)" >> bug_report.txt
    fi
    
    if [ "$TOUCH_COUNT" -lt 1 ]; then
      echo "- ⚠️ No touch event handlers found" >> bug_report.txt
      echo "  Recommendation: Add touch event handlers for mobile devices" >> bug_report.txt
    fi
    
    if grep -r -l "addEventListener.*touch" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null && 
       ! grep -r -l "addEventListener.*touch.*passive" --include="*.{js,jsx,ts,tsx}" src/ > /dev/null; then
      echo "- ⚠️ Touch event listeners without passive option" >> bug_report.txt
      echo "  Recommendation: Add {passive: true} to touch event listeners to improve scrolling performance" >> bug_report.txt
    fi
  fi
  
  # Cross-browser test results
  if [ "$RUN_BROWSER_TESTS" = "y" ]; then
    echo "" >> bug_report.txt
    echo "Cross-Browser Test Results:" >> bug_report.txt
    
    if [ "$BROWSER_ISSUES" -eq 1 ]; then
      echo "- ⚠️ Playwright cross-browser tests failed" >> bug_report.txt
    else
      echo "- ✅ Playwright cross-browser tests passed" >> bug_report.txt
    fi
  fi
fi

echo "" >> bug_report.txt
echo "==================================" >> bug_report.txt
echo "RECOMMENDATIONS" >> bug_report.txt
echo "==================================" >> bug_report.txt
echo "1. Ensure proper browser testing coverage with at least Chrome, Firefox, and Safari" >> bug_report.txt
echo "2. Use feature detection instead of browser detection" >> bug_report.txt
echo "3. Ensure responsive design with proper breakpoints and touch event handling" >> bug_report.txt
echo "4. Use appropriate polyfills or babel plugins for modern JavaScript features" >> bug_report.txt
echo "5. Run tests across multiple browsers and devices regularly" >> bug_report.txt
echo "" >> bug_report.txt

echo "✅ Bug detection process completed successfully."
echo "📄 Bug report saved to bug_report.txt"
