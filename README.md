<div align="center">
  <img src="./readme-assets/social-logo-small.png" alt="React Chrono UI Logo" width="300" />
  <h1>React Chrono</h1>
  <p><strong>The Ultimate Timeline Component for React Applications</strong></p>
  <p>Build stunning, interactive timelines with rich media support, accessibility-first design, and comprehensive customization options</p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-chrono.svg?style=flat-square&color=007ec6)](https://www.npmjs.com/package/react-chrono) [![npm downloads](https://img.shields.io/npm/dm/react-chrono.svg?label=downloads&style=flat-square&color=007ec6)](https://www.npmjs.com/package/react-chrono) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-chrono?style=flat-square&color=007ec6)](https://bundlephobia.com/package/react-chrono) [![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[![Build Status](https://img.shields.io/azure-devops/build/prabhummurthy/react-chrono/7?style=flat-square&logo=azure-pipelines)](https://dev.azure.com/prabhummurthy/react-chrono/_build/latest?definitionId=7&branchName=master) [![Coverage Status](https://img.shields.io/coveralls/github/prabhuignoto/react-chrono/master?style=flat-square&logo=coveralls)](https://coveralls.io/github/prabhuignoto/react-chrono?branch=master) [![Codacy Badge](https://img.shields.io/codacy/grade/f2e24a98defd4e4fa7f6f24d86b8dab5?style=flat-square&logo=codacy)](https://www.codacy.com/manual/prabhuignoto/react-chrono) [![Known Vulnerabilities](https://snyk.io/test/github/prabhuignoto/react-chrono/badge.svg?style=flat-square)](https://snyk.io/test/github/prabhuignoto/react-chrono)

[![styled with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier)](https://prettier.io/)[![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react)](https://reactjs.org/)

</div>

---

## ✨ Why Choose React Chrono?

### 🏆 **Flexible Storytelling**
Four distinct layout modes adapt to any narrative: horizontal for traditional timelines, vertical for mobile-first feeds, alternating for visual balance, or dashboard for complete overviews. Perfect for company milestones, historical events, project roadmaps, or personal journeys.

### 🎯 **Modern Development Experience**
Built entirely in TypeScript with a grouped API that organizes props into logical sections. Exceptional IDE support with intelligent autocomplete, type checking, and zero external dependencies for a lean foundation.

### 🎨 **Complete Customization**
25+ theme properties for pixel-perfect control - from subtle brand colors to full dark mode transformations. Effortless Google Fonts integration and support for custom React components within timeline cards.

### 🚀 **Production-Ready Performance**
Native lazy loading for images, IntersectionObserver-managed visibility, and automatic video pause optimization ensure smooth performance with large datasets. Cross-browser compatible with comprehensive WCAG AA accessibility.

---

## 📑 Table of Contents

<details>
<summary><strong>Quick Start</strong></summary>

- [Why Choose React Chrono?](#-why-choose-react-chrono)
- [What's New in v3.0](#-whats-new-in-v30)
- [Installation](#-installation)
- [Basic Usage](#-basic-usage)
- [Timeline Modes](#-timeline-modes)

</details>

<details>
<summary><strong>API Documentation</strong></summary>

- [Essential Props](#-essential-props)
- [Complete Props Reference](./PROPS-REFERENCE.md) 📋
- [Migration from v2 to v3](#-migration-from-v2-to-v3)

</details>

<details>
<summary><strong>Features & Customization</strong></summary>

- [Showcase: What React Chrono Can Do](#-showcase-what-react-chrono-can-do)
- [Rich Media Integration](#-rich-media-integration)
- [Interactive Features](#-interactive-features)
- [Theming & Branding](#-theming--branding)
- [Complete Internationalization](#-complete-internationalization)
- [Advanced Architecture](#-advanced-architecture)
- [Responsive Design](#-responsive-design)

</details>

<details>
<summary><strong>Why React Chrono</strong></summary>

- [Key Benefits](#-why-react-chrono)
- [Zero Configuration](#-zero-configuration-required)
- [TypeScript Native](#-typescript-native)
- [Accessibility Built-in](#-accessibility-built-in)

</details>

<details>
<summary><strong>Examples & Development</strong></summary>

- [Live Examples & Playground](#-live-examples--playground)
  - [CodeSandbox Examples Collection](#-codesandbox-examples-collection)
- [Development Setup](#-development-setup)
- [Contributing](#-contributing)
- [Built With Modern Technologies](#-built-with-modern-technologies)

</details>

---

## 🎉 What's New in v3.0

React Chrono v3.0 represents a complete evolution of the timeline component with architectural improvements and powerful new features:

### 🏗️ **Architectural Overhaul**
- **Grouped Configuration API** - Props organized into logical groups (`layout`, `interaction`, `content`, `display`, `media`, `animation`, `style`, `accessibility`, `i18n`) for intuitive configuration and better IDE autocomplete
- **Vanilla Extract Migration** - Complete migration from styled-components to Vanilla Extract for zero-runtime CSS, improved performance, and type-safe styling
- **Unified Context System** - Streamlined from multiple contexts to a single optimized provider, reducing complexity and improving performance

### ✨ **New Features**
- **Auto Card Height** - Set `cardHeight: 'auto'` to automatically size cards based on their content
- **Content Alignment Control** - Fine-grained control over horizontal and vertical alignment of card content
- **Google Fonts Integration** - Dynamic font loading with per-element weight/style control and intelligent caching
- **Comprehensive Internationalization** - 40+ configurable text elements across 11 categories with template string support
- **Fullscreen Mode** - Cross-browser fullscreen support with proper portal handling and keyboard shortcuts
- **Enhanced Dark Mode** - 25+ theme properties including button states, shadows, glows, and search highlighting
- **Sticky Toolbar** - Optional sticky positioning for toolbar with configurable placement
- **Borderless Cards** - Clean, minimal card variant for modern designs
- **Advanced Search Configuration** - Customizable search input widths and positioning

### 🎨 **UX Improvements**
- **Responsive Popover System** - Smart positioning with fullscreen awareness
- **Improved Navigation** - Enhanced keyboard navigation with better focus management
- **Text Density Control** - Dynamic card remeasurement when switching between compact/detailed views
- **Smoother Animations** - Refined slideshow transitions and card reveals

### 🧪 **Testing & Quality**
- **Component Testing** - Isolated component tests with visual regression testing
- **Enhanced Coverage** - Expanded test suite with integration tests for build output

### 📦 **Developer Experience**
- **TypeScript-First** - Enhanced type definitions with proper interface exports
- **Better Documentation** - Comprehensive props reference with migration guides
- **Improved Demos** - Redesigned demo site with full-width layouts and modern UX

All v2.x props remain fully supported with automatic mapping to the new grouped API, ensuring seamless upgrades without breaking changes.

---

## 🚀 Quick Start

### Installation

Get started with React Chrono in seconds:

```bash
# Using npm
npm install react-chrono

# Using yarn
yarn add react-chrono

# Using pnpm (recommended)
pnpm add react-chrono
```

**Requirements**: React 18.2+ | TypeScript 4.0+ (optional) | Modern browsers

## 🎯 Basic Usage

### Minimal Setup - Your First Timeline

Get started with just two lines of code:

```jsx
import { Chrono } from 'react-chrono';

const items = [
  { title: 'May 1940', cardTitle: 'Dunkirk', cardDetailedText: 'Allied evacuation from France' },
  { title: 'June 1944', cardTitle: 'D-Day', cardDetailedText: 'Normandy invasion begins' }
];

<Chrono items={items} />
```

### Common Configurations

**Horizontal Timeline with Custom Theme**
```jsx
<Chrono
  items={items}
  mode="horizontal"
  theme={{ primary: '#0070f3', cardBgColor: '#f5f5f5' }}
/>
```

**Vertical Timeline with Media**
```jsx
const items = [
  {
    title: 'January 2024',
    cardTitle: 'Product Launch',
    cardDetailedText: 'Released version 3.0 with new features',
    media: {
      type: 'IMAGE',
      source: { url: 'https://example.com/launch.jpg' },
      name: 'Product launch event'
    }
  }
];

<Chrono items={items} mode="vertical" />
```

**Alternating Timeline with Slideshow**
```jsx
<Chrono
  items={items}
  mode="alternating"
  animation={{
    slideshow: {
      enabled: true,
      duration: 3000,
      type: 'fade'
    }
  }}
/>
```

### Advanced Configuration with Grouped API ✨

The new grouped API organizes configuration into logical sections for better discoverability and maintainability:

```jsx
<Chrono
  items={items}
  mode="alternating"

  layout={{
    cardWidth: 450,
    cardHeight: 'auto',  // NEW: Automatic sizing based on content
    responsive: { enabled: true, breakpoint: 768 }
  }}

  content={{
    alignment: {  // NEW: Control content alignment
      horizontal: 'center',
      vertical: 'center'
    }
  }}

  interaction={{
    keyboardNavigation: true,
    pointClick: true,
    autoScroll: true
  }}

  display={{
    borderless: false,
    toolbar: { enabled: true, sticky: true }
  }}

  animation={{
    slideshow: { enabled: true, duration: 4000, type: 'fade' }
  }}

  theme={{
    primary: '#0070f3',
    cardBgColor: '#ffffff',
    cardTitleColor: '#1f2937'
  }}
/>
```

**Quick Start Examples by Use Case:**

```jsx
// Corporate Timeline
<Chrono items={milestones} mode="horizontal" theme={{ primary: '#1a73e8' }} />

// Project Roadmap
<Chrono
  items={tasks}
  mode="vertical"
  display={{ toolbar: { enabled: true, sticky: true } }}
/>

// Photo Timeline with Auto Height
<Chrono
  items={memories}
  mode="alternating"
  layout={{ cardHeight: 'auto' }}  // Cards size automatically to content
  media={{ height: 300, fit: 'cover' }}
/>

// Documentation Timeline
<Chrono
  items={releases}
  mode="vertical"
  content={{ allowHTML: true, readMore: true }}
/>
```

> **🚀 Migration Made Easy**: All existing v2.x props work alongside the new grouped API for seamless upgrades.

## 🎭 Timeline Modes

React Chrono offers four thoughtfully designed layout modes, each optimized for specific content types and user experiences:

### 🔄 **Horizontal Mode - Classic Storytelling**
The traditional timeline experience where users navigate chronologically from left to right. Perfect for historical narratives, project phases, or any sequential story where the journey matters as much as the destinations. Users can smoothly scroll through time or use navigation controls for precise movement.

### 📱 **Vertical Mode - Mobile-First Design** 
A space-efficient, scroll-friendly layout that works beautifully on all devices. Content flows naturally from top to bottom, making it ideal for social media feeds, news timelines, or any scenario where users expect familiar scrolling behavior. Automatically adapts to narrow screens without sacrificing readability.

### ⚖️ **Alternating Mode - Visual Balance**
The most visually striking option, where timeline cards gracefully alternate between left and right sides of a central axis. This symmetric design creates natural visual rhythm, prevents monotony, and maximizes screen real estate utilization. Excellent for portfolios, company milestones, or any content that benefits from balanced presentation.

### 🖥️ **Horizontal All - Dashboard Overview**
Displays all timeline items simultaneously in a comprehensive dashboard view. Users can see the entire timeline at once, making it perfect for project overviews, comparative analysis, or situations where the complete picture is more important than individual item focus.

![Timeline Modes](./readme-assets/horizontal_all.jpg)

---

## 🎯 Essential Props

React Chrono requires minimal configuration to get started:

| Property | Type | Description |
|----------|------|-------------|
| `items` | `TimelineItem[]` | Array of timeline data |
| `mode` | `string` | Layout mode: `'horizontal'` \| `'vertical'` \| `'alternating'` \| `'horizontal-all'` |
| `theme` | `Theme` | Customize colors and appearance |

**📋 Need complete prop documentation?** See our comprehensive [Props Reference](./PROPS-REFERENCE.md)

---

---

## 🎬 Showcase: What React Chrono Can Do

### 📺 Rich Media Integration

Images load intelligently using intersection observers - only when entering the viewport - ensuring fast initial loads even with dozens of high-resolution photos. Videos auto-play when timeline items become active, creating cinematic storytelling experiences. The component handles responsive sizing, buffering states, accessibility attributes, and performance optimization automatically.

### 🎮 Interactive Features

**Slideshow Mode**: Auto-playing presentations with customizable durations, transition effects, and progress indicators - perfect for kiosks and guided storytelling.

**Keyboard Navigation**: Full accessibility with arrow keys for navigation, Home/End for quick jumps to first/last items, and Escape for closing modals. Smooth animations respect user motion preferences.

**Real-time Search**: Instantly highlights matching content across titles, descriptions, and metadata, helping users find specific events without losing context.

### 🎨 Theming & Branding

Adapt to any visual identity with a comprehensive theming system. Dark mode is a first-class feature with dedicated properties for shadows, glows, and interaction states. Google Fonts integration handles loading optimization and fallback strategies automatically, making typography customization effortless.

### 🌍 Complete Internationalization

Customize every piece of user-facing text for any language or locale. The i18n system uses intelligent fallbacks - configure only what you need to change. Template strings support variable interpolation with full type safety.

```jsx
<Chrono
  items={items}
  i18n={{
    texts: {
      navigation: { first: 'Premier élément', next: 'Suivant', previous: 'Précédent' },
      search: { placeholder: 'Rechercher dans la chronologie', noResults: 'Aucun résultat trouvé' }
    }
  }}
/>
```

### 🏗️ Advanced Architecture

**Nested Timelines**: Create multi-level narratives where major events contain detailed sub-timelines - ideal for historical periods, project phases, or biographical chapters.

**Custom Components**: Embed fully interactive React components within timeline cards - data visualizations, interactive maps, widgets, or custom UI elements.

### 📱 Responsive Design

Fundamentally adapts to each device: precision hover states and multi-column layouts on desktop, optimized touch targets on tablets, and content-prioritized interfaces on mobile with smart font sizing and spacing.

---

## 🔄 Migration from v2 to v3

Upgrading is seamless with full backward compatibility:

```jsx
// ✅ Both syntaxes work
<Chrono 
  cardWidth={400}           // Legacy prop
  disableNavOnKey={false}   // Legacy prop
  theme={{ primary: '#blue' }}
/>

// 🚀 New grouped API (recommended)
<Chrono
  layout={{ cardWidth: 400 }}
  interaction={{ keyboardNavigation: true }}
  theme={{ primary: '#blue' }}
/>
```

**🔗 Complete migration guide**: [Props Reference](./PROPS-REFERENCE.md#migration-from-v1)

---

## 🌟 Why React Chrono

### ⚡ **Zero Configuration Required**
Works beautifully out of the box with just `items` prop

### 🎯 **TypeScript Native**
Built with TypeScript for excellent IDE support and type safety

### 📦 **Lightweight & Tree Shakeable**
Optimized bundle size - only import what you use

### 🔧 **Highly Customizable**
From basic theming to complete visual overhauls

### ♿ **Accessibility Built-in**
WCAG AA compliant with comprehensive keyboard navigation

### 🌍 **Complete Internationalization**
Comprehensive i18n support for global applications with 40+ configurable text elements

### 📱 **Mobile First**
Responsive design that adapts to any screen size

---

## 🎬 Live Examples & Playground

### 🎯 CodeSandbox Examples Collection

Explore React Chrono's capabilities with these 6 ready-to-use examples:

1. **Quick Start** - Basic vertical timeline for beginners
   https://codesandbox.io/p/github/prabhuignoto/react-chrono/feat/comprehensive-examples-storybook/codesandbox-examples/01-quick-start

2. **Product Roadmap** - Horizontal timeline with slideshow
   https://codesandbox.io/p/github/prabhuignoto/react-chrono/feat/comprehensive-examples-storybook/codesandbox-examples/02-product-roadmap

3. **Media Gallery** - Alternating layout with images
   https://codesandbox.io/p/github/prabhuignoto/react-chrono/feat/comprehensive-examples-storybook/codesandbox-examples/03-media-gallery

4. **Nested Timeline** - Hierarchical project structure
   https://codesandbox.io/p/github/prabhuignoto/react-chrono/feat/comprehensive-examples-storybook/codesandbox-examples/04-nested-timeline

5. **Dark Portfolio** - Horizontal-all mode with dark theme
   https://codesandbox.io/p/github/prabhuignoto/react-chrono/feat/comprehensive-examples-storybook/codesandbox-examples/05-dark-portfolio

6. **Full Feature Demo** - All v3.0 features showcase
   https://codesandbox.io/p/github/prabhuignoto/react-chrono/feat/comprehensive-examples-storybook/codesandbox-examples/06-full-demo

---

### 🚀 **v3.0 Complete Feature Showcase** ✨ NEW

Experience all the new v3.0 features with our comprehensive CodeSandbox example:

**[🎯 Open v3.0 Feature Showcase →](./codesandbox-example)**

This interactive example demonstrates:
- ✅ **Grouped Configuration API** - All 9 configuration groups in action
- ✅ **Google Fonts Integration** - Per-element font styling with Inter
- ✅ **Comprehensive i18n** - 60+ customizable text elements
- ✅ **Enhanced Dark Mode** - Dynamic theme switching with 36 properties
- ✅ **Sticky Toolbar** - With advanced search configuration
- ✅ **Fullscreen Mode** - Cross-browser support
- ✅ **Rich Media** - Images with lazy loading
- ✅ **HTML Content** - Formatted text with lists

> **📁 Want to create your own?** The complete CodeSandbox example is available in the [`/codesandbox-example`](./codesandbox-example) directory. Simply upload to CodeSandbox or fork our example to customize!

### 📚 **Local Demo Site**
Explore our comprehensive demo site with interactive examples. Run `pnpm run dev` locally to access:
- All timeline layout modes (horizontal, vertical, alternating, horizontal-all)
- Dark mode theming examples
- Google Fonts integration demos
- Internationalization samples
- Media-rich timelines
- Custom content examples
- Nested timeline structures

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/prabhuignoto/react-chrono.git
cd react-chrono

# Install dependencies
pnpm install
```

### Development Commands

```bash
# Start development server with hot reload
pnpm run dev

# Build for production
pnpm run build

# Run unit tests
pnpm test

# Lint and format code
pnpm run clean

```

### Testing Framework

React Chrono uses a comprehensive testing approach:

- **Unit Tests**: Vitest with @testing-library/react

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Checklist

- [ ] Fork the repo and create a feature branch
- [ ] Write tests for new features  
- [ ] Ensure all tests pass: `pnpm run find-bugs`
- [ ] Follow our code style: `pnpm run clean`
- [ ] Update documentation if needed
- [ ] Submit a pull request

---

## 🧱 Built With Modern Technologies

<table>
<tr>
<td width="50%">

**Core Technologies**
- [React 18+](https://reactjs.org/) - Modern React features
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vanilla Extract](https://vanilla-extract.style/) - Zero-runtime CSS-in-JS
- [Day.js](https://day.js.org/) - Date manipulation

</td>
<td width="50%">

**Development Tools**
- [Vite](https://vitejs.dev/) - Fast bundling
- [Vitest](https://vitest.dev/) - Unit testing
- [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/) - Code quality

</td>
</tr>
</table>

---

## 💖 Support the Project

<div align="center">

**Love React Chrono?** Help us grow!

⭐ [Star on GitHub](https://github.com/prabhuignoto/react-chrono) | 🐦 [Follow on Twitter](https://twitter.com/prabhumurthy2) | 🐛 [Report Issues](https://github.com/prabhuignoto/react-chrono/issues)

Made with ❤️ by [Prabhu Murthy](https://github.com/prabhuignoto) and [contributors](https://github.com/prabhuignoto/react-chrono/graphs/contributors)

</div>

---

<div align="center">
  
**[⬆ Back to Top](#react-chrono)**

</div>
