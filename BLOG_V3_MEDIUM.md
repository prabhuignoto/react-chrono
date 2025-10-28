# React Chrono v3.0: The Timeline Component Evolution You've Been Waiting For

After months of development and a complete architectural redesign, **React Chrono v3.0** is here—and it's a game-changer. We've transformed one of the most flexible timeline libraries into a powerhouse of performance, developer experience, and global-ready features.

Whether you're building a product roadmap, company history, project timeline, or any chronological narrative, v3.0 makes it faster, smarter, and more beautiful.

---

## What Changed (And Why You'll Love It)

### ⚡ Zero-Runtime CSS with Vanilla Extract

Gone are the days of runtime style generation. We migrated from styled-components to **Vanilla Extract**—a build-time CSS-in-TypeScript approach that eliminates runtime overhead entirely.

**The impact:**
- 📦 Smaller bundle size (no CSS-in-JS engine needed)
- 🚀 Faster initial renders
- 💪 Type-safe styling with full TypeScript support
- 🐛 Fewer runtime bugs

Your timeline components now load in milliseconds, not seconds.

```typescript
// Modern approach: Build-time generated CSS
import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/tokens';

export const card = style({
  background: tokens.color.cardBackground,
  borderRadius: tokens.radius.medium,
  padding: tokens.space[4],
});
```

### 🎭 One Context to Rule Them All

We replaced nested context providers with a **single, unified context architecture** that significantly reduces unnecessary re-renders. Components now subscribe selectively to only the data they need, resulting in measurably better performance across the board.

---

## The New Feature Suite

### 🌐 Comprehensive Internationalization (i18n)

Reach global audiences with full localization support for **60+ text elements** across 11 categories. Every user-facing string—from button labels to accessibility text to keyboard help—is now configurable.

**Supported categories:**
Navigation controls, search functionality, theme toggles, layout modes, fullscreen controls, accessibility labels, status messages, and more.

```tsx
<Chrono
  items={items}
  i18n={{
    texts: {
      navigation: {
        first: 'Ir al primer elemento',
        next: 'Siguiente elemento',
        play: 'Iniciar presentación'
      },
      search: {
        placeholder: 'Buscar en la línea de tiempo'
      }
    },
    locale: 'es'
  }}
/>
```

Built-in template interpolation makes it easy: `"{current} of {total}"` automatically becomes `"3 of 15"` at runtime.

### 🎭 Google Fonts with Per-Element Control

Load Google Fonts dynamically and customize weights, styles, and sizes for **every text element** in your timeline. Set a bold serif for titles and a light sans-serif for content—all from a single font family.

### 🖼️ Immersive Fullscreen Mode

Experience timelines in stunning fullscreen with **automatic cross-browser support** (Chrome, Firefox, Safari, Edge). No browser-specific hacks needed—we handle all the vendor prefixes for you.

```typescript
import { useFullscreen } from '@hooks/useFullscreen';

const { isFullscreen, enterFullscreen, exitFullscreen } = useFullscreen(containerRef);
```

### 🎯 Grouped Configuration API

Props are now organized into **9 logical groups** for better discoverability. The old flat API still works (backward compatible!), but the new grouped approach is a joy to use:

```tsx
<Chrono
  items={items}
  layout={{ pointSize: 18, cardWidth: 400 }}
  interaction={{ keyboardNavigation: true, autoScroll: true }}
  display={{ borderless: true, toolbar: { enabled: true, sticky: true } }}
  animation={{ slideshow: { enabled: true, duration: 3000 } }}
  i18n={{ locale: 'en' }}
/>
```

**Groups include:** layout, interaction, content, display, media, animation, style, accessibility, and i18n.

### 📌 Sticky Toolbar

Pin controls to the top or bottom of your viewport. Users can navigate, toggle dark mode, search, and switch layouts without scrolling back to the top.

### 🔍 Advanced Search

Real-time search with match highlighting, navigation between results, and a built-in counter. Fully customizable dimensions and placeholder text.

### 🎪 Enhanced Dark Mode

36 comprehensive theme properties give you pixel-perfect control. The 13 new dark mode-specific properties let you fine-tune every detail—from button hover states to glow effects.

---

## Performance Metrics That Matter

- **Bundle size:** Reduced by Vanilla Extract migration
- **Time to interactive:** Faster initial renders with zero runtime CSS overhead
- **Re-renders:** Minimized with selective context subscriptions
- **Font loading:** Intelligent weight deduplication and preconnect optimization

These aren't just numbers—they translate to real user experience improvements, especially on slower networks and devices.

---

## Testing You Can Trust

We migrated from Cypress to **Playwright** for E2E testing, bringing:
- ✅ Faster parallel execution
- ✅ Better cross-browser support (Chrome, Firefox, Safari, Edge)
- ✅ Modern debugging with Inspector and trace viewer
- ✅ Component testing in isolation
- ✅ Network mocking and offline scenarios

Comprehensive test coverage ensures reliability across all timeline modes, interactions, and edge cases.

---

## The Upgrade Story

**Here's the good news:** v3.0 is fully backward compatible. Your existing code works immediately without changes.

But we recommend migrating to the grouped API for cleaner, more maintainable code:

```tsx
// Before (v2.x)
<Chrono
  items={items}
  borderLessCards={true}
  disableNavOnKey={false}
  timelinePointDimension={18}
  mediaHeight={400}
  slideShow={true}
  slideItemDuration={3000}
/>

// After (v3.0 - cleaner!)
<Chrono
  items={items}
  display={{ borderless: true }}
  interaction={{ keyboardNavigation: true }}
  layout={{ pointSize: 18 }}
  media={{ height: 400 }}
  animation={{ slideshow: { enabled: true, duration: 3000 } }}
/>
```

---

## Getting Started in 60 Seconds

```bash
npm install react-chrono@latest
```

```tsx
import { Chrono } from 'react-chrono';

const items = [
  {
    title: 'January 2024',
    cardTitle: 'Project Kickoff',
    cardDetailedText: 'Started the new initiative'
  },
  {
    title: 'February 2024',
    cardTitle: 'First Milestone',
    cardDetailedText: 'Completed initial design'
  }
];

export default function App() {
  return (
    <Chrono
      items={items}
      mode="vertical"
      theme={{ primary: '#3b82f6' }}
      darkMode={{ enabled: true, showToggle: true }}
    />
  );
}
```

---

## What's Next?

We're just getting started. The roadmap includes:
- 🌍 Pre-built i18n locale packages
- 📱 Enhanced mobile gestures
- 🎨 More timeline point shapes
- 📊 Advanced visualization modes
- 🔌 Plugin system for extensibility

---

## Join the Community

React Chrono v3.0 is the result of months of development, community feedback, and dedication to excellence. We can't wait to see what you build.

- **Star on GitHub** ⭐ — [react-chrono](https://github.com/prabhuignoto/react-chrono)
- **Ask questions** — [GitHub Discussions](https://github.com/prabhuignoto/react-chrono/discussions)
- **Report bugs** — [GitHub Issues](https://github.com/prabhuignoto/react-chrono/issues)
- **Share your projects** — Tag us with #ReactChrono

**Ready to upgrade?**

```bash
npm install react-chrono@latest
```

Your next timeline masterpiece awaits. 🎉
