# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React Chrono is a modern, flexible timeline component library for React that supports multiple layout modes (horizontal, vertical, vertical-alternating, horizontal-all) with rich media support, theming, and accessibility features. Built with TypeScript, Vanilla Extract CSS, and tested with Vitest + Playwright.

## Essential Commands

### Development
```bash
pnpm run dev              # Start dev server with hot reload (site preview)
pnpm run build            # Production build (generates dist/)
pnpm run build:analyze    # Build with bundle analysis
```

### Testing
```bash
pnpm test                 # Run unit tests (Vitest)
pnpm test -- --run        # Run tests once without watch mode
pnpm run test-ui          # Run tests with Vitest UI

# E2E Testing (Playwright)
pnpm run test:e2e         # Run all E2E tests
pnpm run test:e2e:ui      # Run E2E with Playwright UI
pnpm run test:e2e:headed  # Run E2E in headed mode (visible browser)
pnpm run test:e2e:chrome  # Run E2E in Chrome only
pnpm run test:e2e:firefox # Run E2E in Firefox only
pnpm run test:ct          # Component tests with Playwright
```

### Code Quality
```bash
pnpm run eslint           # Lint TypeScript files
pnpm run fix-js           # Auto-fix ESLint issues
pnpm run format           # Format code with Prettier
pnpm run lint             # Check Prettier formatting
pnpm run lint:all         # Run all linting (ESLint + CSS + Prettier)
pnpm run clean            # Format and lint everything
pnpm run find-bugs        # TypeScript check + lint + test
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
TimelineStaticConfig    // Rarely changing configuration
TimelineDynamicState    // Frequently changing state
TimelineMemoizedObjects // Computed/memoized values
```

**Usage pattern:**
```typescript
import { useTimelineContext } from '../contexts';

const { theme, mode, isDarkMode, toggleDarkMode } = useTimelineContext();
```

### 3. Custom Hooks Organization

The project uses custom hooks extensively to separate concerns:

**Location:** `src/hooks/`

**Key hooks:**
- `useFullscreen.ts` - Cross-browser fullscreen API with vendor prefixes
- `useTimelineNavigation.ts` - Handles item navigation and keyboard controls
- `useTimelineScroll.ts` - Scroll behavior and positioning
- `useTimelineSearch.ts` - Search functionality with match highlighting
- `useTimelineMode.ts` - Timeline mode switching logic
- `useI18n.ts` - Internationalization support

**Pattern:** Hooks return stable references using `useCallback` and `useMemo` to prevent unnecessary re-renders.

### 4. Component Structure

**Main timeline component:**
- `src/components/timeline/timeline.tsx` - Root Timeline component
- `src/components/timeline/TimelineView.tsx` - Renders timeline layout
- `src/components/timeline/timeline-toolbar.tsx` - Toolbar with controls

**Reusable elements:**
- `src/components/elements/` - Generic UI elements (popover, list, etc.)
- `src/components/timeline-elements/` - Timeline-specific components
- `src/components/toolbar/` - Toolbar components

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

### 7. Props API: Old vs New (Grouped API)

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

When adding new props, support both patterns using the prop mapping system in `TimelineContextProvider`.

## Important Technical Details

### Build System
- **Bundler:** Vite for development and production builds
- **Target:** ES2022 with React 18/19 support
- **Externals:** React, React-DOM, and styled-components are peer dependencies
- **Output:** ESM (`index.esm.js`) and CJS (`index.cjs`) formats

### Testing Strategy
- **Unit tests:** Vitest with @testing-library/react (prefer `@testing-library/react` over enzyme)
- **E2E tests:** Playwright with cross-browser testing (Chrome, Firefox, Safari, Edge)
- **Component tests:** Playwright component testing for isolated behavior
- **Test location:** Co-located with source files in `__tests__/` directories

### Browser Compatibility
- Modern browsers: Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Mobile
- No IE11 support (explicitly excluded in browserslist)

### Accessibility Requirements
- All interactive elements must have proper ARIA labels
- Keyboard navigation is critical (arrow keys, Home/End, Enter, Escape)
- Focus management must be explicit and logical
- Respect `prefers-reduced-motion` for animations
- Maintain WCAG AA contrast ratios (4.5:1) in themes

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
3. Use sprinkles for common utilities
4. Use recipes for component variants
5. Import with `.css` extension: `import { className } from './component.css'`

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

## Package Manager
**Required:** pnpm (version 10.15.1 or compatible)

The project uses pnpm for faster installs and better dependency management. Do not use npm or yarn.

## Critical Files
- `src/react-chrono.ts` - Main library entry point
- `src/components/timeline/timeline.tsx` - Root component
- `src/components/contexts/TimelineContextProvider.tsx` - Context system
- `vite.config.mts` - Build configuration
- `tsconfig.json` - TypeScript configuration with path aliases
