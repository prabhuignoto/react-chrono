# React Chrono v3.0 - Quick Reference Guide

## Basic Usage

```typescript
import { Chrono } from 'react-chrono';

const items = [
  { date: '2020-01-01', cardTitle: 'Event 1', cardDetailedText: 'Description' },
  { date: '2020-02-01', cardTitle: 'Event 2', cardDetailedText: 'Description' }
];

<Chrono items={items} />
```

## Configuration by Use Case

### 1. Simple Timeline (Minimal)
```typescript
<Chrono items={items} />
```

### 2. Dark Theme Timeline
```typescript
<Chrono
  items={items}
  theme={{
    timelineBgColor: '#000000',
    cardBgColor: '#1f2937',
    textColor: '#ffffff'
  }}
  darkMode={{ enabled: true, showToggle: true }}
/>
```

### 3. Interactive Presentation
```typescript
<Chrono
  items={items}
  mode="horizontal"
  interaction={{
    keyboardNavigation: true,
    pointClick: true,
    cardHover: true
  }}
  animation={{
    slideshow: { enabled: true, duration: 3000, type: 'fade' }
  }}
/>
```

### 4. Accessible Timeline
```typescript
<Chrono
  items={items}
  interaction={{ focusOnLoad: true }}
  accessibility={{
    buttonTexts: { first: 'Go to Beginning', next: 'Next Event' }
  }}
  content={{
    semanticTags: { title: 'h2', subtitle: 'h3' }
  }}
/>
```

### 5. Timeline with Search
```typescript
<Chrono
  items={items}
  display={{
    toolbar: {
      enabled: true,
      position: 'top',
      search: { width: '300px' }
    }
  }}
/>
```

### 6. Responsive Timeline
```typescript
<Chrono
  items={items}
  layout={{
    responsive: { enabled: true, breakpoint: 768 }
  }}
/>
```

## Props by Category

### Layout
- `layout.cardWidth` - Card max width (px)
- `layout.cardHeight` - Card min height (px)
- `layout.pointSize` - Timeline point size (px)
- `layout.lineWidth` - Timeline line width (px)
- `layout.timelineHeight` - Container height

### Interaction
- `interaction.keyboardNavigation` - Arrow key navigation (default: true)
- `interaction.pointClick` - Click on points (default: true)
- `interaction.autoScroll` - Auto-scroll (default: true)
- `interaction.focusOnLoad` - Focus first item on load
- `interaction.cardHover` - Highlight on hover
- `interaction.disabled` - Disable all interactions

### Content
- `content.allowHTML` - Parse HTML in text
- `content.readMore` - Show read more button
- `content.dateFormat` - Date format (default: 'MMM DD, YYYY')
- `content.compactText` - Compact display
- `content.semanticTags` - Use H1-H6 tags

### Display
- `display.borderless` - Remove card borders
- `display.pointShape` - 'circle' | 'square' | 'diamond'
- `display.toolbar.enabled` - Show toolbar (default: true)
- `display.toolbar.position` - 'top' | 'bottom'
- `display.scrollable` - Enable scrolling

### Media
- `media.height` - Min height of media (px)
- `media.align` - 'left' | 'center' | 'right'
- `media.fit` - 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'

### Animation
- `animation.slideshow.enabled` - Enable slideshow
- `animation.slideshow.duration` - Duration per slide (ms)
- `animation.slideshow.type` - 'reveal' | 'slide' | 'fade'
- `animation.slideshow.showProgress` - Show progress bar

### Style
- `style.classNames` - Custom CSS classes
- `style.fontSizes` - Custom font sizes
- `style.googleFonts` - Google Fonts configuration

### Accessibility
- `accessibility.buttonTexts` - Custom button labels
- `accessibility.search` - Search labels

### Dark Mode
- `darkMode.enabled` - Enable dark mode
- `darkMode.showToggle` - Show toggle button

## Timeline Modes

