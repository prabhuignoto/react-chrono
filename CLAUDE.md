# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Chrono is a modern, flexible timeline component library for React that supports multiple layout modes (horizontal, vertical, vertical-alternating, horizontal-all) with rich media support, theming, and accessibility features. Built with TypeScript, Vanilla Extract CSS, and tested with Vitest + Playwright.

**Compatibility:** React 18.2+ and React 19+ | Node.js 22+ | Modern browsers (Chrome, Firefox, Safari, Edge)

## Essential Commands

### Development
```bash
pnpm run dev              # Start dev server with hot reload (site preview)
pnpm run build            # Production build (generates dist/)
pnpm run build:analyze    # Build with bundle analysis
pnpm run ladle            # Start Ladle component development environment
pnpm run ladle:build      # Build Ladle site
```

**Demo & Examples:**
- Demo site code: `src/demo/` (runs with `pnpm run dev`)
- Example components: `src/examples/`
- CodesandBox example: `codesandbox-example/`

### Testing
```bash
# Unit Tests (Vitest)
pnpm test                 # Run unit tests in watch mode
pnpm test -- --run        # Run tests once without watch mode
pnpm test timeline        # Run tests matching "timeline" in filename
pnpm run test-ui          # Run tests with Vitest UI

# E2E Testing (Playwright) - Cross-browser (Chromium, Firefox, WebKit)
pnpm run test:e2e         # Run all E2E tests (all browsers)
pnpm run test:e2e:ui      # Run E2E with Playwright UI (interactive debugging)
pnpm run test:e2e:headed  # Run E2E in headed mode (visible browser)
pnpm run test:e2e:debug   # Run E2E in debug mode (step-through)
pnpm run test:e2e:chrome  # Run E2E in Chromium only
pnpm run test:e2e:firefox # Run E2E in Firefox only
pnpm run test:e2e:webkit  # Run E2E in WebKit (Safari) only

# Component Tests (Playwright) - Cross-browser isolation testing
pnpm run test:ct          # Component tests with Playwright
pnpm run test:ct:ui       # Component tests with Playwright UI

# Integration Tests - Tests built package in real browser
pnpm run test:integration        # Run integration tests (validates dist/ works)
pnpm run test:integration:ui     # Run integration tests with UI
pnpm run test:integration:headed # Run integration tests in headed mode

# Test Utilities
pnpm run test:install     # Install Playwright browsers (required once)
pnpm run test:report      # View Playwright HTML test report
pnpm run test:trace       # View Playwright trace (for debugging failures)
pnpm run test:codegen     # Record interactions as test code
pnpm run test:update-snapshots # Update visual snapshots

# CI Testing
pnpm run test:e2e:ci      # Run E2E with GitHub Actions reporter
pnpm run test:e2e:shard   # Run sharded tests (parallel across machines)
```

**Cross-Browser Testing:**
- All Playwright E2E tests run on **Chromium, Firefox, and WebKit** by default
- Integration tests run on **Chromium and Firefox** (WebKit optional due to longer build times)
- Component tests run on **all three browsers** for comprehensive coverage
- GitHub Actions workflow (`.github/workflows/playwright.yml`) runs full cross-browser matrix automatically

**⚠️ First-Time Setup Required:**
- Run `pnpm run test:install` **once before running any E2E tests** to install Playwright browser binaries
- This is mandatory and takes a few minutes to complete
- After installation, all E2E, integration, and component tests will work across all browsers

**Test Organization:**
- **E2E Tests** (`tests/e2e/`): Test complete user workflows in demo site
- **Integration Tests** (`tests/integration/`): Validate built package works in real apps
- **Component Tests** (`tests/components/`): Test individual components in isolation
- **Test Fixtures** (`tests/fixtures/`): Shared helpers and utilities
- **Test Coverage**: Accessibility, keyboard navigation, nested timelines, media support, performance

### Code Quality
```bash
pnpm run eslint           # Lint TypeScript files
pnpm run fix-js           # Auto-fix ESLint issues
pnpm run format           # Format code with Prettier
pnpm run lint             # Check Prettier formatting
pnpm run lint:all         # Run all linting (ESLint + CSS + Prettier)
pnpm run clean            # Format and lint everything
pnpm run find-bugs        # TypeScript check + lint + test
pnpm run build:analyze    # Analyze bundle size (verify < 250 KB limit)

# Unit Test Debugging
pnpm run test-ui          # Interactive Vitest UI (watch mode with visual browser)
pnpm test -- --reporter=verbose  # Run tests with detailed output
```

## Architecture & Key Patterns

### 1. Styling System: Vanilla Extract Migration

