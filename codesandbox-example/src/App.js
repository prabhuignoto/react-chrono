import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';

/**
 * React Chrono v3.0 - Complete Feature Showcase
 *
 * This example demonstrates the new grouped API design and key features:
 * - Grouped configuration (layout, interaction, display, content, etc.)
 * - Google Fonts integration with per-element styling
 * - Comprehensive i18n support
 * - Enhanced dark mode with theme callback
 * - Sticky toolbar with search configuration
 * - Fullscreen mode
 * - Advanced slideshow controls
 */

function App() {
  const [isDark, setIsDark] = useState(false);

  // Sample timeline data with rich content
  const items = [
    {
      title: 'January 2024',
      cardTitle: 'Project Kickoff',
      cardSubtitle: 'Initial Planning Phase',
      cardDetailedText: `
        <p>Launched the ambitious React Chrono v3.0 project with a complete architectural overhaul.</p>
        <ul>
          <li>Migrated to Vanilla Extract for zero-runtime CSS</li>
          <li>Designed new grouped configuration API</li>
          <li>Established comprehensive testing infrastructure</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop'
        },
        name: 'Team planning session'
      }
    },
    {
      title: 'March 2024',
      cardTitle: 'Core Development',
      cardSubtitle: 'Building the Foundation',
      cardDetailedText: `
        <p>Completed major architectural improvements and new feature implementations.</p>
        <ul>
          <li>Implemented unified context system</li>
          <li>Added Google Fonts integration</li>
          <li>Built comprehensive i18n system (60+ text elements)</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
        },
        name: 'Developer coding'
      }
    },
    {
      title: 'June 2024',
      cardTitle: 'Advanced Features',
      cardSubtitle: 'Enhancing User Experience',
      cardDetailedText: `
        <p>Rolled out advanced features to elevate the timeline experience.</p>
        <ul>
          <li>Fullscreen mode with cross-browser support</li>
          <li>Sticky toolbar with configurable positioning</li>
          <li>Enhanced dark mode (36 theme properties)</li>
          <li>Advanced search with dimension controls</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop'
        },
        name: 'UX design session'
      }
    },
    {
      title: 'September 2024',
      cardTitle: 'Testing & Quality',
      cardSubtitle: 'Ensuring Reliability',
      cardDetailedText: `
        <p>Migrated to Playwright and established comprehensive test coverage.</p>
        <ul>
          <li>16+ E2E test suites covering all features</li>
          <li>Component testing with visual regression</li>
          <li>Performance testing and optimization</li>
          <li>Accessibility compliance (WCAG AA)</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
        },
        name: 'Testing setup'
      }
    },
    {
      title: 'October 2024',
      cardTitle: 'Launch & Documentation',
      cardSubtitle: 'Release to the World',
      cardDetailedText: `
        <p>Released React Chrono v3.0 to the world with comprehensive documentation.</p>
        <ul>
          <li>Published to npm with full TypeScript support</li>
          <li>Complete migration guide for v2 users</li>
          <li>Interactive CodeSandbox examples</li>
          <li>Updated demo site with all features</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=400&fit=crop'
        },
        name: 'Product launch'
      }
    }
  ];

  // Handle theme changes
  const handleThemeChange = (theme) => {
    setIsDark(theme.isDark);
    console.log('Theme changed:', theme);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎯 React Chrono v3.0 Showcase</h1>
        <p>
          A complete demonstration of the new grouped API design and advanced features.
          Try the controls below to explore all capabilities!
        </p>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="vertical"

          // ========== LAYOUT CONFIGURATION ==========
          // Control sizing, positioning, and responsive behavior
          layout={{
            cardWidth: 650,
            cardHeight: 250,
            pointSize: 20,
            lineWidth: 3,
            responsive: {
              enabled: true,
              breakpoint: 768,
            },
            positioning: {
              cardPosition: 'top',
            }
          }}

          // ========== INTERACTION CONFIGURATION ==========
          // User interactions and navigation settings
          interaction={{
            keyboardNavigation: true,
            pointClick: true,
            autoScroll: true,
            focusOnLoad: true,
            cardHover: true,
          }}

          // ========== CONTENT CONFIGURATION ==========
          // How content is parsed and displayed
          content={{
            allowHTML: true,
            readMore: true,
            compactText: false,
          }}

          // ========== DISPLAY CONFIGURATION ==========
          // Visual appearance and UI elements
          display={{
            borderless: false,
            pointShape: 'circle',
            toolbar: {
              enabled: true,
              position: 'top',
              sticky: true,
              search: {
                width: '300px',
                maxWidth: '500px',
                inputWidth: '100%',
              }
            },
            scrollable: {
              scrollbar: true,
            }
          }}

          // ========== MEDIA CONFIGURATION ==========
          // Media content settings
          media={{
            height: 300,
            align: 'center',
            fit: 'cover',
          }}

          // ========== ANIMATION CONFIGURATION ==========
          // Slideshow and transitions
          animation={{
            slideshow: {
              enabled: true,
              duration: 4000,
              type: 'fade',
              autoStart: false,
              showProgress: true,
            }
          }}

          // ========== STYLE CONFIGURATION ==========
          // Custom styling and Google Fonts
          style={{
            fontSizes: {
              cardTitle: '1.4rem',
              cardSubtitle: '1rem',
              cardText: '0.95rem',
              title: '1.2rem',
            },
            googleFonts: {
              fontFamily: 'Inter',
              elements: {
                title: {
                  weight: 'bold',
                  style: 'normal',
                  size: '1.3rem'
                },
                cardTitle: {
                  weight: 'semi-bold',
                  style: 'normal',
                  size: '1.4rem'
                },
                cardSubtitle: {
                  weight: 'medium',
                  style: 'italic',
                  size: '1rem'
                },
                cardText: {
                  weight: 'regular',
                  style: 'normal',
                  size: '0.95rem'
                },
                controls: {
                  weight: 'medium',
                  style: 'normal',
                }
              },
              weights: [400, 500, 600, 700, 'italic'],
              display: 'swap',
              preconnect: true,
            }
          }}

          // ========== THEME CONFIGURATION ==========
          // Colors and visual styling
          theme={{
            primary: isDark ? '#60a5fa' : '#3b82f6',
            secondary: isDark ? '#1e40af' : '#2563eb',
            cardBgColor: isDark ? '#1f2937' : '#ffffff',
            cardForeColor: isDark ? '#f3f4f6' : '#1f2937',
            cardDetailsColor: isDark ? '#d1d5db' : '#4b5563',
            titleColor: isDark ? '#f9fafb' : '#111827',
            titleColorActive: isDark ? '#60a5fa' : '#3b82f6',
            cardTitleColor: isDark ? '#e5e7eb' : '#1f2937',
            cardSubtitleColor: isDark ? '#9ca3af' : '#6b7280',
            iconColor: isDark ? '#9ca3af' : '#6b7280',
            buttonHoverBgColor: isDark ? '#374151' : '#f3f4f6',
            shadowColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
            glowColor: '#3b82f6',
            toolbarBgColor: isDark ? '#111827' : '#f9fafb',
            toolbarTextColor: isDark ? '#f3f4f6' : '#1f2937',
          }}

          // ========== DARK MODE CONFIGURATION ==========
          // Dark mode settings and theme toggle
          darkMode={{
            enabled: isDark,
            showToggle: true,
          }}

          // ========== I18N CONFIGURATION ==========
          // Internationalization with custom text
          i18n={{
            texts: {
              navigation: {
                first: 'Go to first item',
                last: 'Go to last item',
                next: 'Next item',
                previous: 'Previous item',
                play: 'Start slideshow',
                pause: 'Pause slideshow',
              },
              search: {
                placeholder: 'Search timeline...',
                ariaLabel: 'Search timeline content',
                clearLabel: 'Clear search',
                resultsCount: '{current} of {total}',
                noResults: 'No results found',
              },
              theme: {
                darkMode: 'Switch to dark mode',
                lightMode: 'Switch to light mode',
              },
              fullscreen: {
                enterFullscreen: 'Enter fullscreen mode',
                exitFullscreen: 'Exit fullscreen mode',
              },
              accessibility: {
                timelineNavigation: 'Timeline Navigation',
                timelineItem: 'Timeline Item',
                activeItem: 'Active Timeline Item',
                itemPosition: 'Item {current} of {total}',
              }
            },
            locale: 'en',
            direction: 'ltr',
          }}

          // ========== EVENT CALLBACKS ==========
          onItemSelected={(item) => {
            console.log('Selected item:', item);
          }}
          onThemeChange={handleThemeChange}
        />
      </div>

      <footer className="footer">
        <div className="feature-list">
          <h3>🚀 Featured v3.0 Capabilities</h3>
          <div className="features">
            <div className="feature">
              <strong>🎨 Grouped API</strong>
              <p>Organized configuration for better discoverability</p>
            </div>
            <div className="feature">
              <strong>🎭 Google Fonts</strong>
              <p>Per-element font control with Inter font family</p>
            </div>
            <div className="feature">
              <strong>🌐 i18n Support</strong>
              <p>60+ customizable text elements</p>
            </div>
            <div className="feature">
              <strong>🎪 Enhanced Dark Mode</strong>
              <p>36 theme properties with dynamic switching</p>
            </div>
            <div className="feature">
              <strong>📌 Sticky Toolbar</strong>
              <p>Always-accessible controls with search</p>
            </div>
            <div className="feature">
              <strong>🖼️ Fullscreen Mode</strong>
              <p>Cross-browser fullscreen support</p>
            </div>
          </div>
        </div>

        <div className="instructions">
          <h4>💡 Try These Interactions:</h4>
          <ul>
            <li>🔍 Use the search bar to find "testing" or "design"</li>
            <li>▶️ Click play to start the automatic slideshow</li>
            <li>🌙 Toggle dark mode with the theme button</li>
            <li>⌨️ Use arrow keys to navigate between items</li>
            <li>⛶ Enter fullscreen mode for immersive viewing</li>
            <li>🖱️ Click timeline points for direct navigation</li>
          </ul>
        </div>

        <div className="links">
          <a href="https://github.com/prabhuignoto/react-chrono" target="_blank" rel="noopener noreferrer">
            ⭐ Star on GitHub
          </a>
          <a href="https://www.npmjs.com/package/react-chrono" target="_blank" rel="noopener noreferrer">
            📦 View on npm
          </a>
          <a href="https://github.com/prabhuignoto/react-chrono#readme" target="_blank" rel="noopener noreferrer">
            📖 Documentation
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
