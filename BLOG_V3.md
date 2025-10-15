# React Chrono v3.0: A Complete Evolution

We're thrilled to announce **React Chrono v3.0**, the most significant release in the library's history. After months of development and a complete architectural overhaul, v3.0 delivers enhanced performance, developer experience, and a rich set of new features while maintaining backward compatibility with your existing code.

## What's New at a Glance

React Chrono v3.0 introduces:

- 🎨 **Zero-runtime CSS** with Vanilla Extract migration (46+ CSS files)
- 🌐 **Comprehensive internationalization** supporting 60+ text elements across 11 categories
- 🎭 **Google Fonts integration** with per-element font control
- 🖼️ **Fullscreen mode** with cross-browser support
- 🎯 **Grouped configuration API** for better developer experience
- 🧪 **Playwright testing** for robust E2E coverage
- 🎪 **Enhanced dark mode** with 36 theme properties (13 new in v3.0)
- 📌 **Sticky toolbar** for always-accessible controls
- 🔍 **Advanced search** with configurable dimensions

---

## 🏗️ Architectural Overhaul

### From Styled-Components to Vanilla Extract

One of the most significant changes in v3.0 is the **complete migration from styled-components to Vanilla Extract**. This migration brings substantial benefits to both performance and developer experience.

> **Why Vanilla Extract?**
> Vanilla Extract generates static CSS at build time, resulting in zero runtime overhead. Your timeline components now load faster with smaller bundle sizes, while maintaining full TypeScript support and type-safe styling.

**Performance improvements:**
- ⚡ **Zero runtime** CSS-in-JS overhead
- 📦 **Smaller bundle size** - no runtime style generation
- 🚀 **Faster initial render** - styles are pre-generated
- 💪 **Type-safe styles** - full TypeScript integration

**Before (styled-components):**
```typescript
const TimelineCard = styled.div`
  background: ${props => props.theme.cardBgColor};
  border-radius: 8px;
  padding: 1rem;
`;
```

**After (Vanilla Extract):**
```typescript
// timeline-card.css.ts
import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens';

export const card = style({
  background: tokens.color.cardBackground,
  borderRadius: tokens.radius.medium,
  padding: tokens.space[4],
});
```

The migration spans **46+ CSS files** across the entire codebase, with styles organized into logical groups:
- `src/styles/tokens/` - Design tokens and theme variables
- `src/styles/sprinkles/` - Utility-based styling system
- `src/styles/recipes/` - Component variants and patterns
- Component-specific `*.css.ts` files co-located with components

**Migration benefits for developers:**
- All styles are type-checked at compile time
- IDE autocomplete for style properties
- Impossible to introduce invalid CSS
- Better refactoring support with TypeScript
- Improved debugging with static class names

### Unified Context Architecture

v3.0 introduces a **single optimized context provider** replacing multiple nested contexts, reducing re-renders and improving performance.

**Old approach (multiple contexts):**
```typescript
<TimelineStaticContext.Provider>
  <TimelineDynamicContext.Provider>
    <TimelineComputedContext.Provider>
      {/* Component tree */}
    </TimelineComputedContext.Provider>
  </TimelineDynamicContext.Provider>
</TimelineStaticContext.Provider>
```

**New approach (unified context):**
```typescript
<TimelineContextProvider {...props}>
  {/* Component tree */}
</TimelineContextProvider>
```

The new context architecture organizes values into three logical groups:
- **Static Config** - Rarely changing configuration (theme, mode, layout settings)
- **Dynamic State** - Frequently changing state (activeItemIndex, slideshow state)
- **Memoized Objects** - Computed values (handlers, derived state)

This results in **fewer re-renders** and **better performance** across the entire component tree.

---

## ✨ New Features

### 🌐 Comprehensive Internationalization (i18n)

v3.0 introduces a **complete internationalization system** supporting **60+ configurable text elements across 11 categories**, making React Chrono truly global-ready.

> **Full localization support**
> Every user-facing text in the timeline is now configurable, from navigation buttons to accessibility labels, search placeholders to keyboard help text.