The project is transitioning from styled-components to Vanilla Extract CSS-in-TypeScript for better performance and type safety.

**Style File Patterns:**
- `*.css.ts` files contain Vanilla Extract styles (modern approach)
- Imports use `import { className } from './file.css'` (note `.css` extension, not `.css.ts`)
- Components use Vanilla Extract recipes for variants and compound styles
- Legacy styled-components still exist in some files but should be avoided in new code

**When writing/editing styles:**
- Use Vanilla Extract for all new components
- Leverage the sprinkles utility system in `src/styles/system/sprinkles.css.ts`
- Use recipes from `@vanilla-extract/recipes` for component variants
- Import design tokens from `src/styles/tokens/index.css.ts`

### 2. Context Architecture: Unified Timeline Context

The project uses a **single unified context** (`TimelineContextProvider`) instead of multiple nested contexts.

**Key files:**
- `src/components/contexts/TimelineContextProvider.tsx` - Main context provider
- `src/components/contexts/index.tsx` - Exports `useTimelineContext()` hook

**Context structure:**
```typescript
// Three logical groups in the context:
TimelineStaticConfig    // Rarely changing configuration (mode, cardHeight, cardWidth, etc.)
TimelineDynamicState    // Frequently changing state (isDarkMode, isMobile, textContentDensity)
TimelineMemoizedObjects // Computed/memoized values (theme, buttonTexts, i18nHelper)
```

**Usage patterns:**
```typescript
// Full context (use sparingly - subscribes to all changes)
import { useTimelineContext } from '../contexts';
const { theme, mode, isDarkMode, toggleDarkMode } = useTimelineContext();

// Performance-optimized selective subscriptions:
import { useTimelineStaticConfig } from '../contexts';
const { mode, cardHeight } = useTimelineStaticConfig(); // Rarely re-renders

import { useTimelineDynamicState } from '../contexts';
const { isDarkMode, toggleDarkMode } = useTimelineDynamicState(); // Frequently re-renders

import { useTimelineMemoizedObjects } from '../contexts';
const { theme, buttonTexts } = useTimelineMemoizedObjects(); // Computed values
```

### 3. Custom Hooks Organization

The project uses custom hooks extensively to separate concerns:

**Location:** `src/hooks/`

**Key hooks (hierarchical composition):**
- `useTimelineNavigation.ts` - **Main orchestrator** - Composes navigation hooks and coordinates next/previous/first/last navigation
  - `useTimelineItemNavigation.ts` - Manages active item state and click events
  - `useTimelineKeyboardNavigation.ts` - Handles keyboard events (Arrow keys, Home, End)
  - `useTimelineScrolling.ts` - Calculates scroll positions and target elements
- `useTimelineScroll.ts` - Scroll behavior and positioning
- `useTimelineSearch.ts` - Search functionality with match highlighting
- `useTimelineMode.ts` - Timeline mode switching logic
- `useTimelineMedia.ts` - Handles media loading and lazy-loading lifecycle
- `useFullscreen.ts` - Cross-browser fullscreen API with vendor prefixes
- `useI18n.ts` - Internationalization support with text resolution
- `useFocusManager.ts` - Focus trap and management for modals/popovers
- `useMeasureHeight.ts` - Reactive element height measurement

**Pattern:** Hooks return stable references using `useCallback` and `useMemo` to prevent unnecessary re-renders. Major hooks compose smaller specialized hooks for modularity.

### 4. Component Structure

**Component hierarchy:**
- `src/components/index.tsx` - **Root Chrono component** - Handles prop migration, validation, and wraps with context/error boundary
- `src/components/timeline/timeline.tsx` - **Main Timeline orchestrator** - Coordinates hooks, navigation, and focus management
- `src/components/timeline/TimelineView.tsx` - **Layout renderer** - Delegates to mode-specific implementations
  - `src/components/timeline-horizontal/` - Horizontal mode implementation
  - `src/components/timeline-vertical/` - Vertical/alternating mode implementation
- `src/components/timeline/timeline-toolbar.tsx` - Toolbar with controls

**Reusable elements:**
- `src/components/elements/` - Generic UI elements (popover, list, icons)
- `src/components/timeline-elements/` - Timeline-specific components (cards, points, media)
  - `timeline-card/` - Card containers with media support
  - `timeline-card-content/` - Content sections (header, body, footer)
  - `timeline-card-media/` - Media display (images, videos, YouTube)
- `src/components/toolbar/` - Toolbar components
- `src/components/fonts/` - Font provider and Google Fonts integration

### 5. Portal Rendering and Fullscreen Support

**Critical pattern for fullscreen compatibility:**

