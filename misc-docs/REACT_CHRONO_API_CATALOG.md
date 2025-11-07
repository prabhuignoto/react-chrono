# React Chrono - Comprehensive API Catalog

**Version:** 3.0.0 (v3.0)
**Package Manager:** pnpm 10.15.1
**Build System:** Vite
**Styling:** Vanilla Extract CSS-in-TypeScript
**Testing:** Vitest + Playwright

---

## 1. NEW GROUPED API (TimelinePropsV2) - Recommended

### Core Required Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `TimelineItemModel[]` | Array of timeline items to display |

### Core Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `TimelineMode` | `'alternating'` | Timeline display mode |
| `children` | `ReactNode \| ReactNode[]` | - | Custom React content for timeline cards |
| `theme` | `Theme` | - | Visual theme configuration object |
| `activeItemIndex` | `number` | - | Index of initially active timeline item |
| `allowDynamicUpdate` | `boolean` | `false` | Enable dynamic updates to timeline items |
| `id` | `string` | - | Custom unique identifier for the timeline |

### Layout Configuration (`layout` prop)

| Property | Type | Description |
|----------|------|-------------|
| `cardWidth` | `number` | Maximum width of timeline cards (px) |
| `cardHeight` | `number \| 'auto'` | Height of timeline cards (px), or 'auto' for automatic sizing based on content |
| `pointSize` | `number` | Size of timeline points (px) |
| `lineWidth` | `number` | Width of the timeline track line (px) |
| `itemWidth` | `number` | Width of each timeline section in horizontal mode |
| `timelineHeight` | `number \| string` | Height of timeline container (px or CSS length) |
| `responsive.breakpoint` | `number` | Viewport width breakpoint for switching modes (px) |
| `responsive.enabled` | `boolean` | Enable responsive breakpoint switching |
| `positioning.cardPosition` | `'top' \| 'bottom'` | Card position in horizontal mode |
| `positioning.flipLayout` | `boolean` | Flip layout for RTL support |

### Interaction Configuration (`interaction` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `keyboardNavigation` | `boolean` | `true` | Enable keyboard navigation (arrow keys) |
| `pointClick` | `boolean` | `true` | Enable clicking on timeline points |
| `autoScroll` | `boolean` | `true` | Enable auto-scroll to active items |
| `focusOnLoad` | `boolean` | - | Focus active item on component load |
| `cardHover` | `boolean` | - | Highlight cards on mouse hover |
| `disabled` | `boolean` | `false` | Disable all user interactions |

**Keyboard Navigation Support:**
- Arrow Left/Right: Navigate between items
- Home/End: Go to first/last item
- Enter: Select item
- Escape: Exit fullscreen or pause slideshow
- Tab: Navigate controls

### Content Configuration (`content` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowHTML` | `boolean` | - | Allow HTML parsing in card content |
| `readMore` | `boolean` | - | Enable read more functionality |
| `textOverlay` | `boolean` | - | Display text as overlay on media |
| `dateFormat` | `string` | `'MMM DD, YYYY'` | Date format for timeline titles (dayjs format) |
| `compactText` | `boolean` | - | Use compact text display |
| `semanticTags.title` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'span' \| 'div'` | - | Semantic HTML tag for title |
| `semanticTags.subtitle` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6' \| 'span' \| 'div'` | - | Semantic HTML tag for subtitle |
| `alignment.horizontal` | `'left' \| 'center' \| 'right' \| 'stretch'` | `'left'` | Horizontal alignment of card content |
| `alignment.vertical` | `'top' \| 'center' \| 'bottom' \| 'stretch'` | `'top'` | Vertical alignment of card content |

### Display Configuration (`display` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `borderless` | `boolean` | - | Remove borders and shadows from cards |
| `cardsDisabled` | `boolean` | - | Hide timeline cards completely |
| `pointsDisabled` | `boolean` | - | Hide timeline points |
| `pointShape` | `'circle' \| 'square' \| 'diamond'` | `'circle'` | Shape of timeline points |
| `allCardsVisible` | `boolean` | - | Show all cards simultaneously in horizontal mode |
| `toolbar.enabled` | `boolean` | `true` | Enable/disable the toolbar |
| `toolbar.position` | `'top' \| 'bottom'` | `'top'` | Position of the toolbar |
| `toolbar.sticky` | `boolean` | - | Make toolbar sticky during scroll |
| `toolbar.search.width` | `string` | - | Default width of search section (CSS length) |
| `toolbar.search.maxWidth` | `string` | - | Maximum width of search section |
| `toolbar.search.minWidth` | `string` | - | Minimum width of search section |
| `toolbar.search.inputWidth` | `string` | - | Width of search input field |
| `toolbar.search.inputMaxWidth` | `string` | - | Maximum width of search input |
| `scrollable` | `boolean \| { scrollbar: boolean }` | - | Enable scrolling configuration |