**Supported text categories:**
- Navigation controls (first, last, next, previous, play, pause)
- Search functionality (placeholder, results count, no results)
- Theme controls (dark mode, light mode, toggle theme)
- Layout modes (vertical, horizontal, alternating)
- Fullscreen (enter, exit, error messages)
- Quick jump navigation
- Content interactions (read more, show less, expand, collapse)
- Loading and status messages
- Accessibility labels (ARIA labels, screen reader text)
- View density controls
- Keyboard navigation help

**Example - Spanish localization:**
```tsx
<Chrono
  items={items}
  i18n={{
    texts: {
      navigation: {
        first: 'Ir al primer elemento',
        last: 'Ir al último elemento',
        next: 'Siguiente elemento',
        previous: 'Elemento anterior',
        play: 'Iniciar presentación',
        pause: 'Pausar presentación'
      },
      search: {
        placeholder: 'Buscar en la línea de tiempo',
        ariaLabel: 'Buscar contenido de la línea de tiempo',
        clearLabel: 'Limpiar búsqueda',
        resultsCount: '{current} de {total}',
        noResults: 'No se encontraron resultados'
      },
      theme: {
        darkMode: 'Cambiar a modo oscuro',
        lightMode: 'Cambiar a modo claro'
      },
      accessibility: {
        timelineNavigation: 'Navegación de línea de tiempo',
        timelineItem: 'Elemento de línea de tiempo',
        activeItem: 'Elemento activo de línea de tiempo',
        itemPosition: 'Elemento {current} de {total}'
      }
    },
    locale: 'es',
    direction: 'ltr'
  }}
/>
```

**Template string support:**

The i18n system includes intelligent template string interpolation:

```tsx
// Define template with placeholders
i18n={{
  texts: {
    search: {
      resultsCount: '{current} of {total}'
    },
    accessibility: {
      itemPosition: 'Item {current} of {total}'
    }
  }
}}

// Runtime: "3 of 15", "Item 5 of 20", etc.
```

**Built-in utilities:**

```typescript
import { mergeI18nConfig, interpolateString } from '@models/TimelineI18n';

// Merge custom config with defaults
const config = mergeI18nConfig(userConfig);

// Interpolate template strings
const text = interpolateString('{current} of {total}', { current: 3, total: 15 });
// Result: "3 of 15"
```

### 🎭 Google Fonts Integration

Dynamically load and apply Google Fonts with **per-element font control** - set different weights, styles, and sizes for titles, card content, subtitles, and controls.

> **Granular typography control**
> Load a single Google Font family and configure different weights, styles, and sizes for each text element in your timeline.

**Basic usage:**
```tsx
<Chrono
  items={items}
  style={{
    googleFonts: {
      fontFamily: 'Inter',
      weights: [400, 600, 700],
      display: 'swap',
      preconnect: true
    }
  }}
/>
```

**Advanced - per-element configuration:**
```tsx
<Chrono
  items={items}
  style={{
    googleFonts: {
      fontFamily: 'Playfair Display',
      elements: {
        title: {
          weight: 'bold',      // 700
          style: 'normal',
          size: '1.5rem'
        },
        cardTitle: {
          weight: 'semi-bold', // 600
          style: 'italic',
          size: '1.25rem'
        },
        cardSubtitle: {
          weight: 'regular',   // 400
          style: 'normal',
          size: '1rem'
        },
        cardText: {
          weight: 300,         // light
          style: 'normal',
          size: '0.95rem'
        },
        controls: {
          weight: 'medium',    // 500
          style: 'normal'
        }
      },
      display: 'swap',
      preconnect: true
    }
  }}
/>
```

**Font loading features:**
- Automatic preconnect to Google Fonts for faster loading
- Configurable `font-display` strategy (`swap`, `fallback`, `optional`)
- Intelligent weight deduplication (only loads required weights)
- TypeScript-safe weight and style configuration
- Fallback font stack for better accessibility
- Support for both numeric (100-900) and named weights (`thin`, `regular`, `bold`, etc.)