When using `ReactDOM.createPortal()`, the component must detect fullscreen mode and portal to the fullscreen element instead of `document.body`:

```typescript
// Detect fullscreen element with vendor prefix support
const getFullscreenElement = () => {
  return document.fullscreenElement ||
         document.webkitFullscreenElement ||
         document.mozFullScreenElement ||
         document.msFullscreenElement ||
         null;
};

// Portal to fullscreen element when active, otherwise document.body
const portalContainer = getFullscreenElement() || document.body;
ReactDOM.createPortal(content, portalContainer);
```

This pattern is essential because browser fullscreen APIs only render the fullscreen element and its descendants. See `src/components/elements/popover/index.tsx` for reference implementation.

### 6. TypeScript Path Aliases

The project uses path aliases configured in `tsconfig.json`:

```typescript
import { Theme } from '@models/Theme';
import { getUniqueID } from '@utils/index';
import { useTimelineContext } from '@components/contexts';
import { useFullscreen } from '@hooks/useFullscreen';
```

**Available aliases:**
- `@utils/*` → `src/utils/*`
- `@models/*` → `src/models/*`
- `@effects/*` → `src/effects/*` (legacy effects/hooks)
- `@components/*` → `src/components/*`
- `@hooks/*` → `src/hooks/*`

### 7. Google Fonts Integration

The project supports dynamic Google Fonts loading with per-element control:

**Location:** `src/components/fonts/`

**Features:**
- Dynamic font loading with intelligent caching
- Per-element font weight and style control
- Automatic fallback handling
- Font provider wraps timeline for global availability

**Configuration:**
```typescript
<Chrono
  style={{
    fontFamily: {
      googleFont: {
        name: 'Inter',
        weights: [400, 600, 700],
        styles: ['normal', 'italic']
      }
    }
  }}
/>
```

### 8. Props API: Old vs New (Grouped API)

The project supports both legacy and new grouped API for backward compatibility:

**Old API (deprecated but still works):**
```typescript
<Chrono
  borderLessCards={true}
  disableNavOnKey={false}
  timelinePointDimension={18}
/>
```

**New Grouped API (preferred):**
```typescript
<Chrono
  display={{ borderless: true }}
  interaction={{ keyboardNavigation: true }}
  layout={{ pointSize: 18 }}
/>
```

**Automatic Migration System:**
- Located in `src/utils/propMigration.ts`
- Root component (`src/components/index.tsx`) detects which API is used
- `migrateLegacyProps()` automatically converts old → new format
- `warnDeprecatedProps()` logs development warnings for deprecated props
- All internal components work exclusively with the new format

**When adding new props:**
1. Add to the appropriate group in `src/models/TimelinePropsV2.ts` (layout, interaction, content, display, media, animation, style, accessibility, i18n)
2. Update prop migration mapping in `src/utils/propMigration.ts` for backward compatibility
3. Add deprecation warning if replacing an old prop

## Important Technical Details

### Build System
- **Bundler:** Vite for development and production builds
- **Target:** ES2022 with React 18.2+ and React 19+ support
- **Externals:** React and React-DOM are peer dependencies (not bundled)
- **Output:** ESM (`dist/index.esm.js`), CJS (`dist/index.cjs`), Types (`dist/types/index.d.ts`), CSS (`dist/style.css`)
- **Entry Points:** `src/react-chrono.ts` (library entry) exports from `src/components/index.tsx` (root component)
- **Bundle Size Limit:** 250 KB for both ESM and CJS outputs
- **Node Version:** Requires Node.js 22+ (specified in package.json engines)

### Testing Strategy
- **Unit tests:** Vitest with @testing-library/react (prefer `@testing-library/react` over enzyme)
- **E2E tests:** Playwright with cross-browser testing (Chrome, Firefox, Safari, Edge)
- **Component tests:** Playwright component testing for isolated behavior
- **Integration tests:** Playwright integration tests for build output validation
- **Test location:** Co-located with source files in `__tests__/` subdirectories
- **Run specific test:** `pnpm test <pattern>` (e.g., `pnpm test timeline` runs tests matching "timeline")

### Browser Compatibility
- Modern browsers: Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Mobile
- No IE11 support (explicitly excluded in browserslist)

### Accessibility Requirements
- All interactive elements must have proper ARIA labels
- Keyboard navigation is critical (arrow keys, Home/End, Enter, Escape)
- Focus management must be explicit and logical (use `useFocusManager` hook for focus trapping)
- Respect `prefers-reduced-motion` for animations
- Maintain WCAG AA contrast ratios (4.5:1) in themes