### Media Configuration (`media` prop)

| Property | Type | Description |
|----------|------|-------------|
| `height` | `number` | Minimum height of media elements (px) |
| `align` | `'left' \| 'center' \| 'right'` | Media alignment within cards |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | CSS object-fit property for images |

### Animation Configuration (`animation` prop)

#### Slideshow Configuration

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `slideshow.enabled` | `boolean` | `false` | Enable slideshow functionality |
| `slideshow.duration` | `number` | `2000` | Duration each slide is displayed (ms) |
| `slideshow.type` | `'reveal' \| 'slide' \| 'fade'` | `'fade'` | Type of slideshow transition animation |
| `slideshow.autoStart` | `boolean` | `false` | Auto-start slideshow on load |
| `slideshow.showProgress` | `boolean` | - | Show progress indicator on individual cards |
| `slideshow.showOverallProgress` | `boolean` | - | Show overall progress bar |

**Animation Types:**
- `reveal`: Reveal animation effect
- `slide`: Slide-in animation effect
- `fade`: Fade in/out animation effect

### Style Configuration (`style` prop)

#### Custom CSS Classes

| Property | Type | Description |
|----------|------|-------------|
| `classNames.card` | `string` | Custom class for card container |
| `classNames.cardMedia` | `string` | Custom class for card media |
| `classNames.cardSubTitle` | `string` | Custom class for card subtitle |
| `classNames.cardText` | `string` | Custom class for card text |
| `classNames.cardTitle` | `string` | Custom class for card title |
| `classNames.controls` | `string` | Custom class for controls |
| `classNames.title` | `string` | Custom class for timeline title |
| `classNames.timelinePoint` | `string` | Custom class for timeline point |
| `classNames.timelineTrack` | `string` | Custom class for timeline track |

#### Font Sizes

| Property | Type | Description |
|----------|------|-------------|
| `fontSizes.cardSubtitle` | `string` | Custom font size for card subtitle (CSS) |
| `fontSizes.cardText` | `string` | Custom font size for card text (CSS) |
| `fontSizes.cardTitle` | `string` | Custom font size for card title (CSS) |
| `fontSizes.title` | `string` | Custom font size for timeline title (CSS) |

#### Google Fonts Configuration

| Property | Type | Description |
|----------|------|-------------|
| `googleFonts.fontFamily` | `string` | Font family name from Google Fonts |
| `googleFonts.weights` | `Array<'thin' \| 'extra-light' \| 'light' \| 'regular' \| 'medium' \| 'semi-bold' \| 'bold' \| 'extra-bold' \| 'black' \| 100-900>` | Font weights to load |
| `googleFonts.display` | `'auto' \| 'block' \| 'swap' \| 'fallback' \| 'optional'` | Font display strategy |
| `googleFonts.preconnect` | `boolean` | Preconnect to Google Fonts for faster loading |
| `googleFonts.elements.title.weight` | `string \| number` | Font weight for timeline item titles |
| `googleFonts.elements.title.style` | `'normal' \| 'italic'` | Font style for timeline item titles |
| `googleFonts.elements.title.size` | `string` | Font size for timeline item titles |
| `googleFonts.elements.cardTitle.weight` | `string \| number` | Font weight for card titles |
| `googleFonts.elements.cardTitle.style` | `'normal' \| 'italic'` | Font style for card titles |
| `googleFonts.elements.cardTitle.size` | `string` | Font size for card titles |
| `googleFonts.elements.cardSubtitle.weight` | `string \| number` | Font weight for card subtitles |
| `googleFonts.elements.cardSubtitle.style` | `'normal' \| 'italic'` | Font style for card subtitles |
| `googleFonts.elements.cardSubtitle.size` | `string` | Font size for card subtitles |
| `googleFonts.elements.cardText.weight` | `string \| number` | Font weight for card text |
| `googleFonts.elements.cardText.style` | `'normal' \| 'italic'` | Font style for card text |
| `googleFonts.elements.cardText.size` | `string` | Font size for card text |
| `googleFonts.elements.controls.weight` | `string \| number` | Font weight for controls |
| `googleFonts.elements.controls.style` | `'normal' \| 'italic'` | Font style for controls |
| `googleFonts.elements.controls.size` | `string` | Font size for controls |