**Generated CSS variables:**

The Google Fonts system automatically generates CSS variables for theming:

```css
--timeline-font-family: "Inter", system-ui, sans-serif;
--timeline-title-font-weight: 700;
--timeline-title-font-style: normal;
--timeline-cardTitle-font-weight: 600;
--timeline-cardTitle-font-style: italic;
```

### 🖼️ Fullscreen Mode

Experience timelines in immersive fullscreen mode with **cross-browser support** (Chrome, Firefox, Safari, Edge).

> **Browser compatibility built-in**
> Fullscreen mode automatically handles vendor prefixes and browser-specific APIs, ensuring consistent behavior across all major browsers.

```tsx
import { useFullscreen } from '@hooks/useFullscreen';

function MyTimeline() {
  const containerRef = useRef(null);
  const { isFullscreen, enterFullscreen, exitFullscreen, isSupported } = useFullscreen(containerRef);

  return (
    <div ref={containerRef}>
      <Chrono items={items} />

      {isSupported && (
        <button onClick={isFullscreen ? exitFullscreen : enterFullscreen}>
          {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      )}
    </div>
  );
}
```

**Cross-browser support includes:**
- Standard Fullscreen API
- WebKit prefixed API (Safari)
- Mozilla prefixed API (Firefox)
- MS prefixed API (Edge legacy)
- Automatic vendor prefix detection
- Feature detection for unsupported browsers
- Portal rendering to fullscreen element for overlays

**Fullscreen-aware components:**

Components like popover menus automatically detect fullscreen mode and portal to the correct container:

```typescript
// Automatically portals to fullscreen element when active
const portalContainer = getFullscreenElement() || document.body;
ReactDOM.createPortal(content, portalContainer);
```

### 🎯 Grouped Configuration API

Organize props into **9 logical groups** for better discoverability and maintainability. The old flat API is still supported for backward compatibility.

> **Better developer experience**
> Props are now organized into intuitive groups: layout, interaction, content, display, media, animation, style, accessibility, and i18n.

**Old API (still works):**
```tsx
<Chrono
  items={items}
  borderLessCards={true}
  disableNavOnKey={false}
  timelinePointDimension={18}
  parseDetailsAsHTML={true}
  mediaHeight={400}
  slideShow={true}
  slideItemDuration={3000}
/>
```

**New grouped API (recommended):**
```tsx
<Chrono
  items={items}
  display={{
    borderless: true,
    pointShape: 'circle'
  }}
  interaction={{
    keyboardNavigation: true,
    autoScroll: true
  }}
  layout={{
    pointSize: 18,
    cardWidth: 400
  }}
  content={{
    allowHTML: true
  }}
  media={{
    height: 400,
    fit: 'cover'
  }}
  animation={{
    slideshow: {
      enabled: true,
      duration: 3000,
      type: 'fade'
    }
  }}
/>
```

**Configuration groups:**

1. **`layout`** - Sizing and positioning
   - `cardWidth`, `cardHeight`, `pointSize`, `lineWidth`
   - `responsive.breakpoint`, `positioning.cardPosition`

2. **`interaction`** - User interactions
   - `keyboardNavigation`, `pointClick`, `autoScroll`
   - `focusOnLoad`, `cardHover`, `disabled`

3. **`content`** - Content handling
   - `allowHTML`, `readMore`, `textOverlay`
   - `dateFormat`, `compactText`, `semanticTags`

4. **`display`** - Visual appearance
   - `borderless`, `cardsDisabled`, `pointsDisabled`
   - `pointShape`, `allCardsVisible`, `scrollable`
   - `toolbar.enabled`, `toolbar.position`, `toolbar.sticky`

5. **`media`** - Media configuration
   - `height`, `align`, `fit`

6. **`animation`** - Slideshow and animations
   - `slideshow.enabled`, `slideshow.duration`, `slideshow.type`
   - `slideshow.autoStart`, `slideshow.showProgress`

7. **`style`** - Custom styling
   - `classNames`, `fontSizes`, `googleFonts`

