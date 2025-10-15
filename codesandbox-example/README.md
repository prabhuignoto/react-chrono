# React Chrono v3.0 - Complete Feature Showcase

This CodeSandbox demonstrates all the major features and the new grouped API design introduced in React Chrono v3.0.

## 🎯 Featured v3.0 Capabilities

### 🎨 Grouped Configuration API
Props are organized into 9 logical groups for better discoverability:
- **layout** - Sizing, positioning, responsive behavior
- **interaction** - User interactions and navigation
- **content** - Content parsing and display options
- **display** - Visual appearance and UI elements
- **media** - Media content configuration
- **animation** - Slideshow and transitions
- **style** - Custom styling and Google Fonts
- **theme** - Colors and visual theming
- **i18n** - Internationalization support

### 🎭 Google Fonts Integration
Per-element font control with the Inter font family:
- Different weights for title, cardTitle, cardSubtitle, cardText, and controls
- Support for italic styles
- Automatic font loading with preconnect optimization

### 🌐 Comprehensive i18n
60+ customizable text elements across 11 categories:
- Navigation controls
- Search functionality
- Theme toggles
- Accessibility labels
- And more!

### 🎪 Enhanced Dark Mode
Dynamic theme switching with 36 theme properties, including dark mode-specific enhancements:
- Custom shadow and glow colors
- Button hover states
- Search highlighting
- Theme change callbacks

### 📌 Sticky Toolbar
Always-accessible controls with:
- Configurable position (top/bottom)
- Sticky scroll behavior
- Search input with dimension controls

### 🖼️ Fullscreen Mode
Cross-browser fullscreen support with proper keyboard navigation.

## 💡 Interactive Features to Try

1. **Search** - Use the search bar to filter timeline items (try "testing" or "design")
2. **Slideshow** - Click the play button to start auto-advancing through items
3. **Dark Mode** - Toggle between light and dark themes with the theme button
4. **Keyboard Navigation** - Use arrow keys to navigate, Home/End for first/last
5. **Fullscreen** - Enter fullscreen mode for immersive viewing
6. **Timeline Points** - Click on timeline points for direct navigation

## 📚 Learn More

- [GitHub Repository](https://github.com/prabhuignoto/react-chrono)
- [npm Package](https://www.npmjs.com/package/react-chrono)
- [Full Documentation](https://github.com/prabhuignoto/react-chrono#readme)
- [Props Reference](https://github.com/prabhuignoto/react-chrono/blob/master/PROPS-REFERENCE.md)

## 🚀 Getting Started

```bash
npm install react-chrono
```

```jsx
import { Chrono } from 'react-chrono';

<Chrono items={items} mode="vertical" />
```

---

Made with ❤️ using React Chrono v3.0