### Accessibility Configuration (`accessibility` prop)

#### Button Texts

| Property | Type | Default |
|----------|------|---------|
| `buttonTexts.first` | `string` | `'Go to first item'` |
| `buttonTexts.last` | `string` | `'Go to last item'` |
| `buttonTexts.next` | `string` | `'Next item'` |
| `buttonTexts.previous` | `string` | `'Previous item'` |
| `buttonTexts.play` | `string` | `'Start slideshow'` |
| `buttonTexts.stop` | `string` | `'Stop slideshow'` |

#### Search Labels

| Property | Type | Default |
|----------|------|---------|
| `search.placeholder` | `string` | `'Search timeline'` |
| `search.ariaLabel` | `string` | `'Search timeline content'` |
| `search.clearLabel` | `string` | `'Clear Search'` |

### Internationalization Configuration (`i18n` prop)

**Locale Code:** `'en' | 'es' | 'fr' | 'de'` (for future locale-specific features)
**Text Direction:** `'ltr' | 'rtl'`

#### Navigation Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `navigation.first` | `'Go to first item'` | First item button |
| `navigation.last` | `'Go to last item'` | Last item button |
| `navigation.next` | `'Next item'` | Next item button |
| `navigation.previous` | `'Previous item'` | Previous item button |
| `navigation.play` | `'Start slideshow'` | Play slideshow button |
| `navigation.stop` | `'Stop slideshow'` | Stop slideshow button |
| `navigation.pause` | `'Pause slideshow'` | Pause slideshow button |
| `navigation.resume` | `'Resume slideshow'` | Resume slideshow button |

#### Search Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `search.placeholder` | `'Search Timeline'` | Search input placeholder |
| `search.ariaLabel` | `'Search timeline content'` | ARIA label for search |
| `search.clearLabel` | `'Clear Search'` | Clear button label |
| `search.nextMatch` | `'Next Match (Enter)'` | Next match button |
| `search.previousMatch` | `'Previous Match (Shift+Enter)'` | Previous match button |
| `search.resultsCount` | `'{current} of {total}'` | Results count template |
| `search.noResults` | `'No results found'` | No results message |
| `search.navigationLabel` | `'Search navigation'` | Search navigation ARIA label |

#### Theme Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `theme.darkMode` | `'Switch to dark mode'` | Dark mode button |
| `theme.lightMode` | `'Switch to light mode'` | Light mode button |
| `theme.toggleTheme` | `'Toggle theme'` | Theme toggle button |

#### Layout Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `layout.vertical` | `'Vertical layout'` | Vertical mode label |
| `layout.horizontal` | `'Horizontal layout'` | Horizontal mode label |
| `layout.alternating` | `'Alternating layout'` | Alternating mode label |
| `layout.horizontalAll` | `'Horizontal all layout'` | Horizontal-all mode label |
| `layout.switchLayout` | `'Switch layout'` | Layout switcher label |
| `layout.layoutSelection` | `'Layout selection'` | ARIA label for layout selection |

#### Fullscreen Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `fullscreen.enterFullscreen` | `'Enter fullscreen'` | Enter fullscreen button |
| `fullscreen.exitFullscreen` | `'Exit fullscreen'` | Exit fullscreen button |
| `fullscreen.notSupported` | `'Fullscreen not supported'` | Not supported message |
| `fullscreen.errorMessage` | `'Failed to enter fullscreen mode'` | Error message |

#### Quick Jump Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `quickJump.jumpTo` | `'Jump to item'` | Quick jump label |
| `quickJump.jumpToAriaLabel` | `'Quick navigation to timeline items'` | ARIA label |
| `quickJump.itemTemplate` | `'{index}: {title}'` | Item template (supports {index}, {title}) |

#### Content Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `content.readMore` | `'Read More'` | Read more button |
| `content.showLess` | `'Show Less'` | Show less button |
| `content.expand` | `'Expand'` | Expand button |
| `content.collapse` | `'Collapse'` | Collapse button |
| `content.cardInteraction` | `'Timeline card content'` | ARIA label for card |

