# Changelog

## [3.3.2] - 2025-12-08

### Features
- Auto-select-first item in Horizontal mode (#593)

### Improvements
- Show timeline titles above the timeline card in vertical modes for better UX

### Infrastructure
- Migrate from pnpm to Bun (#590)
- Update GitHub Actions workflows for improved caching and dependency management

## [3.3.1] - 2025-11-27

### Bug Fixes
- Fix gaps between timeline points in horizontal mode when there are few items (#582)

### Features
- Add collapsible demo sidebar (#583)
- Add media showcase demo component

### Improvements
- Refactor JSX formatting in text-or-content component
- Fix theme details propagation to text details section
- Optimize README assets and images (#581)
- Reorganize build configuration files (Vite, ESLint, TypeScript, Storybook)
- Add BACKLOG.md for tracking future features

### Chores
- Remove obsolete configuration files and update project structure
- Update package dependencies and snapshots
- Clean up demo components and data files

## [3.3.0] - 2025-11-25

### Features
- Add read more/expand functionality to ContentDisplay component with overflow detection
- Enhance dynamic item updates with improved state preservation and scroll position tracking
- Add theme and line width customization for horizontal timeline
- Improve dark mode synchronization in TimelineContextProvider

### Improvements
- Refactor design token system: consolidate semantic tokens, deprecate legacy imports
- Improve focus behavior in timeline component with better initial render handling
- Update CSS styles for media details expanded/minimized states
- Enhance timeline card styles and nested timeline layout
- Optimize component re-renders with memoization and useCallback

### Bug Fixes
- Fix custom elements in left content (Fixes #520)
- Fix item update handling to differentiate between appends and replacements

### Testing
- Add comprehensive tests for dynamic item updates and active item index validation

## [3.2.2] - 2025-11-24

### Bug Fixes
- Fix focus behavior and cleanup code
- Fix vanilla-extract configuration for Storybook production builds

### Features
- Add comprehensive Storybook examples (modes, media, theming, interactive)
- Add 6 CodeSandbox examples (quick-start, product-roadmap, media-gallery, nested-timeline, dark-portfolio, full-demo)
- Add Chromatic integration for visual testing

### Documentation
- Add SECURITY.md with security policy and best practices
- Revamp README layout to table format for better readability
- Proofread README and API documentation
- Update Node.js requirement to 22+ and React 19 support
- Remove CodeSandbox and Storybook sections from README (moved to examples)

### Infrastructure
- Update ESLint configuration
- Add Storybook link to README