8. **`accessibility`** - A11y and i18n
   - `buttonTexts`, `search` labels

9. **`i18n`** - Internationalization
   - `texts`, `locale`, `direction`

**TypeScript autocomplete:**

The grouped API provides excellent IDE autocomplete and type checking:

```tsx
<Chrono
  display={{
    toolbar: {
      enabled: true,
      position: 'top' | 'bottom',  // ✅ Type-safe
      sticky: true,
      search: {
        width: '200px',
        maxWidth: '400px'
      }
    }
  }}
/>
```

### 📌 Sticky Toolbar

Pin the toolbar to the top or bottom of the viewport for **always-accessible controls** during scrolling.

```tsx
<Chrono
  items={items}
  display={{
    toolbar: {
      enabled: true,
      position: 'top',
      sticky: true,  // 🆕 Sticky positioning
      search: {
        width: '250px',
        maxWidth: '400px'
      }
    }
  }}
/>
```

The sticky toolbar maintains position during scroll, ensuring users always have access to:
- Navigation controls (first, previous, next, last)
- Slideshow controls (play, pause, stop)
- Dark mode toggle
- Layout switcher
- Search functionality
- Quick jump navigation

### 🔍 Enhanced Search Configuration

Fine-tune search input dimensions and positioning with **granular width controls**.

```tsx
<Chrono
  items={items}
  display={{
    toolbar: {
      enabled: true,
      search: {
        width: '200px',        // Default search section width
        maxWidth: '400px',     // Maximum expansion width
        minWidth: '150px',     // Minimum width
        inputWidth: '180px',   // Actual input field width
        inputMaxWidth: '350px' // Maximum input expansion
      }
    }
  }}
/>
```

**Search features:**
- Real-time highlighting of matches
- Navigate between matches with Enter/Shift+Enter
- Results counter (`{current} of {total}`)
- Clear search button
- Configurable placeholder and ARIA labels (via i18n)
- Case-insensitive search
- Search across title, subtitle, and card content

### 🎪 Enhanced Dark Mode

v3.0 introduces **36 comprehensive theme properties** (including 13 new dark mode-specific properties) for complete customization.

**Enhanced theme system:**
```tsx
<Chrono
  items={items}
  theme={{
    primary: '#3b82f6',
    secondary: '#1e40af',

    // Card theming
    cardBgColor: '#1f2937',
    cardForeColor: '#f3f4f6',

    // Enhanced dark mode properties
    iconColor: '#9ca3af',
    buttonHoverBgColor: '#374151',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    glowColor: '#3b82f6',

    // Timeline elements
    titleColor: '#f9fafb',
    titleColorActive: '#3b82f6',
    cardTitleColor: '#e5e7eb',
    cardSubtitleColor: '#9ca3af',
    cardDetailsColor: '#d1d5db',

    // Interactive elements
    focusRingColor: '#3b82f6',
    borderColor: '#374151'
  }}
  darkMode={{
    enabled: true,
    showToggle: true
  }}
  onThemeChange={(theme) => {
    console.log('Theme changed:', theme);
  }}
/>
```

**Theme callback:**

React to theme changes programmatically:

```tsx
<Chrono
  items={items}
  darkMode={{ enabled: true, showToggle: true }}
  onThemeChange={(theme) => {
    // Persist preference
    localStorage.setItem('timeline-theme', JSON.stringify(theme));

    // Update app-level theme
    document.body.classList.toggle('dark-mode', theme.isDark);
  }}
/>
```

---

## 🧪 Testing Infrastructure

### Migration from Cypress to Playwright

v3.0 **completely migrates** from Cypress to Playwright for E2E and component testing, providing better performance, cross-browser testing, and modern testing capabilities.

> **Modern testing with Playwright**
> Playwright provides faster test execution, better debugging tools, parallel test running, and native support for multiple browsers including WebKit.