#### Status Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `status.loading` | `'Loading timeline...'` | Loading message |
| `status.error` | `'Error loading timeline'` | Error message |
| `status.noItems` | `'No timeline items available'` | No items message |
| `status.empty` | `'Timeline is empty'` | Empty timeline message |

#### Accessibility Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `accessibility.timelineNavigation` | `'Timeline Navigation'` | Timeline navigation ARIA label |
| `accessibility.timelineContainer` | `'Timeline Container'` | Container ARIA label |
| `accessibility.timelineItem` | `'Timeline Item'` | Item ARIA label |
| `accessibility.activeItem` | `'Active Timeline Item'` | Active item ARIA label |
| `accessibility.timelinePoint` | `'Timeline Point'` | Point ARIA label |
| `accessibility.timelineCard` | `'Timeline Card'` | Card ARIA label |
| `accessibility.nestedItems` | `'Nested Timeline Items'` | Nested items ARIA label |
| `accessibility.itemPosition` | `'Item {current} of {total}'` | Position template (supports {current}, {total}) |

#### View Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `view.compact` | `'Compact view'` | Compact view label |
| `view.detailed` | `'Detailed view'` | Detailed view label |
| `view.toggleDensity` | `'Toggle view density'` | Density toggle label |
| `view.densitySelection` | `'View density selection'` | ARIA label for density |

#### Keyboard Texts

| Text Key | Default | Description |
|----------|---------|-------------|
| `keyboard.arrowKeys` | `'Use arrow keys to navigate...'` | Arrow keys help |
| `keyboard.homeKey` | `'Press Home to go to first...'` | Home key help |
| `keyboard.endKey` | `'Press End to go to last...'` | End key help |
| `keyboard.enterKey` | `'Press Enter to select...'` | Enter key help |
| `keyboard.escapeKey` | `'Press Escape to exit...'` | Escape key help |
| `keyboard.tabNavigation` | `'Use Tab to navigate controls'` | Tab navigation help |
| `keyboard.keyboardHelp` | `'Keyboard navigation available'` | General help |

### Dark Mode Configuration (`darkMode` prop)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enabled` | `boolean` | - | Enable dark mode |
| `showToggle` | `boolean` | - | Show dark mode toggle button in toolbar |

### Event Callbacks

| Callback | Type | Description |
|----------|------|-------------|
| `onItemSelected` | `(data: { item: TimelineItemData, index: number }) => void` | Called when a timeline item is selected |
| `onScrollEnd` | `() => void` | Called when scrolling reaches the end |
| `onThemeChange` | `(theme: Theme) => void` | Called when theme changes |
| `onRestartSlideshow` | `() => void` | Called when slideshow restarts |

---

## 2. DEPRECATED LEGACY PROPS (Backward Compatible)

All legacy props are automatically migrated to the new grouped API. Migration warnings appear in development mode.

### Layout Props (use `layout` instead)

- `cardWidth` → `layout.cardWidth`
- `cardHeight` → `layout.cardHeight`
- `timelinePointDimension` → `layout.pointSize`
- `lineWidth` → `layout.lineWidth`
- `itemWidth` → `layout.itemWidth`
- `responsiveBreakPoint` → `layout.responsive.breakpoint`
- `enableBreakPoint` → `layout.responsive.enabled`
- `cardPositionHorizontal` → `layout.positioning.cardPosition` (maps 'TOP'/'BOTTOM' to 'top'/'bottom')
- `flipLayout` → `layout.positioning.flipLayout`

### Interaction Props (use `interaction` instead)

- `disableNavOnKey` → `interaction.keyboardNavigation` (inverted)
- `disableClickOnCircle` → `interaction.pointClick` (inverted)
- `disableAutoScrollOnClick` → `interaction.autoScroll` (inverted)
- `focusActiveItemOnLoad` → `interaction.focusOnLoad`
- `highlightCardsOnHover` → `interaction.cardHover`
- `disableInteraction` → `interaction.disabled`

### Content Props (use `content` instead)

- `parseDetailsAsHTML` → `content.allowHTML`
- `useReadMore` → `content.readMore`
- `textOverlay` → `content.textOverlay`
- `titleDateFormat` → `content.dateFormat`
- `textDensity` → `content.compactText` (inverted: 'HIGH' → true)
- `semanticTags` → `content.semanticTags` (maps cardTitle → title, cardSubtitle → subtitle)

### Display Props (use `display` instead)

