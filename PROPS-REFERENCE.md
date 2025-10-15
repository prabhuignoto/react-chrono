# React Chrono - Complete Props Reference

<div align="center">
  
**📋 Comprehensive documentation of all supported properties**

*This document covers every prop, configuration option, and interface in React Chrono*

</div>

---

## 📑 Table of Contents

- [🎯 Core Props](#-core-props)
- [📐 Layout Configuration](#-layout-configuration)
- [🎮 Interaction Configuration](#-interaction-configuration) 
- [📝 Content Configuration](#-content-configuration)
- [🎨 Display Configuration](#-display-configuration)
- [🎥 Media Configuration](#-media-configuration)
- [🎬 Animation Configuration](#-animation-configuration)
- [✨ Style Configuration](#-style-configuration)
- [♿ Accessibility Configuration](#-accessibility-configuration)
- [🌍 Internationalization Configuration](#-internationalization-configuration)
- [🎨 Theme Properties](#-theme-properties)
- [📊 Timeline Item Model](#-timeline-item-model)
- [🔄 Legacy Props (Deprecated)](#-legacy-props-deprecated)
- [📱 Event Callbacks](#-event-callbacks)
- [🔍 Type Definitions](#-type-definitions)

---

## 🎯 Core Props

These are the essential properties that define the basic behavior of your timeline.

| Property | Type | Default | Required | Description |
|----------|------|---------|----------|-------------|
| `items` | `TimelineItem[]` | `[]` | ✅ | Array of timeline items to display |
| `mode` | `TimelineMode` | `'alternating'` | ❌ | Timeline display mode |
| `children` | `ReactNode \| ReactNode[]` | - | ❌ | Custom React content for timeline cards |
| `theme` | `Theme` | `{}` | ❌ | Visual theme configuration |
| `activeItemIndex` | `number` | `0` | ❌ | Index of initially active timeline item |
| `allowDynamicUpdate` | `boolean` | `false` | ❌ | Enable dynamic updates to timeline items |
| `id` | `string` | - | ❌ | Custom unique identifier for the timeline |
| `i18n` | `I18nConfig` | - | ❌ | Internationalization configuration for multi-language support |
| `darkMode` | `DarkModeConfig` | - | ❌ | Dark mode configuration and toggle options |

### Timeline Mode Values

```typescript
type TimelineMode = 
  | 'horizontal'      // Classic left-to-right layout
  | 'vertical'        // Top-to-bottom layout  
  | 'alternating'     // Cards alternate sides (default)
  | 'horizontal-all'  // Show all cards simultaneously
```

---

## 📐 Layout Configuration

Control the size, positioning, and responsive behavior of your timeline.

### Layout Config Object

```typescript
layout?: {
  cardWidth?: number;
  cardHeight?: number;
  pointSize?: number;
  lineWidth?: number;
  itemWidth?: number;
  timelineHeight?: number | string;
  responsive?: {
    breakpoint?: number;
    enabled?: boolean;
  };
  positioning?: {
    cardPosition?: 'top' | 'bottom';
    flipLayout?: boolean;
  };
}
```

### Layout Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cardWidth` | `number` | `450` | Maximum width of timeline cards in pixels |
| `cardHeight` | `number` | `200` | Minimum height of timeline cards in pixels |
| `pointSize` | `number` | `16` | Size of timeline points/circles in pixels |
| `lineWidth` | `number` | `3` | Width of the timeline track line in pixels |
| `itemWidth` | `number` | `200` | Width of each timeline section in horizontal mode (px) |
| `timelineHeight` | `number \| string` | - | Fixed height for the timeline container |

### Responsive Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `responsive.breakpoint` | `number` | `768` | Viewport width breakpoint for mode switching (px) |
| `responsive.enabled` | `boolean` | `true` | Enable automatic responsive mode switching |

### Positioning Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `positioning.cardPosition` | `'top' \| 'bottom'` | - | Card position in horizontal mode |
| `positioning.flipLayout` | `boolean` | `false` | Flip layout direction for RTL support |

---

## 🎮 Interaction Configuration

Configure user interactions and navigation behavior.

### Interaction Config Object

```typescript
interaction?: {
  keyboardNavigation?: boolean;
  pointClick?: boolean;
  autoScroll?: boolean;
  focusOnLoad?: boolean;
  cardHover?: boolean;
  disabled?: boolean;
}
```

### Interaction Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `keyboardNavigation` | `boolean` | `true` | Enable arrow key navigation |
| `pointClick` | `boolean` | `true` | Enable clicking on timeline points |
| `autoScroll` | `boolean` | `true` | Auto-scroll to active items when selected |
| `focusOnLoad` | `boolean` | `false` | Focus active item when timeline loads |
| `cardHover` | `boolean` | `false` | Highlight cards on mouse hover |
| `disabled` | `boolean` | `false` | Disable all user interactions |

### Keyboard Navigation Keys

| Keys | Mode | Action |
|------|------|--------|
| `←` `→` | Horizontal | Navigate between items |
| `↑` `↓` | Vertical/Alternating | Navigate between items |
| `Home` | All | Jump to first item |
| `End` | All | Jump to last item |
| `Enter` | All | Select focused item |
| `Escape` | All | Exit fullscreen/pause slideshow |

---

## 📝 Content Configuration

Handle text content, HTML parsing, and semantic structure.

### Content Config Object

```typescript
content?: {
  allowHTML?: boolean;
  readMore?: boolean;
  textOverlay?: boolean;
  dateFormat?: string;
  compactText?: boolean;
  semanticTags?: {
    title?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
    subtitle?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  };
}
```

### Content Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowHTML` | `boolean` | `false` | Allow HTML parsing in card content |
| `readMore` | `boolean` | `true` | Enable "read more" button for long content |
| `textOverlay` | `boolean` | `false` | Display text as overlay on media |
| `dateFormat` | `string` | `'MMM DD, YYYY'` | Date format for timeline titles (Day.js format) |
| `compactText` | `boolean` | `false` | Use compact text display mode |

### Semantic Tags Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `semanticTags.title` | `HTMLTag` | `'h3'` | HTML tag for timeline item titles |
| `semanticTags.subtitle` | `HTMLTag` | `'h4'` | HTML tag for timeline card subtitles |

#### Supported HTML Tags
`'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'`

---

## 🎨 Display Configuration

Control visual appearance, UI elements, and layout options.

### Display Config Object

```typescript
display?: {
  borderless?: boolean;
  cardsDisabled?: boolean;
  pointsDisabled?: boolean;
  pointShape?: 'circle' | 'square' | 'diamond';
  allCardsVisible?: boolean;
  toolbar?: {
    enabled?: boolean;
    position?: 'top' | 'bottom';
    sticky?: boolean;
    search?: {
      width?: string;
      maxWidth?: string;
      minWidth?: string;
      inputWidth?: string;
      inputMaxWidth?: string;
    };
  };
  scrollable?: boolean | {
    scrollbar: boolean;
  };
}
```

### Display Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `borderless` | `boolean` | `false` | Remove borders and shadows from cards |
| `cardsDisabled` | `boolean` | `false` | Hide timeline cards completely |
| `pointsDisabled` | `boolean` | `false` | Hide timeline points |
| `pointShape` | `'circle' \| 'square' \| 'diamond'` | `'circle'` | Shape of timeline points |
| `allCardsVisible` | `boolean` | `false` | Show all cards simultaneously in horizontal mode |

### Toolbar Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `toolbar.enabled` | `boolean` | `true` | Show/hide the toolbar |
| `toolbar.position` | `'top' \| 'bottom'` | `'top'` | Position of the toolbar |
| `toolbar.sticky` | `boolean` | `false` | Make toolbar sticky during scroll |
| `toolbar.search.width` | `string` | - | Default width of search section (CSS length) |
| `toolbar.search.maxWidth` | `string` | - | Maximum width of search section (CSS length) |
| `toolbar.search.minWidth` | `string` | - | Minimum width of search section (CSS length) |
| `toolbar.search.inputWidth` | `string` | - | Width of actual input field (CSS length) |
| `toolbar.search.inputMaxWidth` | `string` | - | Maximum width of actual input field (CSS length) |

### Scrollable Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scrollable` | `boolean \| {scrollbar: boolean}` | `{scrollbar: false}` | Enable scrolling for vertical modes |

---

## 🎥 Media Configuration

Configure images, videos, and media handling.

### Media Config Object

```typescript
media?: {
  height?: number;
  align?: 'left' | 'center' | 'right';
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}
```

### Media Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `height` | `number` | `200` | Minimum height of media elements in pixels |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Media alignment within cards |
| `fit` | `MediaFit` | `'cover'` | CSS object-fit property for images |

### Media Fit Values

```typescript
type MediaFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
```

---

## 🎬 Animation Configuration

Control slideshow functionality and transition effects.

### Animation Config Object

```typescript
animation?: {
  slideshow?: {
    enabled?: boolean;
    duration?: number;
    type?: 'reveal' | 'slide' | 'fade';
    autoStart?: boolean;
    showProgress?: boolean;
    showOverallProgress?: boolean;
  };
}
```

### Slideshow Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slideshow.enabled` | `boolean` | `false` | Enable slideshow functionality |
| `slideshow.duration` | `number` | `2000` | Duration each slide is displayed (milliseconds) |
| `slideshow.type` | `SlideshowType` | `'fade'` | Type of transition animation |
| `slideshow.autoStart` | `boolean` | `false` | Auto-start slideshow on load |
| `slideshow.showProgress` | `boolean` | `false` | Show progress indicator on cards |
| `slideshow.showOverallProgress` | `boolean` | `true` | Show overall progress bar |

### Slideshow Animation Types

```typescript
type SlideshowType = 
  | 'reveal'        // Cards reveal progressively
  | 'slide'         // Cards slide in from sides
  | 'fade'          // Cards fade in/out
```

---

## ✨ Style Configuration

Customize CSS classes, fonts, and Google Fonts integration.

### Style Config Object

```typescript
style?: {
  classNames?: {
    card?: string;
    cardMedia?: string;
    cardSubTitle?: string;
    cardText?: string;
    cardTitle?: string;
    controls?: string;
    title?: string;
    timelinePoint?: string;
    timelineTrack?: string;
  };
  fontSizes?: {
    cardSubtitle?: string;
    cardText?: string;
    cardTitle?: string;
    title?: string;
  };
  googleFonts?: GoogleFontsConfig;
}
```

### CSS Class Names

| Property | Description | Target Element |
|----------|-------------|----------------|
| `classNames.card` | Timeline card container | Card wrapper |
| `classNames.cardMedia` | Media within cards | Images/videos |
| `classNames.cardSubTitle` | Card subtitle text | Subtitle element |
| `classNames.cardText` | Card body text | Main content |
| `classNames.cardTitle` | Card title text | Title element |
| `classNames.controls` | Toolbar controls | Control buttons |
| `classNames.title` | Timeline item titles | Point labels |
| `classNames.timelinePoint` | Timeline points | Circle/square points |
| `classNames.timelineTrack` | Timeline line | Main timeline line |

### Font Size Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fontSizes.title` | `string` | - | Font size for timeline item titles |
| `fontSizes.cardTitle` | `string` | - | Font size for card titles |
| `fontSizes.cardSubtitle` | `string` | - | Font size for card subtitles |
| `fontSizes.cardText` | `string` | - | Font size for card body text |

### Google Fonts Configuration

```typescript
googleFonts?: {
  fontFamily: string;
  elements?: {
    title?: FontElement;
    cardTitle?: FontElement;
    cardSubtitle?: FontElement;
    cardText?: FontElement;
    controls?: FontElement;
  };
  weights?: FontWeight[];
  display?: 'auto' | 'block' | 'swap' | 'fallback' | 'optional';
  preconnect?: boolean;
}
```

### Font Element Configuration

```typescript
interface FontElement {
  weight?: FontWeight;
  style?: 'normal' | 'italic';
  size?: string;
}

type FontWeight = 
  | 'thin' | 'extra-light' | 'light' | 'regular' | 'medium' 
  | 'semi-bold' | 'bold' | 'extra-bold' | 'black'
  | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
```

### Google Fonts Properties Table

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `fontFamily` | `string` | - | Google Fonts family name |
| `elements` | `FontElements` | - | Font configuration for different elements |
| `weights` | `FontWeight[]` | - | Additional font weights to load |
| `display` | `FontDisplay` | `'swap'` | Font display strategy |
| `preconnect` | `boolean` | `true` | Preconnect to Google Fonts for faster loading |

---

## ♿ Accessibility Configuration

Customize labels, ARIA attributes, and screen reader support.

### Accessibility Config Object

```typescript
accessibility?: {
  buttonTexts?: {
    first?: string;
    last?: string;
    next?: string;
    previous?: string;
    play?: string;
    stop?: string;
  };
  search?: {
    placeholder?: string;
    ariaLabel?: string;
    clearLabel?: string;
  };
}
```

### Button Text Labels

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `buttonTexts.first` | `string` | `'Go to first item'` | First button label |
| `buttonTexts.last` | `string` | `'Go to last item'` | Last button label |
| `buttonTexts.next` | `string` | `'Next item'` | Next button label |
| `buttonTexts.previous` | `string` | `'Previous item'` | Previous button label |
| `buttonTexts.play` | `string` | `'Start slideshow'` | Play button label |
| `buttonTexts.stop` | `string` | `'Stop slideshow'` | Stop button label |

### Search Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `search.placeholder` | `string` | `'Search...'` | Search input placeholder |
| `search.ariaLabel` | `string` | `'Search timeline'` | ARIA label for search input |
| `search.clearLabel` | `string` | `'Clear search'` | Clear search button label |

---

## 🌍 Internationalization Configuration

Complete internationalization support for all user-facing text in the timeline component.

### i18n Config Object

```typescript
i18n?: {
  texts?: TimelineI18nConfig;
  locale?: string;
  direction?: 'ltr' | 'rtl';
}
```

### Comprehensive Text Configuration

The `texts` configuration provides internationalization support for all timeline text elements:

```typescript
i18n: {
  texts: {
    navigation: {
      first: 'Go to first item',
      last: 'Go to last item',
      next: 'Next item',
      previous: 'Previous item',
      play: 'Start slideshow',
      stop: 'Stop slideshow',
    },
    search: {
      placeholder: 'Search Timeline',
      ariaLabel: 'Search timeline content',
      clearLabel: 'Clear Search',
      nextMatch: 'Next Match (Enter)',
      previousMatch: 'Previous Match (Shift+Enter)',
      resultsCount: '{current} of {total}',
      noResults: 'No results found',
    },
    theme: {
      darkMode: 'Switch to dark mode',
      lightMode: 'Switch to light mode',
      toggleTheme: 'Toggle theme',
    },
    fullscreen: {
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      notSupported: 'Fullscreen not supported',
    },
    content: {
      readMore: 'Read More',
      showLess: 'Show Less',
      expand: 'Expand',
      collapse: 'Collapse',
    },
    // ... additional text categories
  }
}
```

### Text Categories

| Category | Description | Covers |
|----------|-------------|--------|
| `navigation` | Navigation control labels | First, last, next, previous, play/stop buttons |
| `search` | Search functionality text | Search input, results, navigation |
| `theme` | Theme switching labels | Dark/light mode toggles |
| `layout` | Layout mode labels | Vertical, horizontal, alternating modes |
| `fullscreen` | Fullscreen functionality | Enter/exit fullscreen, error messages |
| `quickJump` | Quick navigation | Jump to item dropdown |
| `content` | Content interaction | Read more, expand/collapse |
| `status` | Loading and error states | Loading, error, empty states |
| `accessibility` | Screen reader labels | ARIA labels and descriptions |
| `view` | View options | Compact/detailed view toggles |
| `keyboard` | Keyboard help | Keyboard navigation instructions |

### Template String Support

Some text properties support template variables using `{variable}` syntax:

```typescript
search: {
  resultsCount: '{current} of {total}',  // "1 of 5"
},
accessibility: {
  itemPosition: 'Item {current} of {total}',  // "Item 3 of 10"
},
quickJump: {
  itemTemplate: '{index}: {title}',  // "1: My Title"
}
```

### Multi-language Example

```typescript
// English (default)
const englishTexts = {
  navigation: {
    first: 'Go to first item',
    last: 'Go to last item',
    next: 'Next item',
    previous: 'Previous item',
  },
  search: {
    placeholder: 'Search Timeline',
    clearLabel: 'Clear Search',
  }
};

// Spanish
const spanishTexts = {
  navigation: {
    first: 'Ir al primer elemento',
    last: 'Ir al último elemento', 
    next: 'Siguiente elemento',
    previous: 'Elemento anterior',
  },
  search: {
    placeholder: 'Buscar en la Línea de Tiempo',
    clearLabel: 'Limpiar Búsqueda',
  }
};

<Chrono
  items={items}
  i18n={{ texts: spanishTexts, locale: 'es' }}
/>
```

### Legacy Compatibility

The new i18n system is fully compatible with existing `accessibility.buttonTexts` configuration. When both are provided, i18n texts take precedence for supported properties.

```typescript
// Legacy (still works)
<Chrono
  accessibility={{
    buttonTexts: {
      first: 'First',
      next: 'Next',
    }
  }}
/>

// New i18n (recommended)
<Chrono
  i18n={{
    texts: {
      navigation: {
        first: 'First',
        next: 'Next',
      }
    }
  }}
/>
```

---

## 🎨 Theme Properties

Comprehensive theming system with 25+ customizable properties.

### Theme Interface

```typescript
interface Theme {
  // Base Colors
  primary?: string;
  secondary?: string;
  textColor?: string;
  
  // Card Colors
  cardBgColor?: string;
  cardDetailsBackGround?: string;
  cardDetailsColor?: string;
  cardMediaBgColor?: string;
  cardSubtitleColor?: string;
  cardTitleColor?: string;
  detailsColor?: string;
  
  // Timeline Colors
  titleColor?: string;
  titleColorActive?: string;
  timelineBgColor?: string;
  iconBackgroundColor?: string;
  
  // Toolbar Colors
  toolbarBgColor?: string;
  toolbarBtnBgColor?: string;
  toolbarTextColor?: string;
  
  // Nested Timeline Colors
  nestedCardBgColor?: string;
  nestedCardDetailsBackGround?: string;
  nestedCardDetailsColor?: string;
  nestedCardSubtitleColor?: string;
  nestedCardTitleColor?: string;
  
  // Enhanced Dark Mode Properties
  iconColor?: string;
  buttonHoverBgColor?: string;
  buttonActiveBgColor?: string;
  buttonActiveIconColor?: string;
  buttonBorderColor?: string;
  buttonHoverBorderColor?: string;
  buttonActiveBorderColor?: string;
  shadowColor?: string;
  glowColor?: string;
  searchHighlightColor?: string;
  
  // Dark Toggle Specific
  darkToggleActiveBgColor?: string;
  darkToggleActiveIconColor?: string;
  darkToggleActiveBorderColor?: string;
  darkToggleGlowColor?: string;
}
```

### Theme Properties by Category

#### Base Theme Colors

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `primary` | `string` | Primary accent color | `'#0070f3'` |
| `secondary` | `string` | Secondary accent color | `'#666666'` |
| `textColor` | `string` | Default text color | `'#333333'` |

#### Card Theme Colors

| Property | Type | Description |
|----------|------|-------------|
| `cardBgColor` | `string` | Background color for timeline cards |
| `cardDetailsBackGround` | `string` | Background color for card details section |
| `cardDetailsColor` | `string` | Text color for card details |
| `cardMediaBgColor` | `string` | Background color for media section |
| `cardSubtitleColor` | `string` | Color for card subtitles |
| `cardTitleColor` | `string` | Color for card titles |
| `detailsColor` | `string` | Color for detailed content text |

#### Timeline Theme Colors

| Property | Type | Description |
|----------|------|-------------|
| `titleColor` | `string` | Color for timeline item titles |
| `titleColorActive` | `string` | Color for active timeline titles |
| `timelineBgColor` | `string` | Background color for the timeline |
| `iconBackgroundColor` | `string` | Background color for timeline icons |

#### Toolbar Theme Colors

| Property | Type | Description |
|----------|------|-------------|
| `toolbarBgColor` | `string` | Background color for the toolbar |
| `toolbarBtnBgColor` | `string` | Background color for toolbar buttons |
| `toolbarTextColor` | `string` | Text color for toolbar elements |

#### Enhanced Dark Mode Colors

| Property | Type | Description |
|----------|------|-------------|
| `iconColor` | `string` | Color for icons in dark mode |
| `buttonHoverBgColor` | `string` | Button background on hover |
| `buttonActiveBgColor` | `string` | Button background when active |
| `buttonActiveIconColor` | `string` | Icon color for active buttons |
| `buttonBorderColor` | `string` | Border color for buttons |
| `buttonHoverBorderColor` | `string` | Border color for buttons on hover |
| `buttonActiveBorderColor` | `string` | Border color for active buttons |
| `shadowColor` | `string` | Color for shadows and depth effects |
| `glowColor` | `string` | Color for glow effects and focus states |
| `searchHighlightColor` | `string` | Color for search result highlighting |

#### Dark Mode Toggle Colors

| Property | Type | Description |
|----------|------|-------------|
| `darkToggleActiveBgColor` | `string` | Background when dark mode toggle is active |
| `darkToggleActiveIconColor` | `string` | Icon color when dark mode toggle is active |
| `darkToggleActiveBorderColor` | `string` | Border color when dark mode toggle is active |
| `darkToggleGlowColor` | `string` | Glow effect color for dark mode toggle |

---

## 📊 Timeline Item Model

Complete structure for timeline items with support for rich content and nested timelines.

### TimelineItem Interface

```typescript
interface TimelineItem {
  // Core Properties
  title?: string | ReactNode;
  cardTitle?: string | ReactNode;
  cardSubtitle?: string | ReactNode;
  cardDetailedText?: string | string[] | ReactNode | ReactNode[];
  
  // Media Content
  media?: Media;
  
  // Navigation & Links
  url?: string;
  date?: Date | string | number;
  
  // Custom Content
  timelineContent?: ReactNode;
  content?: ReactNode | ReactNode[];
  
  // Nested Timelines
  items?: TimelineItem[];
  hasNestedItems?: boolean;
  isNested?: boolean;
  
  // State & Control
  active?: boolean;
  visible?: boolean;
  id?: string;
  position?: string;
  
  // Internal Properties
  _dayjs?: Dayjs;
}
```

### Timeline Item Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string \| ReactNode` | ❌ | Title displayed on timeline point |
| `cardTitle` | `string \| ReactNode` | ❌ | Main title displayed on card |
| `cardSubtitle` | `string \| ReactNode` | ❌ | Subtitle displayed on card |
| `cardDetailedText` | `string \| string[] \| ReactNode \| ReactNode[]` | ❌ | Main content of the card |
| `media` | `Media` | ❌ | Image or video content |
| `url` | `string` | ❌ | URL for the title link |
| `date` | `Date \| string \| number` | ❌ | Date for the timeline item |
| `timelineContent` | `ReactNode` | ❌ | Custom React content for the card |
| `content` | `ReactNode \| ReactNode[]` | ❌ | Alternative custom content |
| `items` | `TimelineItem[]` | ❌ | Nested timeline items |
| `active` | `boolean` | ❌ | Whether item is initially active |
| `visible` | `boolean` | ❌ | Whether item is visible |
| `id` | `string` | ❌ | Unique identifier |

### Media Interface

```typescript
interface Media {
  type: 'IMAGE' | 'VIDEO';
  source: {
    url: string;
    type?: string;  // MIME type or file extension
  };
  name?: string;    // Alt text / description
}
```

### Media Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `'IMAGE' \| 'VIDEO'` | ✅ | Type of media content |
| `source.url` | `string` | ✅ | URL of the media file |
| `source.type` | `string` | ❌ | MIME type or file extension |
| `name` | `string` | ❌ | Alt text for images or description |

### Media Examples

**Image Example:**
```javascript
{
  title: "Historic Moment",
  cardTitle: "The Discovery",
  media: {
    type: "IMAGE",
    source: { url: "https://example.com/image.jpg" },
    name: "Archaeological site discovery"
  }
}
```

**Video Example:**
```javascript
{
  title: "Launch Event",
  cardTitle: "Mission Success",
  media: {
    type: "VIDEO",
    source: { 
      url: "https://example.com/video.mp4",
      type: "mp4" 
    },
    name: "Rocket launch footage",
    active: true  // Auto-play when active
  }
}
```

**YouTube Video Example:**
```javascript
{
  title: "Tutorial",
  cardTitle: "How to Use",
  media: {
    type: "VIDEO",
    source: { 
      url: "https://www.youtube.com/embed/VIDEO_ID",
      type: "youtube"
    },
    name: "Tutorial video"
  }
}
```

---

## 📱 Event Callbacks

Handle user interactions and timeline state changes.

### Callback Functions

| Callback | Type | Description |
|----------|------|-------------|
| `onItemSelected` | `ItemSelectedCallback` | Fired when a timeline item is selected |
| `onScrollEnd` | `() => void` | Fired when scrolling reaches the end |
| `onThemeChange` | `(theme: Theme) => void` | Fired when theme changes |
| `onRestartSlideshow` | `() => void` | Fired when slideshow restarts |

### ItemSelected Callback

```typescript
type ItemSelectedCallback = (data: {
  item: Pick<TimelineItem, 'title' | 'cardDetailedText' | 'cardSubtitle' | 'cardTitle'>;
  index: number;
}) => void;
```

### Example Usage

```jsx
const handleItemSelected = ({ item, index }) => {
  console.log('Selected item:', item.cardTitle);
  console.log('Item index:', index);
};

const handleThemeChange = (newTheme) => {
  console.log('Theme changed:', newTheme);
  // Save theme preference
  localStorage.setItem('theme', JSON.stringify(newTheme));
};

<Chrono
  items={items}
  onItemSelected={handleItemSelected}
  onThemeChange={handleThemeChange}
  onScrollEnd={() => console.log('Reached end of timeline')}
/>
```

---

## 🔄 Legacy Props (Deprecated)

These props are maintained for backward compatibility but are deprecated in favor of the grouped configuration API.

### Layout Props (Use `layout` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `cardWidth` | `layout.cardWidth` | `number` | ⚠️ **Deprecated** |
| `cardHeight` | `layout.cardHeight` | `number` | ⚠️ **Deprecated** |
| `timelinePointDimension` | `layout.pointSize` | `number` | ⚠️ **Deprecated** |
| `lineWidth` | `layout.lineWidth` | `number` | ⚠️ **Deprecated** |
| `itemWidth` | `layout.itemWidth` | `number` | ⚠️ **Deprecated** |
| `responsiveBreakPoint` | `layout.responsive.breakpoint` | `number` | ⚠️ **Deprecated** |
| `enableBreakPoint` | `layout.responsive.enabled` | `boolean` | ⚠️ **Deprecated** |
| `cardPositionHorizontal` | `layout.positioning.cardPosition` | `'TOP' \| 'BOTTOM'` | ⚠️ **Deprecated** |
| `flipLayout` | `layout.positioning.flipLayout` | `boolean` | ⚠️ **Deprecated** |

### Interaction Props (Use `interaction` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `disableNavOnKey` | `interaction.keyboardNavigation` | `boolean` | ⚠️ **Deprecated** (inverted) |
| `disableClickOnCircle` | `interaction.pointClick` | `boolean` | ⚠️ **Deprecated** (inverted) |
| `disableAutoScrollOnClick` | `interaction.autoScroll` | `boolean` | ⚠️ **Deprecated** (inverted) |
| `focusActiveItemOnLoad` | `interaction.focusOnLoad` | `boolean` | ⚠️ **Deprecated** |
| `highlightCardsOnHover` | `interaction.cardHover` | `boolean` | ⚠️ **Deprecated** |
| `disableInteraction` | `interaction.disabled` | `boolean` | ⚠️ **Deprecated** |

### Content Props (Use `content` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `parseDetailsAsHTML` | `content.allowHTML` | `boolean` | ⚠️ **Deprecated** |
| `useReadMore` | `content.readMore` | `boolean` | ⚠️ **Deprecated** |
| `textOverlay` | `content.textOverlay` | `boolean` | ⚠️ **Deprecated** |
| `titleDateFormat` | `content.dateFormat` | `string` | ⚠️ **Deprecated** |
| `textDensity` | `content.compactText` | `'LOW' \| 'HIGH'` | ⚠️ **Deprecated** |
| `semanticTags` | `content.semanticTags` | `SemanticTags` | ⚠️ **Deprecated** |

### Display Props (Use `display` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `borderLessCards` | `display.borderless` | `boolean` | ⚠️ **Deprecated** |
| `cardLess` | `display.cardsDisabled` | `boolean` | ⚠️ **Deprecated** |
| `disableTimelinePoint` | `display.pointsDisabled` | `boolean` | ⚠️ **Deprecated** |
| `timelinePointShape` | `display.pointShape` | `'circle' \| 'square' \| 'diamond'` | ⚠️ **Deprecated** |
| `showAllCardsHorizontal` | `display.allCardsVisible` | `boolean` | ⚠️ **Deprecated** |
| `disableToolbar` | `display.toolbar.enabled` | `boolean` | ⚠️ **Deprecated** (inverted) |
| `toolbarPosition` | `display.toolbar.position` | `'top' \| 'bottom'` | ⚠️ **Deprecated** |
| `scrollable` | `display.scrollable` | `boolean \| {scrollbar: boolean}` | ⚠️ **Deprecated** |

### Media Props (Use `media` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `mediaHeight` | `media.height` | `number` | ⚠️ **Deprecated** |
| `mediaSettings` | `media` | `MediaSettings` | ⚠️ **Deprecated** |

### Animation Props (Use `animation` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `slideShow` | `animation.slideshow.enabled` | `boolean` | ⚠️ **Deprecated** |
| `slideItemDuration` | `animation.slideshow.duration` | `number` | ⚠️ **Deprecated** |
| `slideShowType` | `animation.slideshow.type` | `SlideShowType` | ⚠️ **Deprecated** |
| `showProgressOnSlideshow` | `animation.slideshow.showProgress` | `boolean` | ⚠️ **Deprecated** |
| `showOverallSlideshowProgress` | `animation.slideshow.showOverallProgress` | `boolean` | ⚠️ **Deprecated** |

### Style Props (Use `style` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `classNames` | `style.classNames` | `ClassNames` | ⚠️ **Deprecated** |
| `fontSizes` | `style.fontSizes` | `FontSizes` | ⚠️ **Deprecated** |

### Accessibility Props (Use `accessibility` config instead)

| Legacy Prop | New API | Type | Description |
|-------------|---------|------|-------------|
| `buttonTexts` | `accessibility.buttonTexts` | `ButtonTexts` | ⚠️ **Deprecated** |

---

## 🔍 Type Definitions

Complete TypeScript definitions for all interfaces and types.

### Core Types

```typescript
// Timeline modes
type TimelineMode = 'horizontal' | 'vertical' | 'alternating' | 'horizontal-all';

// Legacy mode mapping
type LegacyTimelineMode = 'VERTICAL' | 'HORIZONTAL' | 'VERTICAL_ALTERNATING' | 'HORIZONTAL_ALL';

// Media types
type MediaType = 'VIDEO' | 'IMAGE';

// Text density (legacy)
type TextDensity = 'LOW' | 'HIGH';

// Slideshow animation types
type SlideShowType = 'reveal' | 'slide_in' | 'slide_from_sides';

// New slideshow animation types
type SlideshowAnimationType = 'reveal' | 'slide' | 'fade';

// Media fit options
type MediaFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

// Font weights
type FontWeight = 
  | 'thin' | 'extra-light' | 'light' | 'regular' | 'medium' 
  | 'semi-bold' | 'bold' | 'extra-bold' | 'black'
  | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Font display strategies
type FontDisplay = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

// HTML tag options for semantic tags
type HTMLTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
```

### Configuration Interfaces

```typescript
interface LayoutConfig {
  cardWidth?: number;
  cardHeight?: number;
  pointSize?: number;
  lineWidth?: number;
  itemWidth?: number;
  timelineHeight?: number | string;
  responsive?: {
    breakpoint?: number;
    enabled?: boolean;
  };
  positioning?: {
    cardPosition?: 'top' | 'bottom';
    flipLayout?: boolean;
  };
}

interface InteractionConfig {
  keyboardNavigation?: boolean;
  pointClick?: boolean;
  autoScroll?: boolean;
  focusOnLoad?: boolean;
  cardHover?: boolean;
  disabled?: boolean;
}

interface ContentConfig {
  allowHTML?: boolean;
  readMore?: boolean;
  textOverlay?: boolean;
  dateFormat?: string;
  compactText?: boolean;
  semanticTags?: {
    title?: HTMLTag;
    subtitle?: HTMLTag;
  };
}

interface DisplayConfig {
  borderless?: boolean;
  cardsDisabled?: boolean;
  pointsDisabled?: boolean;
  pointShape?: 'circle' | 'square' | 'diamond';
  allCardsVisible?: boolean;
  toolbar?: {
    enabled?: boolean;
    position?: 'top' | 'bottom';
    sticky?: boolean;
  };
  scrollable?: boolean | {
    scrollbar: boolean;
  };
}

interface MediaConfig {
  height?: number;
  align?: 'left' | 'center' | 'right';
  fit?: MediaFit;
}

interface AnimationConfig {
  slideshow?: {
    enabled?: boolean;
    duration?: number;
    type?: SlideshowAnimationType;
    autoStart?: boolean;
    showProgress?: boolean;
    showOverallProgress?: boolean;
  };
}

interface StyleConfig {
  classNames?: {
    card?: string;
    cardMedia?: string;
    cardSubTitle?: string;
    cardText?: string;
    cardTitle?: string;
    controls?: string;
    title?: string;
    timelinePoint?: string;
    timelineTrack?: string;
  };
  fontSizes?: {
    cardSubtitle?: string;
    cardText?: string;
    cardTitle?: string;
    title?: string;
  };
  googleFonts?: GoogleFontsConfig;
}

interface AccessibilityConfig {
  buttonTexts?: {
    first?: string;
    last?: string;
    next?: string;
    previous?: string;
    play?: string;
    stop?: string;
  };
  search?: {
    placeholder?: string;
    ariaLabel?: string;
    clearLabel?: string;
  };
}
```

### Google Fonts Configuration

```typescript
interface GoogleFontsConfig {
  fontFamily: string;
  elements?: {
    title?: FontElement;
    cardTitle?: FontElement;
    cardSubtitle?: FontElement;
    cardText?: FontElement;
    controls?: FontElement;
  };
  weights?: FontWeight[];
  display?: FontDisplay;
  preconnect?: boolean;
}

interface FontElement {
  weight?: FontWeight;
  style?: 'normal' | 'italic';
  size?: string;
}
```

### Internationalization Configuration

```typescript
interface I18nConfig {
  /** Complete internationalization configuration for all timeline texts */
  texts?: TimelineI18nConfig;
  /** Locale code (e.g., 'en', 'es', 'fr', 'de') for future locale-specific features */
  locale?: string;
  /** Text direction for RTL language support */
  direction?: 'ltr' | 'rtl';
}

// Complete text configuration interface with all categories
interface TimelineI18nConfig {
  navigation?: NavigationTexts;
  search?: SearchTexts;
  theme?: ThemeTexts;
  layout?: LayoutTexts;
  fullscreen?: FullscreenTexts;
  quickJump?: QuickJumpTexts;
  content?: ContentTexts;
  status?: StatusTexts;
  accessibility?: AccessibilityTexts;
  view?: ViewTexts;
  keyboard?: KeyboardTexts;
}
```

### Dark Mode Configuration

```typescript
interface DarkModeConfig {
  /** Enable dark mode */
  enabled?: boolean;
  /** Show dark mode toggle button in toolbar */
  showToggle?: boolean;
}
```

### Complete Props Interface

```typescript
// New grouped API (Recommended)
interface TimelinePropsV2 {
  // Core props
  items: TimelineItem[];
  mode?: TimelineMode;
  children?: ReactNode | ReactNode[];
  theme?: Theme;
  activeItemIndex?: number;
  allowDynamicUpdate?: boolean;
  id?: string;
  
  // Grouped configurations
  layout?: LayoutConfig;
  interaction?: InteractionConfig;
  content?: ContentConfig;
  display?: DisplayConfig;
  media?: MediaConfig;
  animation?: AnimationConfig;
  style?: StyleConfig;
  accessibility?: AccessibilityConfig;
  
  // Dark mode
  darkMode?: DarkModeConfig;
  
  // Event callbacks
  onItemSelected?: (data: { item: TimelineItem; index: number }) => void;
  onScrollEnd?: () => void;
  onThemeChange?: (theme: Theme) => void;
  onRestartSlideshow?: () => void;
}

// Legacy props interface (for backward compatibility)
interface LegacyTimelineProps {
  // All deprecated props listed in the legacy section above
  // ... (see Legacy Props section for complete list)
}

// Combined interface
type TimelineProps = TimelinePropsV2 & LegacyTimelineProps;
```

---

## 📝 Usage Examples

### Complete Configuration Example

```jsx
import { Chrono } from 'react-chrono';

const App = () => {
  const items = [
    {
      title: "2024-01-01",
      cardTitle: "New Year Launch",
      cardSubtitle: "Project Kickoff",
      cardDetailedText: "Started our new ambitious project with great enthusiasm.",
      media: {
        type: "IMAGE",
        source: { url: "/images/launch.jpg" },
        name: "Project launch ceremony"
      }
    },
    // ... more items
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Chrono
        items={items}
        mode="alternating"
        
        layout={{
          cardWidth: 450,
          cardHeight: 250,
          pointSize: 18,
          responsive: {
            enabled: true,
            breakpoint: 768,
          },
        }}
        
        interaction={{
          keyboardNavigation: true,
          pointClick: true,
          autoScroll: true,
          focusOnLoad: true,
        }}
        
        content={{
          allowHTML: false,
          readMore: true,
          dateFormat: 'MMM YYYY',
          semanticTags: {
            title: 'h2',
            subtitle: 'h3',
          },
        }}
        
        display={{
          borderless: false,
          pointShape: 'circle',
          toolbar: {
            enabled: true,
            position: 'top',
            sticky: true,
          },
        }}
        
        media={{
          height: 200,
          align: 'center',
          fit: 'cover',
        }}
        
        animation={{
          slideshow: {
            enabled: true,
            duration: 3000,
            type: 'fade',
            showProgress: true,
          },
        }}
        
        style={{
          googleFonts: {
            fontFamily: 'Inter',
            elements: {
              cardTitle: { weight: 'bold', size: '1.2rem' },
              cardSubtitle: { weight: 'medium', size: '0.9rem' },
            },
            preconnect: true,
          },
        }}
        
        accessibility={{
          buttonTexts: {
            play: 'Start Timeline',
            stop: 'Pause Timeline',
          },
        }}
        
        theme={{
          primary: '#0070f3',
          cardBgColor: '#ffffff',
          cardTitleColor: '#1f2937',
          iconColor: '#0070f3',
          buttonActiveBgColor: '#0070f3',
        }}
        
        darkMode={{
          enabled: false,
          showToggle: true,
        }}
        
        onItemSelected={({ item, index }) => {
          console.log(`Selected: ${item.cardTitle} at index ${index}`);
        }}
        
        onThemeChange={(theme) => {
          console.log('Theme updated:', theme);
        }}
      />
    </div>
  );
};
```

---

<div align="center">

**📚 For more examples and interactive demos, visit our [Storybook](https://5f985eb478dcb00022cfd60e-crlyulevwt.chromatic.com/)**

**🐛 Found an issue or missing property? [Report it on GitHub](https://github.com/prabhuignoto/react-chrono/issues)**

---

*This documentation covers React Chrono v2.9.1 and later*

</div>