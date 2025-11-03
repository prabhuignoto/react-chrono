# React Chrono v3.0 - API Documentation Index

This comprehensive API documentation provides complete reference material for all props, hooks, features, and customization options available in React Chrono v3.0.

## Documentation Files

### 1. REACT_CHRONO_API_CATALOG.md (947 lines)
**Complete and detailed API reference document**

This is the authoritative source for all API information, containing:

**Sections Included:**
- **1. NEW GROUPED API (TimelinePropsV2)** - Recommended modern API
  - Core Required/Optional Props
  - Layout Configuration (cardWidth, cardHeight, pointSize, etc.)
  - Interaction Configuration (keyboard navigation, clicking, scrolling)
  - Content Configuration (HTML, read more, date format, semantic tags)
  - Display Configuration (borders, shapes, toolbar, scrolling)
  - Media Configuration (height, alignment, fit options)
  - Animation Configuration (slideshow with 3 types: reveal, slide, fade)
  - Style Configuration (custom CSS, fonts, Google Fonts)
  - Accessibility Configuration (button texts, search labels)
  - Internationalization Configuration (60+ text keys)
  - Dark Mode Configuration
  - Event Callbacks (4 callbacks)

- **2. DEPRECATED LEGACY PROPS** - Backward compatible
  - All 28+ deprecated props with direct mappings
  - Grouped by category (layout, interaction, content, display, media, animation, style, accessibility)
  - Automatic migration examples
  - Case and boolean inversions explained

- **3. EXPORTED COMPONENTS**
  - Main Chrono component
  - Prop detection and validation
  - Auto-migration system

- **4. CUSTOM HOOKS** (15+ exported)
  - Core timeline hooks (7 hooks)
  - Utility hooks (8+ hooks)
  - Helper functions and utilities

- **5. TIMELINE MODES** (4 modes)
  - horizontal
  - vertical
  - alternating (default)
  - horizontal-all

- **6. MEDIA SUPPORT**
  - IMAGE type
  - VIDEO type
  - Media alignment options
  - Media fit options
  - Media object structure

- **7. TIMELINE ITEM MODEL**
  - All 13+ properties documented
  - Date handling
  - Nested items
  - Media integration

- **8. THEME CUSTOMIZATION** (35+ properties)
  - Card colors (11 properties)
  - Timeline colors
  - Accent colors
  - Toolbar colors
  - Button states
  - Effects and lighting
  - Dark mode specific colors

- **9. ANIMATION OPTIONS**
  - Slideshow configuration
  - 3 animation types with descriptions
  - Duration and progress options

- **10. ACCESSIBILITY FEATURES**
  - WCAG AA compliance
  - ARIA attributes
  - Keyboard navigation
  - Focus management
  - Screen reader support
  - Reduced motion support

- **11. EXPORTED TYPES**
  - Configuration type exports
  - Timeline item types
  - Hook return types

- **12. CONTEXT SYSTEM**
  - Single unified provider
  - Three logical subscription groups
  - Performance optimization patterns

- **13. BUILD & BUNDLE INFO**
  - Vite configuration
  - Output formats
  - Size limits
  - Browser support

- **14. FEATURE SUMMARY**
  - Feature matrix
  - Support status for each feature

- **15. COMMON PROP COMBINATIONS**
  - 4 real-world examples
  - Professional themes
  - Accessibility patterns

### 2. QUICK_REFERENCE.md (348 lines)
**Fast lookup guide for common tasks and configurations**

This document provides quick access to:

- **Basic Usage Examples** (6 use cases)
  - Simple timeline
  - Dark theme
  - Interactive presentation
  - Accessible timeline
  - Timeline with search
  - Responsive timeline

- **Props by Category** (Cheat sheet format)
  - Layout props
  - Interaction props
  - Content props
  - Display props
  - Media props
  - Animation props
  - Style props
  - Accessibility props
  - Dark mode props

- **Timeline Modes Comparison**
  - Mode descriptions
  - Best use cases for each

- **Media Configuration**
  - IMAGE example
  - VIDEO example

- **Internationalization Examples**
  - Custom button texts
  - Custom search labels

- **Theme Examples**
  - Light theme
  - Dark theme

- **Event Callbacks Reference**
  - All 4 callbacks with usage

- **Timeline Item Structure**
  - TypeScript interface
  - Required vs optional fields

- **Keyboard Shortcuts**
  - All keyboard navigation keys
  - Actions for each key

- **Accessibility Features**
  - WCAG AA compliance
  - Keyboard support
  - ARIA attributes
  - Focus management
  - Screen reader support
  - Motion preferences

- **Available Hooks**
  - Importable hooks list
  - Use cases for each

- **v2.x to v3.0 Migration**
  - Before/after code examples

- **Build & Development Info**
  - Bundle size limits
  - Output formats
  - Commands for testing and building

## Quick Navigation by Topic

### Props and Configuration
- **Grouped Props Structure**: REACT_CHRONO_API_CATALOG.md → Section 1
- **Legacy Props**: REACT_CHRONO_API_CATALOG.md → Section 2
- **Props Cheat Sheet**: QUICK_REFERENCE.md → Props by Category

### Internationalization (i18n)
- **Complete i18n Reference**: REACT_CHRONO_API_CATALOG.md → Section 1 (i18n Configuration)
- **i18n Examples**: QUICK_REFERENCE.md → Internationalization