- `borderLessCards` → `display.borderless`
- `cardLess` → `display.cardsDisabled`
- `disableTimelinePoint` → `display.pointsDisabled`
- `timelinePointShape` → `display.pointShape`
- `showAllCardsHorizontal` → `display.allCardsVisible`
- `disableToolbar` → `display.toolbar.enabled` (inverted)
- `toolbarPosition` → `display.toolbar.position`
- `scrollable` → `display.scrollable`

### Media Props (use `media` instead)

- `mediaHeight` → `media.height`
- `mediaSettings.align` → `media.align`
- `mediaSettings.fit` → `media.fit`

### Animation Props (use `animation` instead)

- `slideShow` → `animation.slideshow.enabled`
- `slideItemDuration` → `animation.slideshow.duration`
- `slideShowType` → `animation.slideshow.type` (maps 'slide_in'/'slide_from_sides' → 'slide')
- `showProgressOnSlideshow` → `animation.slideshow.showProgress`
- `showOverallSlideshowProgress` → `animation.slideshow.showOverallProgress`

### Style Props (use `style` instead)

- `classNames` → `style.classNames`
- `fontSizes` → `style.fontSizes`

### Accessibility Props (use `accessibility` instead)

- `buttonTexts` → `accessibility.buttonTexts`

### Other Removed Props

- `noUniqueId` - No longer used
- `uniqueId` - Use `id` instead
- `isChild` - Internal prop, should not be used
- `contentDetailsHeight` - Use `content.detailsHeight` or remove
- `nestedCardHeight` - Use `media.height` instead
- `darkMode` - Use `darkMode.enabled` instead
- `enableDarkToggle` - Use `darkMode.showToggle` instead
- `enableQuickJump` - Use `display.toolbar` configuration
- `enableLayoutSwitch` - Use `display.toolbar` configuration

---

## 3. EXPORTED COMPONENTS

### Main Component

**Export:** `Chrono` (default export from `react-chrono`)

```typescript
import { Chrono } from 'react-chrono';
```

**Full Type Signature:**
```typescript
const Chrono: React.FunctionComponent<TimelinePropsV2>
```

The main component:
- Accepts both new grouped props (TimelinePropsV2) and legacy props (LegacyTimelineProps)
- Automatically detects and migrates legacy props
- Provides prop validation in development mode
- Wraps timeline with TimelineContextProvider and TimelineErrorBoundary
- Manages state for items, active indices, and slideshow

---

## 4. CUSTOM HOOKS

### Core Timeline Hooks

#### `useTimelineNavigation`
**Purpose:** Main navigation orchestrator coordinating next/previous/first/last navigation

**Signature:**
```typescript
useTimelineNavigation(props: {
  items: any[];
  mode: string;
  timelineId: string;
  hasFocus: boolean;
  flipLayout?: boolean;
  slideShowRunning?: boolean;
  isKeyboardNavigation?: boolean;
  onTimelineUpdated?: (index: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
}): NavigationState
```

#### `useTimelineKeyboardNavigation`
**Purpose:** Handles keyboard events (arrow keys, Home/End keys)

#### `useTimelineItemNavigation`
**Purpose:** Manages active item state and click events

#### `useTimelineScrolling`
**Purpose:** Calculates scroll positions and target elements

#### `useTimelineMode`
**Purpose:** Timeline mode switching logic

#### `useTimelineMedia`
**Purpose:** Handles media loading and lazy-loading lifecycle

#### `useTimelineScroll`
**Purpose:** Scroll behavior and positioning

#### `useTimelineSearch`
**Purpose:** Search functionality with match highlighting

**Signature:**
```typescript
useTimelineSearch(props: {
  items: TimelineCardModel[];
  onTimelineUpdated?: (index: number) => void;
  handleTimelineItemClick: (itemId?: string) => void;
}): SearchState
```

### Utility Hooks

#### `useFullscreen`
**Purpose:** Cross-browser fullscreen API with vendor prefixes

**Supported in:** Chrome, Firefox, Safari, Edge

#### `useFocusManager` / `useFocusTrap`
**Purpose:** Focus trap and management for modals/popovers

#### `useMeasureHeight` / `useMeasure`
**Purpose:** Reactive element height measurement

#### `useMediaState`
**Purpose:** Media playback state management

#### `useCardSize`
**Purpose:** Card dimension calculations

#### `useSlideshowProgress`
**Purpose:** Slideshow progress tracking and calculations

#### `useWindowSize`
**Purpose:** Window dimension tracking for responsive behavior