### Internationalization (i18n)
- The project has comprehensive i18n support via `useI18n` hook
- Customize UI text through the `i18n` prop group with 40+ configurable text elements
- Located in `src/models/TimelineI18n.ts` for type definitions
- Text resolution handled by `src/utils/textResolver.ts`
- Supports template strings with variable interpolation

## Common Development Workflows

### Adding a New Component
1. Create component in appropriate directory under `src/components/`
2. Use Vanilla Extract for styling (create `*.css.ts` file)
3. Add TypeScript types/models in `src/models/`
4. Create test file in `__tests__/` subdirectory
5. Export from relevant `index.ts` if needed

### Fixing Fullscreen Issues
If a component doesn't appear in fullscreen mode:
1. Check if it uses `ReactDOM.createPortal()`
2. Ensure it portals to the fullscreen element when active (see section 5 above)
3. Add fullscreen event listeners to update portal container
4. Test in multiple browsers (Chrome, Safari, Firefox have different implementations)

### Working with Styles
1. Create `component-name.css.ts` file
2. Import design tokens from `src/styles/tokens/`
3. Use sprinkles for common utilities (`src/styles/system/sprinkles.css.ts`)
4. Use recipes from `@vanilla-extract/recipes` for component variants
5. Import with `.css` extension: `import { className } from './component.css'` (NOT `.css.ts`)
6. For responsive styles, use sprinkles conditions: `{ mobile: 'block', desktop: 'flex' }`
7. Runtime theme CSS variables are handled by `src/styles/theme-bridge.ts`

### Adding a Custom Hook
1. Create hook in `src/hooks/` directory
2. Use `useCallback` and `useMemo` for stable references
3. Add comprehensive unit tests
4. Document return types with TypeScript
5. Export from `src/hooks/index.ts`

### Debugging Test Failures
- Unit tests: Check `coverage/` directory for coverage reports
- E2E tests: Use `pnpm run test:e2e:ui` for interactive debugging
- View traces: `pnpm run test:trace` for Playwright traces
- Update snapshots: `pnpm run test:update-snapshots` when intentional changes occur

## Requirements & Package Manager

**Node.js:** Version 22 or higher (required by package.json engines)

**Package Manager:** pnpm (version 10.15.1 or compatible)

The project uses pnpm for faster installs and better dependency management. Do not use npm or yarn.

## Common Pitfalls & Important Patterns

### 1. Vanilla Extract Import Extensions
**ALWAYS** import Vanilla Extract styles with `.css` extension (not `.css.ts`):
```typescript
// ✅ Correct
import { wrapper } from './component.css';

// ❌ Wrong
import { wrapper } from './component.css.ts';
```

### 2. Context Subscriptions
Use selective context hooks to prevent unnecessary re-renders:
```typescript
// ❌ Avoid - subscribes to all context changes
const context = useTimelineContext();

// ✅ Prefer - only subscribes to static config
const { mode, cardHeight } = useTimelineStaticConfig();
```

### 3. Portal Rendering
Any component using `ReactDOM.createPortal()` MUST detect and portal to fullscreen element:
```typescript
const fullscreenEl = getFullscreenElement();
const container = fullscreenEl || document.body;
ReactDOM.createPortal(content, container);
```

### 4. Prop Migration
When adding/modifying props, always update both:
- `src/models/TimelinePropsV2.ts` - New grouped API
- `src/utils/propMigration.ts` - Legacy prop mapping

### 5. Stable Hook References
Always use `useCallback` and `useMemo` in custom hooks to prevent downstream re-renders:
```typescript
const stableFunction = useCallback(() => { /* ... */ }, [deps]);
const memoizedValue = useMemo(() => computeValue(), [deps]);
```

### Performance Considerations
- Components use `React.memo()` for render optimization
- Context values are memoized with comprehensive dependency tracking
- Use selective context subscriptions (`useTimelineStaticConfig`, `useTimelineDynamicState`) to prevent unnecessary re-renders
- Hooks return stable references via `useCallback` and `useMemo`
- Media loading is lazy with IntersectionObserver
- Item comparison uses hash-based diffing for efficiency

## Critical Files
- `src/react-chrono.ts` - Main library entry point (exports)
- `src/components/index.tsx` - Root Chrono component (prop migration and validation)
- `src/components/timeline/timeline.tsx` - Main Timeline orchestrator
- `src/components/contexts/TimelineContextProvider.tsx` - Unified context system
- `src/utils/propMigration.ts` - Legacy to new props conversion
- `src/models/TimelinePropsV2.ts` - New grouped props interface
- `src/models/TimelineI18n.ts` - i18n type definitions
- `vite.config.mts` - Build configuration
- `tsconfig.json` - TypeScript configuration with path aliases
