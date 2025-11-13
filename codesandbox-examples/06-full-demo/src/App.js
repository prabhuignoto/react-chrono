import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';
import 'react-chrono/dist/style.css';

/**
 * React Chrono v3.0 - Complete Feature Showcase
 *
 * Comprehensive demonstration of all v3.0 features:
 * - Grouped API design (layout, interaction, content, display, etc.)
 * - Google Fonts with per-element styling
 * - Dark mode with 36 theme properties
 * - Sticky toolbar with search
 * - Fullscreen support
 * - Slideshow animations
 * - i18n customization
 * - Event callbacks
 */

function App() {
  const [isDark, setIsDark] = useState(false);

  const items = [
    {
      title: 'Q1 2024',
      cardTitle: 'v3.0 Launch Announced',
      cardSubtitle: 'Major Redesign',
      cardDetailedText: `
        <p><strong>React Chrono v3.0 development begins!</strong></p>
        <ul>
          <li>Complete TypeScript rewrite</li>
          <li>New grouped API design</li>
          <li>Vanilla Extract CSS migration</li>
          <li>Enhanced accessibility</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
        }
      }
    },
    {
      title: 'Q2 2024',
      cardTitle: 'Core Features Implemented',
      cardSubtitle: 'Development Sprint',
      cardDetailedText: `
        <p><strong>Major architectural improvements delivered.</strong></p>
        <ul>
          <li>Unified context system for state management</li>
          <li>Google Fonts integration complete</li>
          <li>Comprehensive i18n system (60+ texts)</li>
          <li>Performance optimizations</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
        }
      }
    },
    {
      title: 'Q3 2024',
      cardTitle: 'Advanced Features Rollout',
      cardSubtitle: 'Enhancement Phase',
      cardDetailedText: `
        <p><strong>Premium features now available.</strong></p>
        <ul>
          <li>Fullscreen mode with cross-browser support</li>
          <li>Sticky toolbar with sticky search</li>
          <li>Enhanced dark mode (36 theme properties)</li>
          <li>Advanced slideshow animations</li>
          <li>Keyboard navigation improvements</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop'
        }
      }
    },
    {
      title: 'Q4 2024',
      cardTitle: 'Comprehensive Testing',
      cardSubtitle: 'Quality Assurance',
      cardDetailedText: `
        <p><strong>Enterprise-grade quality achieved.</strong></p>
        <ul>
          <li>16+ E2E test suites with Playwright</li>
          <li>Component testing with visual regression</li>
          <li>Cross-browser testing (Chrome, Firefox, Safari)</li>
          <li>WCAG AA accessibility compliance</li>
          <li>Performance benchmarks</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
        }
      }
    },
    {
      title: 'Oct 2024',
      cardTitle: 'Official Release',
      cardSubtitle: 'Production Ready',
      cardDetailedText: `
        <p><strong>React Chrono v3.0 is now available!</strong></p>
        <ul>
          <li>Published to npm with full TypeScript support</li>
          <li>Complete API documentation</li>
          <li>Interactive CodeSandbox examples</li>
          <li>Migration guide for v2 users</li>
          <li>Community feedback integration</li>
        </ul>
      `,
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&h=400&fit=crop'
        }
      }
    }
  ];

  const handleThemeChange = (theme) => {
    console.log('Theme updated:', theme);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎯 React Chrono v3.0 Complete Showcase</h1>
        <p>Explore all features, configurations, and capabilities</p>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="vertical"

          // Layout configuration
          layout={{
            cardWidth: 650,
            cardHeight: 250,
            pointSize: 20,
            lineWidth: 3,
            responsive: {
              enabled: true,
              breakpoint: 768,
            }
          }}

          // Interaction configuration
          interaction={{
            keyboardNavigation: true,
            pointClick: true,
            autoScroll: true,
            focusOnLoad: true,
            cardHover: true,
          }}

          // Content configuration
          content={{
            allowHTML: true,
            readMore: true,
            compactText: false,
          }}

          // Display configuration
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
              }
            },
            scrollable: {
              scrollbar: true,
            }
          }}

          // Media configuration
          media={{
            height: 300,
            align: 'center',
            fit: 'cover',
          }}

          // Animation configuration
          animation={{
            slideshow: {
              enabled: true,
              duration: 5000,
              type: 'fade',
              autoStart: false,
              showProgress: true,
            }
          }}

          // Style configuration
          style={{
            fontSizes: {
              cardTitle: '1.4rem',
              cardSubtitle: '1rem',
              cardText: '0.95rem',
              title: '1.2rem',
            },
            googleFonts: {
              fontFamily: 'Inter',
              weights: [400, 500, 600, 700, 'italic'],
              display: 'swap',
              preconnect: true,
            }
          }}

          // Theme configuration
          theme={{
            primary: isDark ? '#60a5fa' : '#3b82f6',
            secondary: isDark ? '#1e40af' : '#2563eb',
            cardBgColor: isDark ? '#1f2937' : '#ffffff',
            cardForeColor: isDark ? '#f3f4f6' : '#1f2937',
            cardTitleColor: isDark ? '#e5e7eb' : '#1f2937',
            cardSubtitleColor: isDark ? '#9ca3af' : '#6b7280',
            titleColor: isDark ? '#f9fafb' : '#111827',
            titleColorActive: isDark ? '#60a5fa' : '#3b82f6',
            iconColor: isDark ? '#9ca3af' : '#6b7280',
            buttonHoverBgColor: isDark ? '#374151' : '#f3f4f6',
            shadowColor: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
            glowColor: '#3b82f6',
          }}

          // Dark mode configuration
          darkMode={{
            enabled: isDark,
            showToggle: true,
          }}

          // i18n configuration
          i18n={{
            texts: {
              navigation: {
                first: 'First item',
                last: 'Last item',
                next: 'Next',
                previous: 'Previous',
                play: 'Play',
                pause: 'Pause',
              },
              search: {
                placeholder: 'Search timeline...',
                ariaLabel: 'Search',
                clearLabel: 'Clear',
                resultsCount: '{current} of {total}',
                noResults: 'No results',
              },
              theme: {
                darkMode: 'Dark mode',
                lightMode: 'Light mode',
              },
              fullscreen: {
                enterFullscreen: 'Fullscreen',
                exitFullscreen: 'Exit',
              }
            },
            locale: 'en',
          }}

          // Event callbacks
          onItemSelected={(item) => {
            console.log('Item selected:', item);
          }}
          onThemeChange={handleThemeChange}
        />
      </div>

      <footer className="footer">
        <div className="feature-list">
          <h3>🚀 All v3.0 Features Included</h3>
          <div className="features">
            <div className="feature">
              <strong>🎨 Grouped API</strong>
              <p>Layout, interaction, content, display, media, animation, style, theme, darkMode, i18n</p>
            </div>
            <div className="feature">
              <strong>🎭 Google Fonts</strong>
              <p>Per-element font control with multiple weights</p>
            </div>
            <div className="feature">
              <strong>🌐 i18n Support</strong>
              <p>60+ customizable text elements</p>
            </div>
            <div className="feature">
              <strong>🎪 Dark Mode</strong>
              <p>36 theme properties with dynamic switching</p>
            </div>
            <div className="feature">
              <strong>📌 Sticky Toolbar</strong>
              <p>Always-accessible search and controls</p>
            </div>
            <div className="feature">
              <strong>🖼️ Fullscreen</strong>
              <p>Cross-browser fullscreen support</p>
            </div>
          </div>
        </div>

        <div className="instructions">
          <h4>💡 Try These Interactions:</h4>
          <ul>
            <li>🔍 Search for "v3" or "typescript"</li>
            <li>▶️ Click play for auto-slideshow</li>
            <li>🌙 Toggle dark/light mode</li>
            <li>⌨️ Use arrow keys to navigate</li>
            <li>⛶ Enter fullscreen for immersive view</li>
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
        </div>
      </footer>
    </div>
  );
}

export default App;