### Theme and Styling
- **Color Properties**: REACT_CHRONO_API_CATALOG.md → Section 8
- **Google Fonts**: REACT_CHRONO_API_CATALOG.md → Section 1 (Style Configuration)
- **Theme Examples**: QUICK_REFERENCE.md → Theme Colors

### Layout and Modes
- **Timeline Modes**: REACT_CHRONO_API_CATALOG.md → Section 5
- **Layout Configuration**: REACT_CHRONO_API_CATALOG.md → Section 1 (Layout Configuration)
- **Responsive Design**: QUICK_REFERENCE.md → Responsive Timeline Example

### Media Support
- **Media Types**: REACT_CHRONO_API_CATALOG.md → Section 6
- **Media Configuration**: QUICK_REFERENCE.md → Media Configuration
- **Media Properties**: REACT_CHRONO_API_CATALOG.md → Section 1 (Media Configuration)

### Animations
- **Animation Types**: REACT_CHRONO_API_CATALOG.md → Section 9
- **Slideshow Configuration**: REACT_CHRONO_API_CATALOG.md → Section 1 (Animation Configuration)

### Accessibility
- **Complete A11y Guide**: REACT_CHRONO_API_CATALOG.md → Section 10
- **Quick A11y Features**: QUICK_REFERENCE.md → Accessibility Features
- **Keyboard Shortcuts**: QUICK_REFERENCE.md → Common Keyboard Shortcuts

### Development
- **Custom Hooks**: REACT_CHRONO_API_CATALOG.md → Section 4
- **Hook Examples**: QUICK_REFERENCE.md → Hooks Available for Custom Implementations
- **Build System**: REACT_CHRONO_API_CATALOG.md → Section 13
- **Development Commands**: QUICK_REFERENCE.md → Development

### Migration
- **Legacy Prop Mapping**: REACT_CHRONO_API_CATALOG.md → Section 2
- **Migration Examples**: QUICK_REFERENCE.md → Migration from v2.x

## By Usage Pattern

### I want to...

**...create a basic timeline**
→ QUICK_REFERENCE.md → Basic Usage + Simple Timeline Example

**...customize the theme**
→ QUICK_REFERENCE.md → Theme Colors
→ REACT_CHRONO_API_CATALOG.md → Section 1 (theme prop) & Section 8

**...add internationalization**
→ QUICK_REFERENCE.md → Internationalization
→ REACT_CHRONO_API_CATALOG.md → Section 1 (i18n Configuration)

**...make it accessible**
→ QUICK_REFERENCE.md → Accessibility Features
→ REACT_CHRONO_API_CATALOG.md → Section 10

**...add keyboard navigation**
→ QUICK_REFERENCE.md → Common Keyboard Shortcuts
→ REACT_CHRONO_API_CATALOG.md → Section 1 (Interaction Configuration)

**...use animations/slideshow**
→ QUICK_REFERENCE.md → Interactive Presentation Example
→ REACT_CHRONO_API_CATALOG.md → Section 1 (Animation Configuration) & Section 9

**...add media (images/videos)**
→ QUICK_REFERENCE.md → Media Configuration
→ REACT_CHRONO_API_CATALOG.md → Section 1 (Media Configuration) & Section 6

**...migrate from v2.x**
→ QUICK_REFERENCE.md → Migration from v2.x
→ REACT_CHRONO_API_CATALOG.md → Section 2 (Deprecated Props)

**...use custom hooks**
→ QUICK_REFERENCE.md → Hooks Available for Custom Implementations
→ REACT_CHRONO_API_CATALOG.md → Section 4 (Custom Hooks)

**...make responsive**
→ QUICK_REFERENCE.md → Responsive Timeline Example
→ REACT_CHRONO_API_CATALOG.md → Section 1 (Layout Configuration - responsive)

## API Statistics

### Props and Configuration
- Core Props: 6
- Configuration Groups: 8
- Total Configurable Properties: 100+
- Event Callbacks: 4

### Internationalization
- i18n Categories: 11
- i18n Text Keys: 60+
- Template Placeholders: 4

### Customization
- Theme Color Properties: 35+
- Custom Hook Options: 15+
- Timeline Modes: 4
- Media Types: 2
- Animation Types: 3
- Media Fit Options: 5
- Media Alignment Options: 3

### Accessibility
- ARIA Attributes: 7 types
- Keyboard Shortcuts: 7 main keys
- WCAG Compliance: AA (4.5:1)
- Screen Reader Support: Full

## Document Maintenance

**Last Updated**: October 22, 2025
**Version Documented**: React Chrono v3.0.0
**Coverage**: 100% of public API
**Documentation Size**: 1,295 lines

### How to Use These Documents

1. **For Quick Reference**: Start with QUICK_REFERENCE.md for immediate answers
2. **For Complete Details**: Consult REACT_CHRONO_API_CATALOG.md for comprehensive information
3. **For Code Examples**: Check both documents for real-world examples
4. **For Migration**: REACT_CHRONO_API_CATALOG.md Section 2 has complete legacy mappings
5. **For Best Practices**: Review QUICK_REFERENCE.md examples and REACT_CHRONO_API_CATALOG.md architecture section

## Related Documentation

- See CLAUDE.md for project architecture and development guidelines
- See package.json for dependency information and build scripts
- See tsconfig.json for path aliases and TypeScript configuration

---

**Need help?** Refer to the appropriate document section using the navigation guide above.
