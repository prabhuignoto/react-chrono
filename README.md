<div align="center">
  <img src="./readme-assets/social-logo-small.png" alt="React Chrono Logo" />
  <h1>React Chrono</h1>
  <p>A flexible and modern timeline component for React.</p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-chrono.svg?style=flat)](https://www.npmjs.com/package/react-chrono)
![npm downloads](https://img.shields.io/npm/dm/react-chrono.svg?label=npm%20downloads&style=flat)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-chrono)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![styled with Prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://prettier.io/)

<!-- Build & Quality Badges -->
[![Build Status](https://dev.azure.com/prabhummurthy/react-chrono/_apis/build/status/prabhuignoto.react-chrono?branchName=master)](https://dev.azure.com/prabhummurthy/react-chrono/_build/latest?definitionId=7&branchName=master)
[![DeepScan grade](https://deepscan.io/api/teams/10074/projects/13644/branches/234929/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10074&pid=13644&bid=234929)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f2e24a98defd4e4fa7f6f24d86b8dab5)](https://www.codacy.com/manual/prabhuignoto/react-chrono?utm_source=github.com&utm_medium=referral&utm_content=prabhuignoto/react-chrono&utm_campaign=Badge_Grade)
[![react-chrono](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/8zb5a5&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/8zb5a5/runs)
[![Known Vulnerabilities](https://snyk.io/test/github/prabhuignoto/react-chrono/badge.svg)](https://snyk.io/test/github/prabhuignoto/react-chrono)
[![Depfu](https://badges.depfu.com/badges/48a23a6a830309649b7e516467cd9a48/overview.svg)](https://depfu.com/github/prabhuignoto/react-chrono?project_id=15325)
[![Coverage Status](https://coveralls.io/repos/github/prabhuignoto/react-chrono/badge.svg?branch=master)](https://coveralls.io/github/prabhuignoto/react-chrono?branch=master)
<a href="https://5f985eb478dcb00022cfd60e-axcjutcmmg.chromatic.com/?path=/story/example-vertical--vertical-basic" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg" alt="Storybook"></a>

</div>

<!-- **Try it on CodeSandbox!**
[![Edit react-chrono](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-chrono-bg56e?fontsize=14&hidenavigation=1&theme=dark) -->

React Chrono is a modern timeline component for React that offers a variety of features and customization options. It allows you to render timelines in horizontal, vertical, and vertical-alternating modes, display images and videos, and much more.

## Table of Contents

- [✨ Features](#-features)
- [💾 Installation](#-installation)
- [🚀 Getting Started](#-getting-started)
  - [Basic Horizontal Mode](#basic-horizontal-mode)
  - [Vertical Mode](#vertical-mode)
  - [Vertical Alternating Mode](#vertical-alternating-mode)
- [⚙️ Props](#️-props)
  - [Core Props](#core-props)
  - [Timeline Item Model](#timeline-item-model)
  - [Navigation & Interaction](#navigation--interaction)
  - [Layout & Sizing](#layout--sizing)
  - [Media Handling](#media-handling)
  - [Content & Display](#content--display)
  - [Theming & Styling](#theming--styling)
  - [Slideshow](#slideshow)
  - [Search](#search)
  - [Miscellaneous](#miscellaneous)
- [🎨 Customization](#-customization)
  - [Rendering Custom Content](#rendering-custom-content-1)
  - [Custom Icons](#custom-icons)
  - [Nested Timelines](#nested-timelines-1)
  - [Custom Class Names](#custom-class-names)
  - [Custom Font Sizes](#custom-font-sizes)
  - [Custom Button Alt Text](#custom-button-alt-text)
- [📦 Examples & Demos](#-examples--demos)
  - [CodeSandbox Examples](#codesandbox-examples)
  - [Kitchen Sink Demo](#kitchen-sink-demo)
  - [Storybook](#storybook)
- [🛠️ Build Setup](#️-build-setup)
- [🧪 Tests](#-tests)
- [🤝 Contributing](#-contributing)
- [🧱 Built With](#-built-with)
- [💖 Support & Meta](#-support--meta)
- [✨ Contributors](#-contributors)

## ✨ Features

-   🚥 **Multiple Modes**: Render timelines in Horizontal, Vertical, or Vertical-Alternating layouts.
-   📺 **Slideshow**: Auto-play the timeline with slideshow functionality.
-   🖼️ **Media Support**: Easily display images and videos within timeline cards.
-   ⌨️ **Keyboard Accessible**: Navigate the timeline using keyboard controls.
-   🔧 **Custom Content**: Render custom React components within timeline cards.
-   🌿 **Nested Timelines**: Display timelines within timeline cards for complex narratives.
-   ⚡ **Data-Driven API**: Configure the timeline dynamically using a simple data structure.
-   🎨 **Theming**: Customize colors and appearance with ease.
-   🎭 **Custom Icons**: Use your own icons for timeline points.
-   💪 **TypeScript**: Built with TypeScript for robust development.
-   💅 **Styled with Styled Component**: Leverages Styled Component for flexible styling.

## 💾 Installation

```bash
# Using yarn
yarn add react-chrono

# Using npm
npm install react-chrono
```

## 🚀 Getting Started

Ensure you wrap the `Chrono` component in a container with a specified `width` and `height`.

### Basic Horizontal Mode
By default, if no `mode` is specified, the component renders in `HORIZONTAL` mode.

```jsx
import React from "react";
import { Chrono } from "react-chrono";

const App = () => {
  const items = [
    {
      title: "May 1940",
      cardTitle: "Dunkirk",
      url: "http://www.history.com",
      cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to a destroyer...",
      cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to a destroyer during the evacuation from Dunkirk.",
      media: {
        type: "IMAGE",
        source: {
          url: "http://someurl/image.jpg"
        }
      }
    },
    // ... more items
  ];

  return (
    <div style={{ width: "800px", height: "400px" }}>
      <Chrono items={items} />
    </div>
  );
};

export default App;
```
![Horizontal Timeline Example](./readme-assets/horizontal_all.jpg)

### Vertical Mode
To render the timeline vertically, set the `mode` prop to `VERTICAL`.

```jsx
<div style={{ width: '300px', height: '950px' }}>
  <Chrono items={items} mode="VERTICAL" />
</div>
```
![Vertical Timeline Example](./readme-assets/vertical_basic.jpg)

### Vertical Alternating Mode
For a layout where cards alternate sides, use `VERTICAL_ALTERNATING`.

```jsx
<div style={{ width: '500px', height: '950px' }}>
  <Chrono items={items} mode="VERTICAL_ALTERNATING" />
</div>
```
![Vertical Alternating Timeline Example](./readme-assets/vertical_alternating.jpg)

## ⚙️ Props

React Chrono offers a wide range of props for customization.

### Core Props

| Name        | Type                                           | Default              | Description                                                                                                |
| :---------- | :--------------------------------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------- |
| `items`     | `TimelineItemModel[]`                          | `[]`                 | An array of [Timeline Item objects](#timeline-item-model) to display.                                      |
| `mode`      | `'HORIZONTAL'`, `'VERTICAL'`, `'VERTICAL_ALTERNATING'` | `'HORIZONTAL'`       | Sets the layout mode of the timeline. Changed to `HORIZONTAL` from `VERTICAL_ALTERNATING` for new projects. |
| `theme`     | `Theme`                                        | `{...}`              | Customizes colors. See [Theming & Styling](#theming--styling) for details.                                 |

### Timeline Item Model

Each object in the `items` array can have the following properties:

| Property           | Type               | Description                                                                                                |
| :----------------- | :----------------- | :--------------------------------------------------------------------------------------------------------- |
| `title`            | `string`           | Title of the timeline item (often a date or short label).                                                  |
| `cardTitle`        | `string`           | Title displayed on the timeline card.                                                                      |
| `cardSubtitle`     | `string`           | Subtitle text displayed on the timeline card.                                                              |
| `cardDetailedText` | `string` or `string[]` | Detailed text for the card. An array of strings will render each string as a separate paragraph.         |
| `media`            | `TimelineMediaModel` | Object to configure image or video display. See [Media Handling](#media-handling).                         |
| `url`              | `string`           | URL associated with the timeline item's title. Clicking the title will navigate to this URL.               |
| `date`             | `Date` or `string` | Date to be used in the title. If provided, this will override the `title` property for display purposes. |
| `timelineContent`  | `ReactNode`        | Custom React content to render inside the card. Overrides `cardDetailedText`. See [Rendering Custom Content](#rendering-custom-content-1). |
| `items`            | `TimelineItemModel[]` | Array of timeline items for creating [Nested Timelines](#nested-timelines-1).                            |
| `active`           | `boolean`          | If true, this item will be initially active (only for the first matching item).                            |
| `id`               | `string`           | A unique identifier for the timeline item.                                                                 |
| `visible`          | `boolean`          | Controls the visibility of the timeline item.                                                              |


**Example `TimelineItemModel`:**
```js
{
  title: "May 1940",
  cardTitle: "Dunkirk",
  cardSubtitle: "Evacuation of Allied soldiers from the beaches and harbour of Dunkirk, France.",
  cardDetailedText: ["Paragraph one about Dunkirk.", "Paragraph two providing more details."],
  media: {
    type: "IMAGE", // "VIDEO"
    source: {
      url: "http://someurl/dunkirk.jpg"
    },
    name: "Dunkirk Evacuation"
  },
  url: "https://en.wikipedia.org/wiki/Dunkirk_evacuation",
  // For nested timeline:
  // items: [{ cardTitle: 'Sub-event 1' }, { cardTitle: 'Sub-event 2' }]
}
```

### Navigation & Interaction

| Name                       | Type        | Default   | Description                                                                                             |
| :------------------------- | :---------- | :-------- | :------------------------------------------------------------------------------------------------------ |
| `activeItemIndex`          | `number`    | `0`       | Index of the timeline item to be active on load.                                                        |
| `disableNavOnKey`          | `boolean`   | `false`   | Disables keyboard navigation (<kbd>LEFT</kbd>/<kbd>RIGHT</kbd> for Horizontal, <kbd>UP</kbd>/<kbd>DOWN</kbd> for Vertical). |
| `disableClickOnCircle`     | `boolean`   | `false`   | Disables click action on timeline points/circles.                                                       |
| `disableAutoScrollOnClick` | `boolean`   | `false`   | Prevents auto-scrolling to the active card when a timeline card or point is clicked.                    |
| `onItemSelected`           | `function`  |           | Callback function invoked when a timeline item is selected. Passes item data and index.                 |
| `onScrollEnd`              | `function`  |           | Callback function invoked when the end of the timeline is reached during scrolling.                     |
| `focusActiveItemOnLoad`    | `boolean`   | `true`    | Automatically scrolls to and focuses on the `activeItemIndex` when the timeline loads.                  |
| `disableInteraction`       | `boolean`   | `false`   | Disables all user interactions with the timeline (clicks, keyboard navigation).                         |
| `enableQuickJump`          | `boolean`   | `true`    | Allows quick jumping to a timeline item via controls (if toolbar is enabled).                           |
| `useReadMore`              | `boolean`   | `true`    | Enables a "read more" button if card content exceeds available space. Set to `false` to always show all text. |

**Keyboard Navigation:**
-   **Horizontal Mode**: Use <kbd>LEFT</kbd> and <kbd>RIGHT</kbd> arrow keys.
-   **Vertical/Vertical Alternating Mode**: Use <kbd>UP</kbd> and <kbd>DOWN</kbd> arrow keys.
-   <kbd>HOME</kbd>: Jump to the first item.
-   <kbd>END</kbd>: Jump to the last item.

### Layout & Sizing

| Name                     | Type                               | Default          | Description                                                                                                                               |
| :----------------------- | :--------------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `cardHeight`             | `number`                           | `200`            | Minimum height (in pixels) of timeline cards.                                                                                             |
| `cardWidth`              | `number`                           | `450`            | Maximum width (in pixels) of timeline cards.                                                                                              |
| `itemWidth`              | `number`                           | `300`            | Width (in pixels) of each timeline section in `HORIZONTAL` mode.                                                                          |
| `contentDetailsHeight`   | `number`                           | `150`            | Height (in pixels) of the detailed content area within a card if `cardDetailedText` is used.                                              |
| `lineWidth`              | `number`                           | `3`              | Width (in pixels) of the main timeline track line.                                                                                        |
| `timelinePointDimension` | `number`                           | `16`             | Diameter (in pixels) of the circular points on the timeline.                                                                              |
| `nestedCardHeight`       | `number`                           | `150`            | Height (in pixels) of cards within a [nested timeline](#nested-timelines-1).                                                              |
| `scrollable`             | `boolean` or `{ scrollbar: boolean }` | `true`           | Makes `VERTICAL` and `VERTICAL_ALTERNATING` modes scrollable. Set to `{ scrollbar: true }` to show the scrollbar.                         |
| `enableBreakPoint`       | `boolean`                          | `true`           | If true, `VERTICAL_ALTERNATING` mode automatically switches to `VERTICAL` mode when `responsiveBreakPoint` is reached.                     |
| `responsiveBreakPoint`   | `number`                           | `768`            | Viewport width (in pixels) at which `VERTICAL_ALTERNATING` mode switches to `VERTICAL` if `enableBreakPoint` is true. Default changed to `768`. |
| `cardPositionHorizontal` | `'TOP'` or `'BOTTOM'`              | `'BOTTOM'`       | Positions the card above or below the timeline in `HORIZONTAL` mode. Default changed to `'BOTTOM'`.                                       |
| `flipLayout`             | `boolean`                          | `false`          | Reverses the layout direction (e.g., Right-to-Left for horizontal, or swaps sides for vertical alternating).                              |
| `showAllCardsHorizontal` | `boolean`                          | `false`          | In `HORIZONTAL` mode, displays all cards simultaneously instead of only the active one.                                                   |

### Media Handling

The `media` object within a [Timeline Item](#timeline-item-model) configures images or videos.

| `media` Property | Type                               | Description                                                                                             |
| :--------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `type`           | `'IMAGE'` or `'VIDEO'`             | Specifies the type of media.                                                                            |
| `source`         | `{ url: string, type?: string }`   | `url`: URL of the image or video. `type` (for video): e.g., `'mp4'`, `'webm'`.                          |
| `name`           | `string`                           | Alt text for images or a descriptive name for videos.                                                   |
| `active`         | `boolean`                          | (Video only) If true, video will attempt to play when its card becomes active.                          |
| `id`             | `string`                           | A unique ID for the media element.                                                                      |
| `videoOptions`   | `HTMLVideoElement attributes`      | (Video only) An object containing standard HTML5 video attributes like `loop`, `muted`, `autoPlay`, etc. |


**Image Example:**
```js
media: {
  type: "IMAGE",
  name: "dunkirk beach",
  source: {
    url: "http://someurl/image.jpg"
  }
}
```

**Video Example (auto-plays when active, muted):**
```js
media: {
  type: "VIDEO",
  name: "Pearl Harbor",
  source: {
    url: "/pearl-harbor.mp4", // or "https://www.youtube.com/embed/f6cz9gtMTeI"
    type: "mp4" // Optional for local files if extension is clear, useful for YouTube embeds
  },
  videoOptions: { autoPlay: true, muted: true }
}
```
![Timeline with Media](./readme-assets/media.png)

**Media Settings Prop (`mediaSettings`):**
This top-level prop on `<Chrono>` controls global media display:

| Name    | Type                          | Default  | Description                                                                 |
| :------ | :---------------------------- | :------- | :-------------------------------------------------------------------------- |
| `align` | `'left'`, `'right'`, `'center'` | `'left'` | Alignment of media within the card. Default changed to `'left'`.            |
| `fit`   | `'cover'`, `'contain'`, `'fill'`, `'none'`, `'scale-down'` | `'cover'`  | CSS `object-fit` property for images.                                       |

```jsx
<Chrono items={items} mediaSettings={{ align: 'right', fit: 'contain' }} />
```

### Content & Display

| Name                   | Type        | Default        | Description                                                                                                                            |
| :--------------------- | :---------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `borderLessCards`      | `boolean`   | `false`        | Removes borders and shadows from timeline cards for a flatter look.                                                                    |
| `cardLess`             | `boolean`   | `false`        | Hides timeline cards, showing only titles/points. Useful for a very compact timeline.                                                  |
| `disableTimelinePoint` | `boolean`   | `false`        | Hides the circular points on the timeline track.                                                                                       |
| `timelinePointShape`   | `'circle'`, `'square'`, `'diamond'` | `'circle'`     | Configures the shape of the points on the timeline.                                                                    |
| `textOverlay`          | `boolean`   | `false`        | Displays text content as an overlay on top of media elements. Requires `text` property in timeline items.                              |
| `parseDetailsAsHTML`   | `boolean`   | `false`        | If true, `cardDetailedText` will be parsed as HTML. Use with caution due to XSS risks if content is user-supplied.                     |
| `titleDateFormat`      | `string`    | `'MMM DD, YYYY'` | Date format for item titles when using the `date` property in items. Supports all [day.js](https://day.js.org/) formats.             |
| `textDensity`          | `'LOW'` or `'HIGH'` | `'HIGH'`       | Configures the amount of text displayed in cards. `'LOW'` might truncate more aggressively.                                        |

**Text Overlay Mode:**
Enable `textOverlay` and provide a `text` property in your `items`.
```jsx
const items = [
  {
    title: 'First item',
    media: { type: 'IMAGE', source: { url: 'https://example.com/image.jpg' }},
    text: 'This is the caption for the first item, appearing over the image.'
  }
];
<Chrono items={items} textOverlay />;
```
![Text Overlay Example](./readme-assets/text_overlay.jpg)

### Theming & Styling

Use the `theme` prop to customize colors:
```jsx
<Chrono
  items={items}
  theme={{
    primary: 'red',          // Main timeline color (points, lines)
    secondary: 'blue',       // Background color for timeline cards or other elements depending on mode
    cardBgColor: 'yellow',   // Background color of the timeline cards
    cardForeColor: 'black',  // Text color within timeline cards
    titleColor: 'black',     // Color of the timeline item titles (e.g., dates)
    titleColorActive: 'red', // Color of the active timeline item title
  }}
/>
```
> For a complete list of themeable properties, please refer to the `Theme` type definition in the source code or Storybook examples.

**Dark Mode Toggle:**
| Name               | Type       | Default | Description                                                                                                |
| :----------------- | :--------- | :------ | :--------------------------------------------------------------------------------------------------------- |
| `enableDarkToggle` | `boolean`  | `false` | Adds a toggle switch to the toolbar for enabling dark mode (if dark theme is configured).                  |
| `onThemeChange`    | `function` |         | Callback invoked when the theme changes, e.g., via the dark mode toggle. Passes the new theme object.        |


### Slideshow

| Name                | Type                                     | Default            | Description                                                                                                                            |
| :------------------ | :--------------------------------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `slideShow`         | `boolean`                                | `false`            | Enables slideshow mode and shows play/pause controls in the toolbar.                                                                   |
| `slideItemDuration` | `number`                                 | `2000`             | Duration (in milliseconds) each timeline item remains active during a slideshow. Default changed to `2000`.                            |
| `slideShowType`     | `'reveal'`, `'slide_from_sides'`, `'slide_in'` | Varies by `mode` | Type of animation for slideshow transitions. Defaults: `VERTICAL` -> `'reveal'`, `VERTICAL_ALTERNATING` -> `'slide_from_sides'`, `HORIZONTAL` -> `'slide_in'`. |

```jsx
<Chrono items={items} slideShow slideItemDuration={3000} />
```
> Slideshow can be stopped by clicking the stop button or pressing <kbd>ESC</kbd>.

### Search

| Name                | Type      | Default             | Description                                                                                                |
| :------------------ | :-------- | :------------------ | :--------------------------------------------------------------------------------------------------------- |
| `searchPlaceholder` | `string`  | `"Search..."`       | Placeholder text for the search input in the toolbar.                                                      |
| `searchAriaLabel`   | `string`  | `"Search timeline"` | ARIA label for the search input for accessibility.                                                         |
| `clearSearch`       | `string`  | `"Clear search"`    | Text/ARIA label for the clear search button.                                                               |

```jsx
<Chrono
  items={data}
  searchPlaceholder="Find in timeline..."
/>
```
> Search functionality is part of the toolbar. To hide search (and the toolbar), set `disableToolbar={true}`.

### Miscellaneous

| Name                     | Type        | Default   | Description                                                                                                                               |
| :----------------------- | :---------- | :-------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `allowDynamicUpdate`     | `boolean`   | `false`   | Enables dynamic updates of timeline items. If true, changes to the `items` prop will re-render the timeline.                              |
| `noUniqueId`             | `boolean`   | `false`   | Prevents generating a unique ID for the timeline wrapper. Use with `uniqueId` if you need to set a specific ID.                             |
| `uniqueId`               | `string`    |           | Sets a custom unique ID for the timeline wrapper. Useful with `noUniqueId={true}`.                                                        |
| `disableToolbar`         | `boolean`   | `false`   | Hides the entire toolbar/control panel.                                                                                                   |
| `toolbarPosition`        | `'TOP'` or `'BOTTOM'` | `'TOP'`   | Positions the toolbar at the top or bottom of the timeline.                                                                       |
| `highlightCardsOnHover`  | `boolean`   | `false`   | Highlights timeline cards on mouse hover.                                                                                                 |

## 🎨 Customization

### Rendering Custom Content
Pass React elements as children to `<Chrono>`. Each child will be rendered into a timeline card. This can be combined with the `items` prop to provide titles or other metadata.

```jsx
const customItems = [
  { title: '2023-01-01', cardTitle: 'Event One' },
  { title: '2023-02-15', cardTitle: 'Event Two' },
];

<Chrono mode="VERTICAL" items={customItems}>
  <div>
    <h4>Custom Content for Event One</h4>
    <p>This is fully custom JSX rendered in the first card.</p>
  </div>
  <div>
    <img src="<url_to_image>" alt="Custom Image" style={{width: "100%"}} />
    <p>An image in the second card.</p>
  </div>
</Chrono>
```

### Custom Icons
Provide images for timeline points by wrapping them in a `div` with `className="chrono-icons"` as a child of `<Chrono>`. Icons are applied sequentially.

```jsx
<Chrono items={items} mode="VERTICAL_ALTERNATING">
  {/* Custom content for cards (optional) */}
  <div>Card 1 Content</div>
  <div>Card 2 Content</div>

  {/* Custom icons for timeline points */}
  <div className="chrono-icons">
    <img src="image1.svg" alt="icon1" />
    <img src="image2.svg" alt="icon2" />
    {/* Add more images for more items */}
  </div>
</Chrono>
```

### Nested Timelines
Create timelines within timeline cards by providing an `items` array within a parent timeline item.
```jsx
const itemsWithNested = [
  {
    title: 'Main Event 1',
    cardTitle: 'Chapter 1',
    items: [ // Nested timeline
      { cardTitle: 'Sub-event 1.1', cardSubtitle: 'Details for 1.1' },
      { cardTitle: 'Sub-event 1.2', media: { type: "IMAGE", source: { url: '...' } } },
    ],
  },
  { title: 'Main Event 2', cardTitle: 'Chapter 2' },
];

<Chrono mode="VERTICAL" items={itemsWithNested} nestedCardHeight={120} />
```

### Custom Class Names
Apply your own CSS classes to various parts of the timeline using the `classNames` prop.
```jsx
<Chrono
  items={items}
  classNames={{
    card: 'my-custom-card',
    cardMedia: 'my-card-media',
    cardSubTitle: 'my-card-subtitle',
    cardText: 'my-card-text',
    cardTitle: 'my-card-title',
    controls: 'my-timeline-controls', // Class for the toolbar
    title: 'my-timeline-title',      // Class for the item titles (e.g., dates)
    timelinePoint: 'my-timeline-point',
    timelineTrack: 'my-timeline-track',
  }}
/>
```

### Custom Font Sizes
Adjust font sizes for card elements using the `fontSizes` prop.
```jsx
<Chrono
  items={data}
  fontSizes={{
    cardSubtitle: '0.85rem',
    cardText: '0.8rem',
    cardTitle: '1.1rem',
    title: '0.9rem', // Font size for the main timeline titles (dates)
  }}
/>
```

### Custom Button Alt Text
Customize the `alt` text for toolbar navigation buttons via `buttonTexts`.
```jsx
<Chrono
  items={data}
  buttonTexts={{
    first: 'Jump to First Item',
    last: 'Jump to Last Item',
    next: 'View Next Item',
    previous: 'View Previous Item',
    play: 'Start Slideshow',
    stop: 'Stop Slideshow', // Added for completeness
    jumpTo: 'Jump to specific item' // Added for completeness
  }}
/>
```
**Default `buttonTexts` values:**
| Property   | Value            |
| :--------- | :--------------- |
| `first`    | 'Go to First'    |
| `last`     | 'Go to Last'     |
| `next`     | 'Next'           |
| `previous` | 'Previous'       |
| `play`     | 'Play Slideshow' |
| `stop`     | 'Stop Slideshow' |
| `jumpTo`   | 'Jump to'        |


## 📦 Examples & Demos

### CodeSandbox Examples
Explore various configurations of React Chrono:
-   [Horizontal Basic](https://codesandbox.io/s/keen-shannon-gtjwn?file=/src/App.js)
-   [Horizontal - Show all cards](https://codesandbox.io/s/show-all-cards-5vuf2x?file=/src/App.js)
-   [Vertical Basic](https://codesandbox.io/s/react-chrono-vertical-basic-0rm1o?file=/src/App.js)
-   [Vertical Alternating](https://codesandbox.io/s/react-chrono-tree-text-1fcs3?file=/src/App.js)
-   [Vertical with All Images](https://codesandbox.io/s/react-chrono-tree-vertical-images-b5zri?file=/src/App.js)
-   [Vertical with Custom Content](https://codesandbox.io/s/react-chrono-vertical-custom-qepnm?file=/src/App.js)
-   [Vertical Custom Content with `items` prop](https://codesandbox.io/s/react-chrono-vertical-custom-2-uctcp?file=/src/App.js)
-   [Custom Icons Example](https://codesandbox.io/s/react-chrono-custom-icons-x9s2k?file=/src/App.js)

### Kitchen Sink Demo
See a comprehensive demo showcasing many features:
-   [React Chrono Kitchen Sink](https://react-chrono-kitchen-sink.prabhumurthy.com/)

### Storybook
Dive into a wide variety of examples hosted on Storybook:
-   [Horizontal Collection](https://5f985eb478dcb00022cfd60e-axcjutcmmg.chromatic.com/?path=/story/example-horizontal--horizontal-timeline)
-   [Vertical Collection](https://5f985eb478dcb00022cfd60e-axcjutcmmg.chromatic.com/?path=/story/example-vertical--vertical-basic)

## 🛠️ Build Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Lint CSS
pnpm lint:css

# ESLint
pnpm eslint

# Prettier
pnpm lint

# Build library
pnpm rollup
```

## 🧪 Tests

```bash
# Run unit tests
pnpm test

# Run Cypress tests (interactive)
pnpm cypress:test # or pnpm cypress open

# Run Cypress tests in headless mode
pnpm cypress:headless

# Run Cypress tests in quiet mode (headless, less output)
pnpm cypress:quiet
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  [Fork the repository](https://github.com/prabhuignoto/react-chrono/fork).
2.  Create your feature branch (`git checkout -b new-feature`).
3.  Commit your changes (`git commit -am 'Add: New amazing feature'`).
4.  Push to the branch (`git push origin new-feature`).
5.  Create a new Pull Request.

Please read `CONTRIBUTING.md` for more details on the process and `CODE_OF_CONDUCT.md`.

## 🧱 Built With

-   [TypeScript](https://www.typescriptlang.org/)
-   Styled with [Emotion](https://emotion.sh/)

## 💖 Support & Meta

Special thanks to [BrowserStack](https://www.browserstack.com/) for providing an Open Source License for testing.

Distributed under the MIT license. See `LICENSE` for more information.

Prabhu Murthy – [@prabhumurthy2](https://twitter.com/prabhumurthy2) – <prabhu.m.murthy@gmail.com>
GitHub: [https://github.com/prabhuignoto](https://github.com/prabhuignoto)

<a href="https://www.buymeacoffee.com/prabhuignoto" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-red.png" alt="Buy Me A Coffee" height="41" width="174" ></a>

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/project/overview?id=prabhuignoto_react-chrono)


## ✨ Contributors

Thanks to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://aloisdg.github.io/"><img src="https://avatars.githubusercontent.com/u/3449303?v=4?s=60" width="60px;" alt="Alois"/><br /><sub><b>Alois</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=aloisdg" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://kojikoji.ga"><img src="https://avatars.githubusercontent.com/u/474225?v=4?s=60" width="60px;" alt="Koji"/><br /><sub><b>Koji</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=koji" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://alexgirard.com"><img src="https://avatars.githubusercontent.com/u/373?v=4?s=60" width="60px;" alt="Alexandre Girard"/><br /><sub><b>Alexandre Girard</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=alx" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Ryuyxx"><img src="https://avatars.githubusercontent.com/u/69892552?v=4?s=60" width="60px;" alt="Ryuya"/><br /><sub><b>Ryuya</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=Ryuyxx" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/taqi457"><img src="https://avatars.githubusercontent.com/u/2155219?v=4?s=60" width="60px;" alt="Taqi Abbas"/><br /><sub><b>Taqi Abbas</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=taqi457" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/megasoft78"><img src="https://avatars.githubusercontent.com/u/514958?v=4?s=60" width="60px;" alt="megasoft78"/><br /><sub><b>megasoft78</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=megasoft78" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://dev.bigdreamer.cc"><img src="https://avatars.githubusercontent.com/u/39019913?v=4?s=60" width="60px;" alt="Eric（书生）"/><br /><sub><b>Eric（书生）</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=bigbigDreamer" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DrakeXorn"><img src="https://avatars.githubusercontent.com/u/3925261?v=4?s=60" width="60px;" alt="Christophe Bernard"/><br /><sub><b>Christophe Bernard</b></sub></a><br /><a href="https://github.com/prabhuignoto/react-chrono/commits?author=DrakeXorn" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
