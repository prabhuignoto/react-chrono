# React-Chrono 3.0 Is Here: Building Beautiful Timelines Just Got Better

*A major upgrade that combines performance, developer experience, and flexibility—without breaking your existing code*

---

If you've ever tried to build a timeline component from scratch, you know the pain. Positioning elements along a line, handling responsive layouts, managing media, implementing keyboard navigation, supporting dark mode—it's more complex than it looks. That's why React-Chrono exists: to give you a production-ready, beautiful timeline component that just works.

Today, I'm excited to introduce **React-Chrono 3.0**—a significant evolution that makes building timelines faster, more intuitive, and more powerful than ever.

## What Is React-Chrono?

For those new to the library, React-Chrono is a flexible, modern timeline component for React applications. It's used by thousands of developers to create everything from product roadmaps and company history pages to interactive storytelling experiences and educational modules.

The library has been around since 2020, and over the years it's become known for three things:

1. **Beautiful design out of the box** — No CSS wrestling required
2. **Four flexible layout modes** — Horizontal, vertical, alternating, and horizontal-all
3. **Rich feature set** — Media support, theming, accessibility, keyboard navigation, search, slideshow mode, and more

## Why v3.0 Matters

Version 3.0 represents a complete architectural overhaul while maintaining 100% backward compatibility. Here's what's new.

### 1. Grouped Configuration API: Say Goodbye to Prop Soup

One of the biggest changes in v3.0 is the new **grouped configuration API**. Instead of dealing with dozens of scattered props, everything is now organized into logical groups.

**Before (still works!):**

```jsx
<Chrono
  items={items}
  cardWidth={450}
  cardHeight={200}
  timelinePointDimension={18}
  disableNavOnKey={false}
  parseDetailsAsHTML={true}
  borderLessCards={false}
  mediaHeight={300}
  slideShow={true}
  slideItemDuration={4000}
/>
```

**After (recommended):**

```jsx
<Chrono
  items={items}
  layout={{
    cardWidth: 450,
    cardHeight: 200,
    pointSize: 18
  }}
  interaction={{
    keyboardNavigation: true
  }}
  content={{
    allowHTML: true
  }}
  display={{
    borderless: false
  }}
  media={{
    height: 300
  }}
  animation={{
    slideshow: {
      enabled: true,
      duration: 4000
    }
  }}
/>
```

The new API groups configuration into nine logical categories:

- `layout` — Sizing and positioning
- `interaction` — User interactions and navigation
- `content` — Content handling and formatting
- `display` — Visual elements and UI controls
- `media` — Image and video configuration
- `animation` — Slideshow and transitions
- `style` — Custom styling and CSS
- `accessibility` — ARIA labels and semantic HTML
- `i18n` — Internationalization

This organization makes the API more discoverable (IDE autocomplete is a dream now), easier to understand, and simpler to document.

**The best part?** Your existing code keeps working. The library automatically migrates old props to the new structure behind the scenes. Zero breaking changes.

### 2. Zero-Runtime CSS with Vanilla Extract

v3.0 migrates from styled-components to **Vanilla Extract**, a modern CSS-in-TypeScript solution that generates static CSS at build time.

**What does this mean for you?**

- **Faster runtime performance** — No CSS-in-JS runtime overhead
- **Smaller bundle size** — CSS is extracted, not embedded in JavaScript
- **Better type safety** — Full TypeScript support for styles
- **Improved developer experience** — Compile-time errors for style mistakes

The timeline feels snappier, especially when rendering large datasets or animating between items.

### 3. Auto Card Height: Let Content Breathe

One of the most requested features is finally here: **automatic card height**.

```jsx
<Chrono
  items={items}
  layout={{
    cardHeight: 'auto'  // Cards size to fit content
  }}
/>
```

Previously, cards had fixed heights, which meant you either wasted space with short content or truncated long content. Now cards automatically adapt to their content, making timelines look polished without manual height calculations.

This is perfect for:
- News timelines with varying article lengths
- Educational content with different detail levels
- Photo galleries with captions of different sizes

### 4. Content Alignment: Pixel-Perfect Control