**Why Playwright?**
- ✅ **Faster execution** - Parallel test running out of the box
- ✅ **Better cross-browser support** - Chrome, Firefox, Safari (WebKit), Edge
- ✅ **Modern debugging** - Inspector, trace viewer, video recording
- ✅ **Component testing** - Test components in isolation
- ✅ **Auto-waiting** - Smart waiting for elements reduces flakiness
- ✅ **Network interception** - Mock APIs and test offline scenarios

**Test commands:**

```bash
# E2E tests
pnpm test:e2e              # Run all E2E tests
pnpm test:e2e:ui           # Open Playwright UI
pnpm test:e2e:headed       # Run with visible browser
pnpm test:e2e:chrome       # Chrome only
pnpm test:e2e:firefox      # Firefox only

# Component tests
pnpm test:ct               # Component tests in isolation

# Unit tests (Vitest)
pnpm test                  # Run unit tests
pnpm test:ui               # Vitest UI
```

**Test coverage:**

The migration includes **comprehensive E2E tests** covering:
- All timeline modes (horizontal, vertical, alternating, horizontal-all)
- Media handling (images, videos, lazy loading)
- Slideshow functionality (all animation types)
- Search functionality (search, navigation, highlighting)
- Keyboard navigation (arrow keys, Home/End, Enter, Escape)
- Dark mode toggle
- Fullscreen mode
- Responsive breakpoints
- Accessibility (ARIA labels, focus management)

**Example Playwright test:**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Timeline Search', () => {
  test('should highlight search matches and navigate between them', async ({ page }) => {
    await page.goto('http://localhost:4444');

    // Type search query
    await page.fill('[aria-label="Search timeline content"]', 'innovation');

    // Verify results counter
    await expect(page.locator('.search-results')).toContainText('1 of 5');

    // Navigate to next match
    await page.press('[aria-label="Search timeline content"]', 'Enter');
    await expect(page.locator('.search-results')).toContainText('2 of 5');

    // Verify match is highlighted
    const highlightedCard = page.locator('.timeline-card-active');
    await expect(highlightedCard).toContainText('innovation');
  });
});
```

---

## 🐛 Bug Fixes and Improvements

v3.0 includes **numerous bug fixes** and quality-of-life improvements based on community feedback:

### Navigation and Slideshow
- ✅ Fixed slideshow media deadlock causing frozen animations
- ✅ Resolved keyboard navigation conflicts with slideshow
- ✅ Improved slideshow card scrolling behavior
- ✅ Standardized icon dimensions across all controls
- ✅ Fixed slideshow not respecting pause state

### Layout and Positioning
- ✅ Fixed popover positioning in fullscreen mode
- ✅ Improved responsive breakpoint behavior for vertical alternating mode
- ✅ Resolved nested timeline rendering issues
- ✅ Fixed icon positioning in alternating mode
- ✅ Better card remeasurement on text density changes

### Search and Accessibility
- ✅ Fixed search focus behavior
- ✅ Improved dark mode text contrast
- ✅ Enhanced accessibility labels and ARIA attributes
- ✅ Fixed keyboard navigation focus management
- ✅ Better screen reader support

### Styling and Theming
- ✅ Fixed theme color inheritance issues
- ✅ Improved text overlay color handling
- ✅ Better dark mode CSS variable support
- ✅ Resolved horizontal timeline point sizing
- ✅ Enhanced list and popover responsive styles

### Performance
- ✅ Reduced unnecessary re-renders with optimized context
- ✅ Improved bundle size with Vanilla Extract migration
- ✅ Better lazy loading for media elements
- ✅ Optimized font loading with preconnect
- ✅ Faster initial render times

---

## 📦 Migration Guide

### For Existing Users

**Good news!** v3.0 maintains **full backward compatibility**. Your existing code will continue to work without changes.

**Immediate benefits (no code changes required):**
- ⚡ Faster performance (Vanilla Extract)
- 📦 Smaller bundle size
- 🐛 Bug fixes automatically applied
- 🎨 Enhanced theming with new dark mode properties

**Recommended: Migrate to grouped API**

While the old flat API still works, we recommend migrating to the new grouped API for better maintainability:

**Migration example:**

```tsx
// Before (v2.x)
<Chrono
  items={items}
  borderLessCards={true}
  disableNavOnKey={false}
  timelinePointDimension={18}
  parseDetailsAsHTML={true}
  mediaHeight={400}
  slideShow={true}
  slideItemDuration={3000}
  showProgressOnSlideshow={true}
  disableToolbar={false}
  toolbarPosition="top"
