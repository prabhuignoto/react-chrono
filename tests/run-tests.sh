#!/bin/bash

# React Chrono Playwright Test Runner
# Usage: ./run-tests.sh [mode|props|custom|all] [browser]

MODE=${1:-all}
BROWSER=${2:-chromium}

echo "🧪 React Chrono Test Runner"
echo "=========================="
echo "Mode: $MODE"
echo "Browser: $BROWSER"
echo ""

case $MODE in
  "vertical")
    echo "Running VERTICAL mode tests..."
    npx playwright test tests/e2e/modes/vertical-mode.spec.ts --project=$BROWSER
    ;;
  
  "horizontal")
    echo "Running HORIZONTAL mode tests..."
    npx playwright test tests/e2e/modes/horizontal-mode.spec.ts --project=$BROWSER
    ;;
  
  "alternating")
    echo "Running VERTICAL_ALTERNATING mode tests..."
    npx playwright test tests/e2e/modes/vertical-alternating-mode.spec.ts --project=$BROWSER
    ;;
  
  "horizontal-all")
    echo "Running HORIZONTAL_ALL mode tests..."
    npx playwright test tests/e2e/modes/horizontal-all-mode.spec.ts --project=$BROWSER
    ;;
  
  "modes")
    echo "Running all mode tests..."
    npx playwright test tests/e2e/modes/*.spec.ts --project=$BROWSER
    ;;
  
  "props")
    echo "Running props tests..."
    npx playwright test tests/e2e/props/timeline-props.spec.ts --project=$BROWSER
    ;;
  
  "custom")
    echo "Running custom content tests..."
    npx playwright test tests/e2e/custom-content/custom-content.spec.ts --project=$BROWSER
    ;;
  
  "existing")
    echo "Running existing tests..."
    npx playwright test tests/e2e/timeline-*.spec.ts --project=$BROWSER
    ;;
  
  "all")
    echo "Running all tests..."
    npx playwright test --project=$BROWSER
    ;;
  
  "debug")
    echo "Running tests in debug mode..."
    npx playwright test --debug --project=$BROWSER
    ;;
  
  "ui")
    echo "Running tests with UI mode..."
    npx playwright test --ui
    ;;
  
  "report")
    echo "Opening last test report..."
    npx playwright show-report
    ;;
  
  *)
    echo "Usage: $0 [vertical|horizontal|alternating|horizontal-all|modes|props|custom|existing|all|debug|ui|report] [chromium|firefox|webkit]"
    echo ""
    echo "Examples:"
    echo "  $0 vertical           # Run vertical mode tests in chromium"
    echo "  $0 modes firefox      # Run all mode tests in firefox"
    echo "  $0 props webkit       # Run props tests in webkit"
    echo "  $0 all               # Run all tests in chromium"
    echo "  $0 ui                # Open Playwright UI mode"
    echo "  $0 report            # Show last test report"
    exit 1
    ;;
esac

echo ""
echo "✅ Test execution completed!"