v3.0 introduces granular control over how content is positioned within cards:

```jsx
<Chrono
  items={items}
  content={{
    alignment: {
      horizontal: 'center',  // left | center | right | stretch
      vertical: 'center'     // top | center | bottom | stretch
    }
  }}
/>
```

Whether you're building a minimalist portfolio or a data-dense project tracker, you now have full control over content positioning.

### 5. Google Fonts Integration

Beautiful typography is now one prop away:

```jsx
<Chrono
  items={items}
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

The library handles font loading, caching, and fallback strategies automatically. No more manual `<link>` tags or FOUT (flash of unstyled text) issues.

### 6. Comprehensive Internationalization

Global apps need global support. v3.0 introduces **40+ configurable text elements** for complete i18n:

```jsx
<Chrono
  items={items}
  i18n={{
    texts: {
      navigation: {
        first: 'Premier élément',
        next: 'Suivant',
        previous: 'Précédent',
        last: 'Dernier élément'
      },
      search: {
        placeholder: 'Rechercher dans la chronologie',
        noResults: 'Aucun résultat trouvé'
      }
    }
  }}
/>
```

Every button, label, and message can be customized for your target audience.

### 7. Fullscreen Mode

Immersive storytelling is now built-in:

```jsx
<Chrono
  items={items}
  display={{
    toolbar: {
      enabled: true  // Includes fullscreen toggle
    }
  }}
/>
```

Cross-browser fullscreen support works out of the box, with proper keyboard shortcuts (Escape to exit) and accessibility features.

### 8. Enhanced Dark Mode

Dark mode gets serious with **36 customizable theme properties**:

```jsx
<Chrono
  items={items}
  theme={{
    primary: '#0070f3',
    secondary: '#1f2937',
    cardBgColor: '#1a1a1a',
    cardForeColor: '#ffffff',
    cardTitleColor: '#60a5fa',
    titleColor: '#e5e7eb',
    // ... 30 more properties
  }}
/>
```

You can match your exact brand colors, not just toggle between light and dark presets.

### 9. Performance Optimizations Across the Board

v3.0 includes deep performance improvements:

- **14 custom hooks optimized** with memoization and RAF throttling
- **Unified context system** reduces unnecessary re-renders
- **Navigation hooks refactored** from one monolithic hook into focused, composable modules
- **Lazy media loading** with IntersectionObserver for fast initial renders
- **Efficient diffing** using hash-based comparison for large datasets

The result? Smoother animations, faster interactions, and better responsiveness—especially on mobile devices.

### 10. World-Class Testing with Playwright

v3.0 migrates from Cypress to **Playwright** for comprehensive cross-browser testing:

- **3,050+ lines of E2E tests** covering every feature
- **Cross-browser validation** on Chrome, Firefox, and Safari
- **Accessibility testing** for WCAG AA compliance
- **Performance monitoring** to catch regressions
- **Visual regression tests** to prevent UI bugs

This means fewer bugs, more confidence, and faster releases.

## Real-World Use Cases

Here's where React-Chrono shines:

### Product Roadmaps
Show your feature timeline with milestones, release dates, and progress indicators. The horizontal mode is perfect for roadmaps:

```jsx
<Chrono
  items={milestones}
  mode="horizontal"
  theme={{ primary: '#6366f1' }}
  animation={{
    slideshow: { enabled: true, duration: 5000 }
  }}
/>
```

### Company History
Tell your brand story with the alternating mode, adding photos, videos, and rich text:

```jsx
<Chrono
  items={companyHistory}
  mode="alternating"
  layout={{ cardHeight: 'auto' }}
  media={{ height: 400, fit: 'cover' }}
/>
```

### Educational Timelines
Create interactive learning experiences with nested timelines, custom components, and search:

```jsx
<Chrono
  items={historicalEvents}
  mode="vertical"
  display={{
    toolbar: { enabled: true, sticky: true }
  }}
  content={{ allowHTML: true, readMore: true }}