/>

// After (v3.0 - recommended)
<Chrono
  items={items}
  display={{
    borderless: true,
    toolbar: {
      enabled: true,
      position: 'top'
    }
  }}
  interaction={{
    keyboardNavigation: true
  }}
  layout={{
    pointSize: 18
  }}
  content={{
    allowHTML: true
  }}
  media={{
    height: 400
  }}
  animation={{
    slideshow: {
      enabled: true,
      duration: 3000,
      showProgress: true
    }
  }}
/>
```

**Deprecated props mapping:**

| Old Prop (v2.x) | New Prop (v3.0) |
|-----------------|----------------|
| `borderLessCards` | `display.borderless` |
| `disableNavOnKey` | `interaction.keyboardNavigation` (inverted) |
| `timelinePointDimension` | `layout.pointSize` |
| `parseDetailsAsHTML` | `content.allowHTML` |
| `mediaHeight` | `media.height` |
| `slideShow` | `animation.slideshow.enabled` |
| `slideItemDuration` | `animation.slideshow.duration` |
| `disableToolbar` | `display.toolbar.enabled` (inverted) |
| `toolbarPosition` | `display.toolbar.position` |
| `useReadMore` | `content.readMore` |
| `highlightCardsOnHover` | `interaction.cardHover` |
| `buttonTexts` | `accessibility.buttonTexts` |

**TypeScript support:**

All deprecated props are still typed and will show deprecation warnings with suggestions for new props:

```typescript
// TypeScript will show:
// ⚠️ 'borderLessCards' is deprecated. Use 'display.borderless' instead.
```

### New Project Setup

**Installation:**

```bash
npm install react-chrono@latest
# or
pnpm add react-chrono@latest
# or
yarn add react-chrono@latest
```

**Minimal setup:**

```tsx
import { Chrono } from 'react-chrono';

const items = [
  {
    title: 'January 2024',
    cardTitle: 'Project Kickoff',
    cardDetailedText: 'Started the new initiative with the team'
  },
  {
    title: 'February 2024',
    cardTitle: 'First Milestone',
    cardDetailedText: 'Completed initial design and architecture'
  }
];

function App() {
  return <Chrono items={items} mode="vertical" />;
}
```

**Recommended setup with new features:**

```tsx
import { Chrono } from 'react-chrono';

const items = [...]; // Your timeline items

