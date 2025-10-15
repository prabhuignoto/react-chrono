<div align="center">
  <img src="./readme-assets/social-logo-small.png" alt="React Chrono UI Logo" width="300" />
  <h1>React Chrono</h1>
  <p><strong>The Ultimate Timeline Component for React Applications</strong></p>
  <p>Build stunning, interactive timelines with rich media support, accessibility-first design, and comprehensive customization options</p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-chrono.svg?style=flat-square&color=007ec6)](https://www.npmjs.com/package/react-chrono) [![npm downloads](https://img.shields.io/npm/dm/react-chrono.svg?label=downloads&style=flat-square&color=007ec6)](https://www.npmjs.com/package/react-chrono) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-chrono?style=flat-square&color=007ec6)](https://bundlephobia.com/package/react-chrono) [![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

[![Build Status](https://img.shields.io/azure-devops/build/prabhummurthy/react-chrono/7?style=flat-square&logo=azure-pipelines)](https://dev.azure.com/prabhummurthy/react-chrono/_build/latest?definitionId=7&branchName=master) [![Coverage Status](https://img.shields.io/coveralls/github/prabhuignoto/react-chrono/master?style=flat-square&logo=coveralls)](https://coveralls.io/github/prabhuignoto/react-chrono?branch=master) [![DeepScan grade](https://deepscan.io/api/teams/10074/projects/13644/branches/234929/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10074&pid=13644&bid=234929) [![Codacy Badge](https://img.shields.io/codacy/grade/f2e24a98defd4e4fa7f6f24d86b8dab5?style=flat-square&logo=codacy)](https://www.codacy.com/manual/prabhuignoto/react-chrono) [![Known Vulnerabilities](https://snyk.io/test/github/prabhuignoto/react-chrono/badge.svg?style=flat-square)](https://snyk.io/test/github/prabhuignoto/react-chrono)

[![styled with Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square&logo=prettier)](https://prettier.io/)[![React](https://img.shields.io/badge/React-18+-61dafb?style=flat-square&logo=react)](https://reactjs.org/)

</div>

---

## ✨ Why Choose React Chrono?

React Chrono stands out as the premier timeline component for React, offering unparalleled flexibility and ease of use:

### 🏆 **Transform Your Storytelling**
React Chrono revolutionizes how you present chronological information. Whether you're showcasing company milestones, historical events, project roadmaps, or personal journeys, our timeline component adapts to your narrative needs. With four distinct layout modes, your content flows naturally from traditional horizontal storytelling to space-efficient vertical feeds, balanced alternating presentations, or comprehensive dashboard-style overviews.

### 🎯 **Built for Modern Development**
Experience the perfect balance of power and simplicity. Our new grouped API organizes complex configurations into logical sections, making it intuitive to customize everything from layout dimensions to animation behaviors. Built entirely in TypeScript, React Chrono provides exceptional IDE support with intelligent autocomplete and type checking, while maintaining zero external dependencies for a lean, reliable foundation.

### 🚀 **Enterprise-Grade Reliability**
Trusted by thousands of developers worldwide, React Chrono delivers production-ready performance with intelligent media loading, cross-browser compatibility, and comprehensive accessibility compliance. Our intersection observer-based optimizations ensure smooth performance even with large datasets, while automatic responsive adaptation provides seamless experiences across all devices.

### 🎨 **Limitless Visual Expression**
Break free from generic timeline designs with our comprehensive theming system. From subtle brand color adjustments to complete dark mode transformations, React Chrono's 25+ theme properties give you pixel-perfect control. Integrate Google Fonts effortlessly, customize every visual element, and even embed custom React components to create truly unique timeline experiences that reflect your brand identity.

---

## 📑 Table of Contents

<details>
<summary><strong>Quick Start</strong></summary>

- [What's New in v3.0](#-whats-new-in-v30)
- [Installation](#-installation)
- [Basic Usage](#-basic-usage)
- [Timeline Modes](#-timeline-modes)

</details>

<details>
<summary><strong>API Documentation</strong></summary>

- [Core Props](#-core-props)
- [Configuration Groups](#-configuration-groups)
- [Timeline Item Model](#-timeline-item-model)
- [Migration Guide](#-migration-guide)

</details>

<details>
<summary><strong>Features & Customization</strong></summary>

- [Features Overview](#-features-overview)
- [Media Handling](#-media-handling)
- [Custom Content](#-custom-content)
- [Theming & Styling](#-theming--styling)
- [Accessibility](#-accessibility)

</details>

<details>
<summary><strong>Examples & Development</strong></summary>

- [Live Examples](#-live-examples)
- [Development Setup](#-development-setup)
- [Contributing](#-contributing)

</details>

---

## 🎉 What's New in v3.0

React Chrono v3.0 represents a complete evolution of the timeline component with architectural improvements and powerful new features:

### 🏗️ **Architectural Overhaul**
- **Grouped Configuration API** - Props organized into logical groups (`layout`, `interaction`, `content`, `display`, `media`, `animation`, `style`, `accessibility`, `i18n`) for intuitive configuration and better IDE autocomplete
- **Vanilla Extract Migration** - Complete migration from styled-components to Vanilla Extract for zero-runtime CSS, improved performance, and type-safe styling
- **Unified Context System** - Streamlined from multiple contexts to a single optimized provider, reducing complexity and improving performance

### ✨ **New Features**
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
    cardHeight: 200,
    responsive: { enabled: true, breakpoint: 768 }
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

// Photo Timeline
<Chrono
  items={memories}
  mode="alternating"
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

### 📺 Rich Media Integration That Just Works

React Chrono transforms media-heavy timelines into smooth, engaging experiences. Images load intelligently using intersection observers - only when they're about to enter the viewport, ensuring fast initial page loads even with dozens of high-resolution photos. Videos can auto-play when their timeline item becomes active, creating cinematic storytelling experiences where each moment unfolds naturally.

The component handles all media complexities automatically: responsive image sizing, video buffering states, accessibility attributes, and performance optimization. Whether you're showcasing a product development journey with screenshots, a historical timeline with archival footage, or a personal story with family photos, React Chrono ensures every visual element enhances rather than hinders the user experience.

### 🎮 Interactive Features That Engage Users

**Immersive Slideshow Experience**: Transform your timeline into an auto-playing presentation with customizable durations, transition effects, and progress indicators. Perfect for kiosks, presentations, or guided storytelling where you want to control the narrative pace.

**Universal Keyboard Navigation**: Full keyboard accessibility goes beyond compliance - it creates power-user experiences. Arrow keys for navigation, Home/End for quick jumps, Enter for selections, and Escape for mode exits. Every interaction includes smooth animations that respect user motion preferences.

**Intelligent Real-time Search**: Built-in search functionality instantly highlights matching content across titles, descriptions, and metadata. Users can quickly find specific events in long timelines without losing context of the overall narrative structure.

### 🎨 Theming That Matches Your Brand

React Chrono's theming system adapts to any visual identity. Dark mode isn't just an afterthought - it's a first-class feature with dedicated properties for shadows, glows, hover states, and interaction feedback. Create high-contrast themes for accessibility, subtle branded experiences for corporate sites, or bold artistic expressions for creative portfolios.

Google Fonts integration makes typography customization effortless. Define font families, weights, and sizes for different content types, and React Chrono handles the loading optimization and fallback strategies automatically. Your timeline typography becomes an extension of your brand voice.

### 🌍 Global Reach with Complete Internationalization

**Comprehensive Multi-Language Support**: React Chrono speaks your users' language with complete internationalization coverage. Every piece of user-facing text - from navigation buttons to search placeholders, error messages to accessibility labels - can be customized for any language or locale.

**Smart Text Resolution**: The i18n system uses intelligent fallback strategies. Configure only the texts you need to change, and React Chrono automatically fills in the gaps with sensible defaults. Template strings support variable interpolation, so "Page {current} of {total}" becomes "Página 3 de 10" seamlessly.

**Developer-Friendly Implementation**: No complex setup required. Simply pass your text configurations through the `i18n` prop, and React Chrono handles the rest. The type-safe interface guides you through available text categories, while maintaining full backward compatibility with existing applications.

```jsx
<Chrono
  items={items}
  i18n={{
    texts: {
      navigation: {
        first: 'Premier élément',
        next: 'Suivant',
        previous: 'Précédent'
      },
      search: {
        placeholder: 'Rechercher dans la chronologie',
        noResults: 'Aucun résultat trouvé'
      }
    }
  }}
/>
```

### 🏗️ Advanced Architecture for Complex Content

**Nested Timeline Hierarchies**: Create sophisticated multi-level narratives where major events contain their own detailed sub-timelines. Perfect for historical periods with multiple concurrent storylines, project phases with individual task breakdowns, or biographical timelines with detailed life chapters.

**Custom Component Integration**: Beyond text and media, embed fully interactive React components within timeline cards. Display data visualizations, interactive maps, embedded widgets, or custom UI elements that turn static timeline items into dynamic experiences.

### 📱 Responsive Intelligence Across All Devices

React Chrono doesn't just shrink to fit smaller screens - it fundamentally adapts its interaction model. Desktop users get precision hover states and multi-column layouts. Tablet users experience optimized touch targets and gesture-friendly navigation. Mobile users receive simplified interfaces that prioritize content over chrome, with smart font sizing and spacing adjustments that maintain readability without compromising information density.

---

## 🎨 Use Cases & Examples

### 📈 **Business & Corporate**
- Company milestones and achievements
- Product development roadmaps  
- Project progress tracking
- Employee journey timelines

### 🎓 **Education & History**
- Historical events and periods
- Course curriculum progression
- Student learning paths
- Research timelines

### 👥 **Personal & Lifestyle**
- Life events and memories
- Travel itineraries  
- Career progression
- Achievement showcases

### 💻 **Technical & Development**
- Software release cycles
- Bug tracking and resolution
- Feature implementation progress
- API version history

---

## 🔄 Migration from v1 to v2

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

## 🌟 Why Developers Love React Chrono

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

### 🚀 **Interactive Demo**
Try React Chrono with a live, editable example:

[![Edit react-chrono](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/silly-wilbur-1fcs3?file=%2Fsrc%2FApp.js)

### 📚 **Component Gallery**
Explore our demo site with interactive examples showcasing all timeline modes and features. Run `pnpm run dev` locally to access the full demo experience with:
- All timeline layout modes (horizontal, vertical, alternating, horizontal-all)
- Dark mode theming examples
- Google Fonts integration demos
- Internationalization samples
- Media-rich timelines
- Custom content examples

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