/>
```

### Portfolio Showcases
Display your work chronologically with the horizontal-all mode, showing all projects at once:

```jsx
<Chrono
  items={projects}
  mode="horizontal-all"
  display={{ borderless: true }}
  content={{
    alignment: { horizontal: 'center', vertical: 'center' }
  }}
/>
```

## Migration Guide: Seamless Upgrade

Upgrading to v3.0 is straightforward:

```bash
npm install react-chrono@latest
# or
yarn add react-chrono@latest
# or
pnpm add react-chrono@latest
```

**That's it.** Your existing code works immediately.

If you want to adopt the new grouped API (recommended for new projects), you can migrate incrementally:

```jsx
// Mix old and new syntax
<Chrono
  items={items}
  cardWidth={450}                    // Legacy prop
  layout={{ cardHeight: 'auto' }}    // New grouped prop
  interaction={{ keyboardNavigation: true }}  // New grouped prop
/>
```

The library handles both syntaxes gracefully, so you can modernize at your own pace.

## What Makes React-Chrono Different?

In a world of timeline libraries, React-Chrono stands out:

### 1. Zero Configuration Needed
Drop it in, pass your data, and get a beautiful timeline. No CSS files to import, no theme setup required, no layout calculations needed.

### 2. Accessibility-First
Built with WCAG AA compliance from day one. Full keyboard navigation, proper ARIA labels, screen reader support, and motion preferences respected.

### 3. TypeScript Native
First-class TypeScript support with comprehensive type definitions. IntelliSense works beautifully.

### 4. Thoughtful Defaults
Every default value is chosen for real-world use cases. You only configure what you want to change.

### 5. Minimal Dependencies
The library keeps its dependency tree lean:
- `classnames` — CSS class utilities
- `dayjs` — Date formatting (11kb gzipped)
- `use-debounce` — Performance optimization
- `xss` — Security for HTML content

That's it. No bloated dependencies, no version conflicts.

### 6. Battle-Tested
Used in production by thousands of developers. Extensive test coverage, active maintenance, and responsive issue tracking.

## Looking Ahead

v3.0 is just the beginning. The roadmap includes:

- **Virtualization** for timelines with thousands of items
- **Touch gesture support** for mobile swipe navigation
- **Animation presets** for common use cases
- **Custom point icons** beyond shapes
- **Timeline branching** for complex narratives

## Get Started Today

React-Chrono 3.0 is available now:

```bash
npm install react-chrono
```

**Documentation:** [react-chrono.prabhumurthy.com](https://react-chrono.prabhumurthy.com/)
**GitHub:** [github.com/prabhuignoto/react-chrono](https://github.com/prabhuignoto/react-chrono)
**Live Examples:** [CodeSandbox Collection](https://codesandbox.io/examples/package/react-chrono)

Try the basic example:

```jsx
import { Chrono } from 'react-chrono';

const items = [
  {
    title: 'May 2023',
    cardTitle: 'Project Kickoff',
    cardDetailedText: 'Started development with core team'
  },
  {
    title: 'August 2023',
    cardTitle: 'Beta Release',
    cardDetailedText: 'Launched beta to early adopters'
  },
  {
    title: 'December 2023',
    cardTitle: 'Version 1.0',
    cardDetailedText: 'Official launch with full features'
  }
];

function App() {
  return <Chrono items={items} />;
}
```

That's all you need to get started.

## Final Thoughts

Building React-Chrono has been a journey of continuous improvement, driven by feedback from an amazing community of developers. Version 3.0 represents everything we've learned about making timelines beautiful, performant, and developer-friendly.

Whether you're building a product roadmap, a company history page, an educational platform, or an interactive story, React-Chrono 3.0 gives you the tools to create stunning timeline experiences—without the complexity.

**Try it today, and let us know what you build.** Star the project on GitHub, share your timelines, and join the community shaping the future of React timelines.

---

*Built by [Prabhu Murthy](https://github.com/prabhuignoto) and an amazing community of contributors. Special thanks to everyone who filed issues, submitted PRs, and shared feedback that made v3.0 possible.*

**Love React-Chrono?** Give us a ⭐ on [GitHub](https://github.com/prabhuignoto/react-chrono) to support the project!