#### `useBackground`
**Purpose:** Background style management

#### `useUIState`
**Purpose:** UI state management hook

**Export Type:**
```typescript
type UIStateHook = {
  // UI state properties
}
```

#### `useEscapeKey` / `useKeyHandler`
**Purpose:** Keyboard event handling

#### `useOutsideClick`
**Purpose:** Detect clicks outside elements

### Utility Functions

#### Color Management

- `detectColorFormat(color: string): ColorFormat`
- `adjustRGBOpacity(rgb: string, opacity: number): string`
- `adjustHSLOpacity(hsl: string, opacity: number): string`

#### Color Format Constants

- `HEX_COLOR_REGEX`
- `RGB_COLOR_REGEX`
- `RGBA_COLOR_REGEX`
- `HSL_COLOR_REGEX`
- `HSLA_COLOR_REGEX`

#### Callback Utilities

- `useStableCallback(callback: T): T`
- `useLatestRef(value: T): React.MutableRefObject<T>`
- `useUnmount(callback: () => void): void`
- `useRAFThrottle(callback: T): T`

---

## 5. TIMELINE MODES SUPPORTED

| Mode | Type | Description | Best For |
|------|------|-------------|----------|
| `horizontal` | `'horizontal'` | Cards displayed horizontally in a single row | Timelines with few items, presentation-style |
| `vertical` | `'vertical'` | Cards stacked vertically on one side | Single-side display, clean layout |
| `alternating` | `'alternating'` (default) | Cards alternate left/right in vertical layout | Traditional timeline appearance |
| `horizontal-all` | `'horizontal-all'` | All cards visible simultaneously horizontally | Overview of all items at once |

---

## 6. MEDIA TYPES SUPPORTED

| Type | String Literal | Description |
|------|---|-------------|
| **IMAGE** | `'IMAGE'` | Static images (JPEG, PNG, WebP, etc.) |
| **VIDEO** | `'VIDEO'` | Video files (MP4, WebM, OGG, etc.) or embedded video URLs |

### Media Object Structure

```typescript
interface Media {
  type: 'IMAGE' | 'VIDEO';
  source: {
    url: string;          // Media URL
    type?: string;        // MIME type (optional)
  };
  name?: string;          // Media name (optional)
}
```

### Media Fit Options

- `'cover'` - Scale to cover container (may crop)
- `'contain'` - Scale to fit inside container (may have empty space)
- `'fill'` - Stretch to fill container
- `'none'` - Display at original size
- `'scale-down'` - Use smaller of 'contain' or original size

### Media Alignment Options

- `'left'` - Align media to the left
- `'center'` - Center align media
- `'right'` - Align media to the right

---

## 7. TIMELINE ITEM MODEL

```typescript
interface TimelineItemModel {
  _dayjs?: Dayjs;                          // Internal date object (auto-generated)
  active?: boolean;                        // Current active state
  cardDetailedText?: string | string[] | ReactNode | ReactNode[];  // Card body content
  cardSubtitle?: string | ReactNode;       // Card subtitle
  cardTitle?: string | ReactNode;          // Card title
  content?: ReactNode | ReactNode[];       // Main content (deprecated in favor of cardDetailedText)
  date?: number | string | Date;           // Date associated with item
  hasNestedItems?: boolean;                // Has nested sub-items
  id?: string;                             // Unique identifier (auto-generated if not provided)
  isNested?: boolean;                      // Is a nested item
  items?: TimelineItemModel[];             // Nested timeline items
  media?: Media;                           // Media content (image or video)
  position?: string;                       // Custom position indicator
  timelineContent?: ReactNode;             // Custom timeline content
  title?: string | ReactNode;              // Item title (defaults to formatted date)
  url?: string;                            // Associated URL
  visible?: boolean;                       // Visibility state (auto-managed)
}
```

---

## 8. THEME CUSTOMIZATION OPTIONS

### Color Properties

#### Card Colors

| Property | Type | Description |
|----------|------|-------------|
| `cardBgColor` | `string` | Card background color |
| `cardTitleColor` | `string` | Card title text color |
| `cardSubtitleColor` | `string` | Card subtitle text color |
| `cardDetailsBackGround` | `string` | Card details background color |
| `cardDetailsColor` | `string` | Card details text color |
| `cardMediaBgColor` | `string` | Card media background color |

#### Nested Card Colors