| Mode | Best For |
|------|----------|
| `horizontal` | Presentations, few items |
| `vertical` | Single-side display |
| `alternating` | Traditional timeline (default) |
| `horizontal-all` | All items visible overview |

## Media Configuration

### IMAGE
```typescript
{
  media: {
    type: 'IMAGE',
    source: { url: 'https://example.com/image.jpg' },
    name: 'Photo'
  }
}
```

### VIDEO
```typescript
{
  media: {
    type: 'VIDEO',
    source: { url: 'https://example.com/video.mp4' }
  }
}
```

## Internationalization (i18n)

### Customize Button Texts
```typescript
i18n={{
  texts: {
    navigation: {
      first: 'Beginning',
      last: 'End',
      next: 'Forward',
      previous: 'Back'
    }
  }
}}
```

### Customize Search Labels
```typescript
i18n={{
  texts: {
    search: {
      placeholder: 'Find events...',
      clearLabel: 'Clear'
    }
  }
}}
```

## Theme Colors

### Light Theme
```typescript
theme={{
  cardBgColor: '#ffffff',
  textColor: '#000000',
  titleColor: '#333333',
  primary: '#007bff'
}}
```

### Dark Theme
```typescript
theme={{
  timelineBgColor: '#000000',
  cardBgColor: '#1f2937',
  textColor: '#ffffff',
  primary: '#3b82f6'
}}
```

## Event Callbacks

```typescript
<Chrono
  items={items}
  onItemSelected={(data) => console.log('Selected:', data.index)}
  onScrollEnd={() => console.log('Reached end')}
  onThemeChange={(theme) => console.log('Theme changed')}
  onRestartSlideshow={() => console.log('Slideshow restarted')}
/>
```

## Timeline Item Structure

```typescript
interface TimelineItemModel {
  date: string | number | Date;           // Required
  cardTitle?: string | ReactNode;          // Card title
  cardSubtitle?: string | ReactNode;       // Card subtitle
  cardDetailedText?: string | ReactNode;   // Card body
  media?: Media;                           // Image or video
  title?: string | ReactNode;              // Timeline title (defaults to formatted date)
  items?: TimelineItemModel[];             // Nested items
}
```

## Common Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Arrow Left | Previous item |
| Arrow Right | Next item |
| Home | First item |
| End | Last item |
| Enter | Select item |
| Escape | Exit fullscreen / Stop slideshow |
| Tab | Navigate controls |

## Accessibility Features

- WCAG AA compliant (4.5:1 contrast ratio)
- Full keyboard navigation
- ARIA labels on all interactive elements
- Semantic HTML support
- Focus management
- Screen reader friendly
- Respects prefers-reduced-motion

## Hooks Available for Custom Implementations

```typescript
import {
  useTimelineNavigation,
  useTimelineKeyboardNavigation,
  useTimelineSearch,
  useFullscreen,
  useFocusManager,
  useMeasureHeight,
  useMediaState
} from 'react-chrono';
```

## Migration from v2.x

Old API (still works):
```typescript
<Chrono items={items} timelinePointDimension={20} borderLessCards={true} />
```

New API (recommended):
```typescript
<Chrono
  items={items}
  layout={{ pointSize: 20 }}
  display={{ borderless: true }}
/>
```

## Build & Bundle Info

- **Output Size**: < 250 KB (ESM & CJS)
- **CSS Output**: dist/style.css
- **Type Definitions**: dist/types/index.d.ts
- **Peer Dependencies**: React ^18.2.0 || ^19.0.0

## Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm run test:e2e

# With UI
pnpm run test:e2e:ui

# Specific browser
pnpm run test:e2e:chrome
pnpm run test:e2e:firefox
```

## Development

```bash
# Start dev server
pnpm run dev

# Build production
pnpm run build

# Build with analysis
pnpm run build:analyze

# Lint & format
pnpm run lint:all
pnpm run format
```

## Complete API Reference

For comprehensive API documentation including all 40+ i18n keys, 35+ theme properties, and complete prop definitions, see: **REACT_CHRONO_API_CATALOG.md**