function App() {
  return (
    <Chrono
      items={items}
      mode="vertical"

      // Enhanced theming
      theme={{
        primary: '#3b82f6',
        cardBgColor: '#ffffff',
        cardForeColor: '#1f2937'
      }}

      // Dark mode with toggle
      darkMode={{
        enabled: false,
        showToggle: true
      }}

      // Google Fonts
      style={{
        googleFonts: {
          fontFamily: 'Inter',
          weights: [400, 600, 700],
          display: 'swap'
        }
      }}

      // Sticky toolbar with search
      display={{
        toolbar: {
          enabled: true,
          position: 'top',
          sticky: true,
          search: {
            width: '250px',
            maxWidth: '400px'
          }
        }
      }}

      // Internationalization
      i18n={{
        texts: {
          search: {
            placeholder: 'Search Timeline'
          }
        },
        locale: 'en'
      }}

      // Enhanced interactions
      interaction={{
        keyboardNavigation: true,
        autoScroll: true,
        cardHover: true
      }}
    />
  );
}
```

---

## 🎯 What's Next

We're committed to continuous improvement of React Chrono. Here's what's on the roadmap:

### Upcoming Features
- 🌍 Additional pre-built i18n locale packages (French, German, Spanish, Japanese)
- 📱 Enhanced mobile gestures (swipe navigation)
- 🎨 More timeline point shapes (hexagon, star, custom icons)
- 📊 Timeline data visualization modes (Gantt-style, density view)
- 🔌 Plugin system for extensibility
- 🎭 More animation presets for slideshow
- 📸 Image gallery mode with lightbox

### Community
- 📚 Comprehensive Storybook documentation
- 🎓 Video tutorials and guides
- 🏗️ Real-world example projects
- 💬 Community showcase gallery

---

## 🙏 Acknowledgments

React Chrono v3.0 is the result of months of work, feedback from the community, and contributions from developers worldwide. A special thanks to:

- All **contributors** who submitted issues, PRs, and feedback
- The **Vanilla Extract team** for the excellent CSS-in-TypeScript framework
- The **Playwright team** for modern testing infrastructure
- Everyone using React Chrono in **production applications**

---

## 📚 Resources

- **Documentation:** [PROPS-REFERENCE.md](./PROPS-REFERENCE.md)
- **Migration Guide:** [README-v2.md](./README-v2.md)
- **Vanilla Extract Migration:** [VANILLA_EXTRACT_MIGRATION.md](./VANILLA_EXTRACT_MIGRATION.md)
- **GitHub:** [react-chrono](https://github.com/prabhuignoto/react-chrono)
- **NPM:** [react-chrono](https://www.npmjs.com/package/react-chrono)
- **Demo Site:** Run `pnpm dev` for local demos

---

## 🚀 Get Started Today

Upgrade to React Chrono v3.0 and experience the next generation of timeline components:

```bash
npm install react-chrono@latest
```

We can't wait to see what you build with React Chrono v3.0! If you have questions, feedback, or want to showcase your timeline, join us on [GitHub Discussions](https://github.com/prabhuignoto/react-chrono/discussions).

Happy timeline building! 🎉

---

## 💬 Feedback & Support

We value your feedback and want to make React Chrono better for everyone. Here's how you can get help or contribute:

### 📝 Bug Reports & Feature Requests

Found a bug or have an idea for a new feature?

- **Report issues:** [GitHub Issues](https://github.com/prabhuignoto/react-chrono/issues)
- **Feature requests:** [GitHub Discussions - Ideas](https://github.com/prabhuignoto/react-chrono/discussions/categories/ideas)

When reporting bugs, please include:
- React Chrono version
- React version
- Browser and OS information
- Minimal reproduction example (CodeSandbox or StackBlitz preferred)
- Steps to reproduce the issue

### 💡 Questions & Help

Need help using React Chrono?

- **Ask questions:** [GitHub Discussions - Q&A](https://github.com/prabhuignoto/react-chrono/discussions/categories/q-a)
- **Browse documentation:** [Props Reference](./PROPS-REFERENCE.md)
- **Check examples:** Run `pnpm dev` to see live demos locally

### 🤝 Contributing

We welcome contributions from the community!

- **Code contributions:** Check out open issues labeled [good first issue](https://github.com/prabhuignoto/react-chrono/labels/good%20first%20issue)
- **Documentation:** Help improve our docs and examples
- **Testing:** Add test coverage or report edge cases
- **Spread the word:** Star the repo ⭐ and share with others

See our [Contributing Guidelines](https://github.com/prabhuignoto/react-chrono/blob/master/CONTRIBUTING.md) for more details.

### 🌟 Show Your Support

If React Chrono has been helpful in your projects:

- ⭐ **Star the repository** on [GitHub](https://github.com/prabhuignoto/react-chrono)
- 🐦 **Share your projects** using #ReactChrono on social media
- 💬 **Join the discussion** and help others in the community
- ☕ **Sponsor development** via [GitHub Sponsors](https://github.com/sponsors/prabhuignoto)

### 📧 Direct Contact

For security issues or sensitive matters:
- **Email:** prabhu.m.murthy@gmail.com
- **Security vulnerabilities:** Please use [GitHub Security Advisories](https://github.com/prabhuignoto/react-chrono/security/advisories)

---

Thank you for using React Chrono! Your feedback drives our development and helps us build a better library for everyone. 🙏
