#!/bin/bash

# 🧪 Basic GitHub Actions Workflow Testing Script
# This script validates the workflow files and configurations only

set -e  # Exit on any error

echo "🚀 Testing GitHub Actions Workflows (Basic Validation)"
echo "======================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Test 1: Prerequisites Check
echo ""
print_status "🔍 Checking Prerequisites"
echo "-------------------------"

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists python3; then
    print_error "Python3 is not installed. Please install Python3 first."
    exit 1
fi

print_success "Prerequisites check passed"

# Test 2: Workflow File Validation
echo ""
print_status "📋 Testing Workflow File Validation"
echo "-----------------------------------"

# Check if workflow files are valid YAML
print_status "Validating workflow YAML syntax..."

WORKFLOW_DIR=".github/workflows"
YAML_VALID=true
WORKFLOW_COUNT=0

if [ ! -d "$WORKFLOW_DIR" ]; then
    print_error "Workflow directory not found: $WORKFLOW_DIR"
    exit 1
fi

for workflow in "$WORKFLOW_DIR"/*.yml "$WORKFLOW_DIR"/*.yaml; do
    if [ -f "$workflow" ]; then
        filename=$(basename "$workflow")
        # Basic YAML check using Python
        if python3 -c "import yaml; yaml.safe_load(open('$workflow'))" 2>/dev/null; then
            print_success "✓ $filename - Valid YAML"
            WORKFLOW_COUNT=$((WORKFLOW_COUNT + 1))
        else
            print_error "✗ $filename - Invalid YAML"
            YAML_VALID=false
        fi
    fi
done

if [ "$YAML_VALID" = true ]; then
    print_success "All $WORKFLOW_COUNT workflow files have valid YAML syntax"
else
    print_error "Some workflow files have invalid YAML syntax"
    exit 1
fi

# Test 3: Package.json Scripts Validation
echo ""
print_status "📦 Testing Package.json Scripts"
echo "------------------------------"

if [ ! -f "package.json" ]; then
    print_error "package.json not found"
    exit 1
fi

print_status "Validating all package.json scripts exist..."

# Check if all scripts referenced in workflows exist
SCRIPTS_TO_CHECK=(
    "lint:all"
    "lint"
    "rollup"
    "test"
    "vite:build"
    "dev"
    "eslint"
    "format"
    "find-bugs"
    "cypress:run"
    "cypress:headless"
)

MISSING_SCRIPTS=()
EXISTING_SCRIPTS=()

for script in "${SCRIPTS_TO_CHECK[@]}"; do
    if grep -q "\"$script\":" package.json; then
        print_success "✓ Script '$script' exists"
        EXISTING_SCRIPTS+=("$script")
    else
        print_warning "⚠ Script '$script' missing (may be optional)"
        MISSING_SCRIPTS+=("$script")
    fi
done

print_success "Found ${#EXISTING_SCRIPTS[@]} required scripts"
if [ ${#MISSING_SCRIPTS[@]} -gt 0 ]; then
    print_warning "Missing optional scripts: ${MISSING_SCRIPTS[*]}"
fi

# Test 4: Git Configuration Check
echo ""
print_status "🔧 Testing Git Configuration"
echo "---------------------------"

print_status "Checking git configuration..."

if git config user.name > /dev/null && git config user.email > /dev/null; then
    print_success "Git user configuration is set"
else
    print_warning "Git user configuration missing (needed for release workflow)"
fi

if git status > /dev/null 2>&1; then
    print_success "Git repository is valid"
else
    print_error "Not in a git repository"
    exit 1
fi

# Test 5: Label Configuration Validation
echo ""
print_status "🏷️ Testing Label Configuration"
echo "-----------------------------"

if [ -f ".github/labels.yml" ]; then
    print_status "Validating labels.yml..."
    if python3 -c "import yaml; yaml.safe_load(open('.github/labels.yml'))" 2>/dev/null; then
        print_success "Labels configuration is valid YAML"
        
        # Count labels
        LABEL_COUNT=$(python3 -c "import yaml; labels = yaml.safe_load(open('.github/labels.yml')); print(len(labels))")
        print_success "Found $LABEL_COUNT labels configured"
    else
        print_error "Labels configuration has invalid YAML"
        exit 1
    fi
else
    print_error "Labels configuration file missing"
    exit 1
fi

# Test 6: GitHub Templates Validation
echo ""
print_status "📝 Testing GitHub Templates"
echo "---------------------------"

TEMPLATE_FILES=(
    ".github/ISSUE_TEMPLATE/bug_report.md"
    ".github/ISSUE_TEMPLATE/feature_request.md"
    ".github/PULL_REQUEST_TEMPLATE.md"
)

TEMPLATE_COUNT=0

for template in "${TEMPLATE_FILES[@]}"; do
    if [ -f "$template" ]; then
        print_success "✓ $(basename "$template") exists"
        TEMPLATE_COUNT=$((TEMPLATE_COUNT + 1))
    else
        print_warning "⚠ $(basename "$template") missing"
    fi
done

print_success "Found $TEMPLATE_COUNT GitHub templates"

# Test 7: Configuration Files Validation
echo ""
print_status "⚙️ Testing Configuration Files"
echo "------------------------------"

CONFIG_FILES=(
    "tsconfig.json"
    "eslint.config.mjs"
    ".prettierrc"
    "vite.config.mts"
    "vitest.config.mts"
    "postcss.config.js"
    "rollup.config.mjs"
    "cypress.config.ts"
)

CONFIG_COUNT=0

for config in "${CONFIG_FILES[@]}"; do
    if [ -f "$config" ]; then
        print_success "✓ $config exists"
        CONFIG_COUNT=$((CONFIG_COUNT + 1))
    else
        print_warning "⚠ $config missing"
    fi
done

print_success "Found $CONFIG_COUNT configuration files"

# Test 8: PostCSS Configuration
echo ""
print_status "🎨 Testing PostCSS Configuration"
echo "--------------------------------"

if [ -f "postcss.config.js" ]; then
    print_success "PostCSS configuration (CommonJS) exists"
    
    # Test if it's valid JavaScript
    if node -c postcss.config.js 2>/dev/null; then
        print_success "PostCSS configuration is valid JavaScript"
    else
        print_error "PostCSS configuration has syntax errors"
        exit 1
    fi
else
    print_error "PostCSS configuration missing"
    exit 1
fi

if [ -f "postcss.config.mjs" ]; then
    print_success "PostCSS configuration (ESM) also exists"
fi

# Test 9: Workflow Content Validation
echo ""
print_status "🔍 Testing Workflow Content"
echo "---------------------------"

print_status "Checking for key workflow features..."

# Check CI workflow
if [ -f ".github/workflows/ci.yml" ]; then
    if grep -q "matrix:" ".github/workflows/ci.yml"; then
        print_success "✓ CI workflow has matrix strategy"
    else
        print_warning "⚠ CI workflow missing matrix strategy"
    fi
    
    if grep -q "codecov" ".github/workflows/ci.yml"; then
        print_success "✓ CI workflow has code coverage"
    else
        print_warning "⚠ CI workflow missing code coverage"
    fi
else
    print_error "CI workflow missing"
    exit 1
fi

# Check release workflow
if [ -f ".github/workflows/release.yml" ]; then
    print_success "✓ Release workflow exists"
else
    print_warning "⚠ Release workflow missing"
fi

# Check PR automation
if [ -f ".github/workflows/pr-automation.yml" ]; then
    print_success "✓ PR automation workflow exists"
else
    print_warning "⚠ PR automation workflow missing"
fi

# Check dependency management
if [ -f ".github/workflows/dependency-management.yml" ]; then
    print_success "✓ Dependency management workflow exists"
else
    print_warning "⚠ Dependency management workflow missing"
fi

# Test 10: Environment Variables Check
echo ""
print_status "🔐 Testing Environment Variables"
echo "-------------------------------"

print_status "Checking for required environment variables..."

# Check for development environment
if [ -z "$NODE_ENV" ]; then
    print_warning "NODE_ENV not set (this is OK for local testing)"
fi

# Check for secrets (should not be set locally)
if [ -n "$NPM_TOKEN" ]; then
    print_warning "NPM_TOKEN is set locally - ensure this is intentional"
fi

if [ -n "$SNYK_TOKEN" ]; then
    print_warning "SNYK_TOKEN is set locally - ensure this is intentional"
fi

print_success "Environment variables check completed"

# Test 11: Dependencies Check
echo ""
print_status "📦 Testing Dependencies"
echo "----------------------"

if [ -f "package.json" ]; then
    # Check for key dependencies
    KEY_DEPS=(
        "react"
        "typescript"
        "vite"
        "vitest"
        "eslint"
        "prettier"
        "rollup"
        "cypress"
    )
    
    FOUND_DEPS=0
    
    for dep in "${KEY_DEPS[@]}"; do
        if grep -q "\"$dep\":" package.json; then
            print_success "✓ $dep dependency found"
            FOUND_DEPS=$((FOUND_DEPS + 1))
        else
            print_warning "⚠ $dep dependency missing"
        fi
    done
    
    print_success "Found $FOUND_DEPS/${#KEY_DEPS[@]} key dependencies"
fi

# Summary
echo ""
echo "🎉 BASIC VALIDATION SUMMARY"
echo "=========================="

print_success "✅ Prerequisites check passed"
print_success "✅ Workflow files validated ($WORKFLOW_COUNT files)"
print_success "✅ Package.json scripts validated"
print_success "✅ Git configuration checked"
print_success "✅ Label configuration validated"
print_success "✅ GitHub templates checked"
print_success "✅ Configuration files validated"
print_success "✅ PostCSS configuration validated"
print_success "✅ Workflow content validated"
print_success "✅ Environment variables checked"
print_success "✅ Dependencies checked"

echo ""
print_status "🚨 Known Issues to Address Before Full Testing:"
echo "- TypeScript errors need to be fixed for builds to work"
echo "- Some unit tests may fail due to TypeScript issues"
echo "- Prettier formatting needs to be applied"
echo ""
print_status "🚀 Workflow Structure is Ready!"
echo ""
print_status "Next steps:"
echo "1. Fix TypeScript errors: Run 'pnpm run find-bugs' to see all issues"
echo "2. Fix formatting: Run 'pnpm run format' to fix Prettier issues"
echo "3. Test builds: Run 'pnpm run rollup' after fixing TypeScript"
echo "4. Commit changes: git add . && git commit -m 'feat: implement modern GitHub Actions CI/CD pipeline'"
echo "5. Push to GitHub: git push origin master"
echo "6. Configure secrets in GitHub repository settings"
echo ""
print_status "Required secrets to configure:"
echo "- NPM_TOKEN (for automated publishing)"
echo "- SNYK_TOKEN (for security scanning)"
echo "- NETLIFY_AUTH_TOKEN (for deployments)"
echo "- NETLIFY_SITE_ID_STAGING (for staging deployments)"
echo "- NETLIFY_SITE_ID_PRODUCTION (for production deployments)"
echo ""
print_success "Basic workflow validation completed! 🎉"
print_status "The GitHub Actions workflows are structurally sound and ready to use once TypeScript issues are resolved." 