| Property | Type | Description |
|----------|------|-------------|
| `nestedCardBgColor` | `string` | Nested card background color |
| `nestedCardTitleColor` | `string` | Nested card title text color |
| `nestedCardSubtitleColor` | `string` | Nested card subtitle text color |
| `nestedCardDetailsBackGround` | `string` | Nested card details background |
| `nestedCardDetailsColor` | `string` | Nested card details text color |

#### Timeline Colors

| Property | Type | Description |
|----------|------|-------------|
| `timelineBgColor` | `string` | Timeline background color |
| `textColor` | `string` | Default text color |
| `titleColor` | `string` | Title text color |
| `titleColorActive` | `string` | Active title text color |
| `detailsColor` | `string` | Details text color |

#### Accent Colors

| Property | Type | Description |
|----------|------|-------------|
| `primary` | `string` | Primary accent color |
| `secondary` | `string` | Secondary accent color |
| `iconColor` | `string` | Icon color |
| `iconBackgroundColor` | `string` | Icon background color |

#### Toolbar Colors

| Property | Type | Description |
|----------|------|-------------|
| `toolbarBgColor` | `string` | Toolbar background color |
| `toolbarBtnBgColor` | `string` | Toolbar button background color |
| `toolbarTextColor` | `string` | Toolbar text color |

#### Button States (Dark Mode)

| Property | Type | Description |
|----------|------|-------------|
| `buttonHoverBgColor` | `string` | Button hover background color |
| `buttonActiveBgColor` | `string` | Button active background color |
| `buttonActiveIconColor` | `string` | Active button icon color |
| `buttonBorderColor` | `string` | Button border color |
| `buttonHoverBorderColor` | `string` | Button hover border color |
| `buttonActiveBorderColor` | `string` | Button active border color |

#### Effects & Lighting

| Property | Type | Description |
|----------|------|-------------|
| `shadowColor` | `string` | Shadow color |
| `glowColor` | `string` | Glow effect color |
| `searchHighlightColor` | `string` | Search result highlight color |

#### Dark Mode Toggle Specific

| Property | Type | Description |
|----------|------|-------------|
| `darkToggleActiveBgColor` | `string` | Dark toggle active background |
| `darkToggleActiveIconColor` | `string` | Dark toggle active icon color |
| `darkToggleActiveBorderColor` | `string` | Dark toggle active border color |
| `darkToggleGlowColor` | `string` | Dark toggle glow color |

---

## 9. ANIMATION OPTIONS

### Slideshow Types

| Type | Value | Description | Effect |
|------|-------|-------------|--------|
| Reveal | `'reveal'` | Progressive reveal animation | Content appears with reveal effect |
| Slide | `'slide'` | Slide-in animation | Items slide in from sides |
| Fade | `'fade'` | Fade in/out animation | Items fade in and out smoothly |

### Animation Configuration

- **Duration:** Configurable in milliseconds (default: 2000ms)
- **Auto-start:** Can be configured via `animation.slideshow.autoStart`
- **Progress Display:** Shows progress on individual cards or overall progress bar
- **Manual Control:** Play/Pause/Stop buttons available in toolbar

---

## 10. ACCESSIBILITY FEATURES

### ARIA Attributes

| Attribute | Used On | Description |
|-----------|---------|-------------|
| `role="list"` | Timeline container | Identifies as a list |
| `role="listitem"` | Timeline items | Identifies as list items |
| `aria-label` | Various elements | Descriptive labels for screen readers |
| `aria-current="step"` | Active item | Indicates current step in sequence |
| `aria-selected` | Items | Selection state |
| `aria-disabled` | Disabled items | Disabled state |
| `aria-hidden="true"` | Decorative elements | Hides from screen readers |

### Keyboard Navigation

**Arrow Keys:**
- Left/Right arrow: Navigate to previous/next item
- Home: Jump to first item
- End: Jump to last item

**Other Keys:**
- Enter: Select item
- Tab: Navigate between controls
- Escape: Exit fullscreen or stop slideshow

### Semantic HTML

- Configurable semantic tags for titles and subtitles
- Support for H1-H6, span, div elements
- Proper heading hierarchy maintained

### Focus Management

- Focus trap functionality for modals
- Focus indicators for keyboard navigation
- Optional focus on load feature

### Screen Reader Support

- Comprehensive ARIA labels
- Status announcements
- Item position information templates
- Loading and error messages

### Reduced Motion

- Respects `prefers-reduced-motion` media query
- Animations can be disabled for accessibility
- Alternative non-animated transitions available

