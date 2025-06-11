# React Chrono UI Demo

This directory contains the organized demo application for React Chrono UI, showcasing various timeline configurations and use cases.

## Directory Structure

```
src/demo/
├── components/           # Modular timeline components
│   ├── horizontal/      # Horizontal timeline components
│   │   ├── BasicHorizontal.tsx
│   │   ├── AllHorizontal.tsx
│   │   ├── CardlessHorizontal.tsx
│   │   ├── InitialSelectedHorizontal.tsx
│   │   └── index.ts     # Exports all horizontal components
│   └── vertical/        # Vertical timeline components
│       ├── BasicVertical.tsx
│       ├── AlternatingVertical.tsx
│       ├── MixedVertical.tsx
│       ├── NewMediaVertical.tsx
│       ├── NestedVertical.tsx
│       ├── AlternatingNestedVertical.tsx
│       ├── CardlessVertical.tsx
│       ├── CustomContentVertical.tsx
│       ├── CustomContentWithIconsVertical.tsx
│       └── index.ts     # Exports all vertical components
├── data/                # Organized timeline data
│   ├── basic-timeline.ts     # WWII events (basic configuration)
│   ├── mixed-timeline.ts     # WWII events with mixed media
│   ├── nested-timeline.ts    # WWII events with nested items
│   ├── world-history.ts      # Comprehensive world history timeline
│   └── index.ts             # Exports all timeline data
├── App.tsx              # Main application with routing
├── layout.tsx           # Layout component with navigation
├── dynamic-load.tsx     # Dynamic loading demo
└── App.styles.ts        # Styled components

```

## Component Categories

### Vertical Timeline Components

- **BasicVertical**: Standard vertical timeline with basic features
- **AlternatingVertical**: Vertical timeline with alternating card layout
- **MixedVertical**: Vertical timeline with mixed content types
- **NewMediaVertical**: Vertical timeline optimized for media content
- **NestedVertical**: Vertical timeline with nested sub-items
- **AlternatingNestedVertical**: Alternating vertical timeline with nested items
- **CardlessVertical**: Minimal vertical timeline without cards
- **CustomContentVertical**: Vertical timeline with custom interactive content
- **CustomContentWithIconsVertical**: Vertical timeline with custom icons and content

### Horizontal Timeline Components

- **BasicHorizontal**: Standard horizontal timeline
- **AllHorizontal**: Horizontal timeline showing all cards simultaneously
- **CardlessHorizontal**: Minimal horizontal timeline without cards
- **InitialSelectedHorizontal**: Horizontal timeline with pre-selected item

## Timeline Data

### Available Datasets

- **basicTimeline**: WWII historical events with comprehensive details
- **mixedTimeline**: WWII events with mixed media types (images/videos)
- **nestedTimeline**: WWII events with nested sub-events
- **worldHistoryTimeline**: Comprehensive world history from 3500 BC to 1969 AD

### Data Structure

All timeline data follows the `TimelineItemModel` interface:

```typescript
interface TimelineItemModel {
  title: string;
  cardTitle: string;
  cardSubtitle: string;
  cardDetailedText: string | string[];
  media?: {
    type: 'IMAGE' | 'VIDEO';
    source: {
      url: string;
    };
  };
  items?: TimelineItemModel[]; // For nested timelines
}
```

## Routes

The demo application includes the following routes:

- `/` - Basic vertical timeline
- `/vertical-basic` - Basic vertical timeline
- `/vertical-alternating` - Alternating vertical timeline
- `/vertical-alternating-mixed` - Mixed content vertical timeline
- `/vertical-alternating-nested` - Nested alternating vertical timeline
- `/vertical-basic-nested` - Basic nested vertical timeline
- `/vertical-world-history` - World history timeline
- `/vertical-custom` - Custom content timeline
- `/vertical-custom-icon` - Custom content with icons
- `/horizontal` - Basic horizontal timeline
- `/horizontal-all` - Horizontal timeline (all cards)
- `/horizontal-initial-select` - Horizontal with initial selection
- `/dynamic-load` - Dynamic loading demonstration
- `/timeline-without-cards` - Cardless vertical timeline
- `/timeline-without-cards-horizontal` - Cardless horizontal timeline

## Features Demonstrated

### Timeline Modes
- `VERTICAL` - Standard vertical layout
- `VERTICAL_ALTERNATING` - Alternating vertical layout
- `HORIZONTAL` - Standard horizontal layout
- `HORIZONTAL_ALL` - Show all cards in horizontal mode

### Advanced Features
- **Slideshow mode** with customizable duration
- **Dynamic loading** with pagination
- **Nested timelines** with sub-events
- **Custom content** with interactive components
- **Media support** for images and videos
- **Theming** with custom colors and styles
- **Responsive design** with breakpoints
- **Accessibility** features
- **Custom icons** and styling

## Usage

Import components and data from their respective modules:

```typescript
import {
  BasicVertical,
  AlternatingVertical,
  // ... other vertical components
} from './components/vertical';

import {
  BasicHorizontal,
  AllHorizontal,
  // ... other horizontal components
} from './components/horizontal';

import {
  basicTimeline,
  mixedTimeline,
  nestedTimeline,
  worldHistoryTimeline,
} from './data';
```

## Development

The demo is organized for easy development and maintenance:

1. **Modular components** - Each timeline configuration is a separate component
2. **Centralized data** - All timeline data is organized in the data folder
3. **Type safety** - Full TypeScript support with proper interfaces
4. **Clean imports** - Barrel exports for easy importing
5. **Consistent structure** - All components follow the same patterns

This organization makes it easy to:
- Add new timeline configurations
- Modify existing demos
- Reuse components across different contexts
- Maintain and update the codebase
- Find specific functionality quickly 