### Contrast Requirements

- WCAG AA compliance (4.5:1 minimum contrast)
- Configurable colors for light and dark modes
- Support for high contrast themes

### Language Support

- Full i18n support for all UI text
- RTL language support via `flipLayout`
- Locale-aware date formatting

---

## 11. EXPORTED TYPES

From `react-chrono`:

```typescript
export { ReactChrono as Chrono };

// Main types
export type TimelineItem = TimelineItemModel;
export type TimelineProps = TimelinePropsV2;

// Configuration types
export type LayoutConfig;
export type InteractionConfig;
export type ContentConfig;
export type DisplayConfig;
export type MediaConfig;
export type AnimationConfig;
export type StyleConfig;
export type AccessibilityConfig;
```

---

## 12. CONTEXT SYSTEM

### TimelineContextProvider

**Location:** `src/components/contexts/TimelineContextProvider.tsx`

**Purpose:** Single unified context providing three logical groups:

1. **TimelineStaticConfig** - Rarely changing configuration
   - mode, cardHeight, cardWidth, itemWidth, etc.
   - Use `useTimelineStaticConfig()` to subscribe

2. **TimelineDynamicState** - Frequently changing state
   - isDarkMode, isMobile, textContentDensity
   - Use `useTimelineDynamicState()` to subscribe

3. **TimelineMemoizedObjects** - Computed/memoized values
   - theme, buttonTexts, i18nHelper
   - Use `useTimelineMemoizedObjects()` to subscribe

**Performance Pattern:** Use selective subscriptions to prevent unnecessary re-renders

---

## 13. BUILD & BUNDLE INFO

- **Build Tool:** Vite
- **CSS-in-JS:** Vanilla Extract (@vanilla-extract/css)
- **Target:** ES2022 with React 18/19 support
- **Output Formats:**
  - ESM: `dist/index.esm.js` (< 250 KB)
  - CJS: `dist/index.cjs` (< 250 KB)
  - Types: `dist/types/index.d.ts`
  - Styles: `dist/style.css`
- **Peer Dependencies:** React ^18.2.0 || ^19.0.0, React-DOM ^18.2.0 || ^19.0.0
- **External Dependencies:** Not bundled (React/React-DOM)

---

## 14. FEATURE SUMMARY

| Feature | Status | Notes |
|---------|--------|-------|
| Multiple Layout Modes | Supported | horizontal, vertical, alternating, horizontal-all |
| Media Support | Supported | Images, videos, YouTube embeds |
| Dark Mode | Supported | With toggle control |
| Responsive Design | Supported | Breakpoint-based mode switching |
| Keyboard Navigation | Supported | Full arrow key, Home/End support |
| Search | Supported | With match highlighting |
| Slideshow | Supported | Multiple animation types |
| Read More | Supported | Expandable content |
| Nested Items | Supported | Hierarchical timeline structure |
| Google Fonts | Supported | Per-element font configuration |
| Fullscreen Mode | Supported | Cross-browser with vendor prefixes |
| RTL Support | Supported | Via layout.positioning.flipLayout |
| Accessibility (a11y) | Supported | WCAG AA compliance, ARIA attributes |
| Internationalization (i18n) | Supported | 40+ configurable text elements |
| TypeScript | Full | 100% TypeScript codebase |
| Testing | Comprehensive | Vitest + Playwright |

---

## 15. COMMON PROP COMBINATIONS

### Minimal Timeline
```typescript
<Chrono items={items} />
```

### Professional Dark Theme
```typescript
<Chrono
  items={items}
  mode="alternating"
  theme={{
    timelineBgColor: '#000000',
    cardBgColor: '#1f2937',
    textColor: '#ffffff',
    cardTitleColor: '#ffffff',
    primary: '#3b82f6'
  }}
  darkMode={{ enabled: true, showToggle: true }}
/>
```

### Interactive Presentation
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
    slideshow: {
      enabled: true,
      duration: 3000,
      type: 'fade'
    }
  }}
/>
```

### Accessible Timeline
```typescript
<Chrono
  items={items}
  interaction={{ focusOnLoad: true }}
  accessibility={{
    buttonTexts: {
      first: 'Go to Beginning',
      last: 'Go to End',
      next: 'Next Event',
      previous: 'Previous Event'
    }
  }}
  content={{
    semanticTags: {
      title: 'h2',
      subtitle: 'h3'
    }
  }}
/>
```

