import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';
import 'react-chrono/dist/style.css';

/**
 * React Chrono - Dark Portfolio
 *
 * Professional portfolio timeline with dark theme,
 * custom Google Fonts, and horizontal-all mode for full overview.
 */

function App() {
  const [isDark, setIsDark] = useState(true);

  const items = [
    {
      title: '2019',
      cardTitle: 'Started Learning',
      cardSubtitle: 'JavaScript Fundamentals',
      cardDetailedText: 'Began my development journey learning JavaScript basics and web fundamentals. Built my first interactive webpage.'
    },
    {
      title: '2020',
      cardTitle: 'React Mastery',
      cardSubtitle: 'Component-Based Development',
      cardDetailedText: 'Deep dived into React ecosystem. Created multiple projects using hooks, context API, and state management patterns.'
    },
    {
      title: '2021',
      cardTitle: 'Full Stack Dev',
      cardSubtitle: 'Building Complete Apps',
      cardDetailedText: 'Expanded skills to full-stack development. Worked with Node.js, databases, and deployed production applications.'
    },
    {
      title: '2022',
      cardTitle: 'Advanced Styling',
      cardSubtitle: 'CSS & Design Systems',
      cardDetailedText: 'Mastered advanced CSS techniques, Vanilla Extract, and built comprehensive design systems for enterprise applications.'
    },
    {
      title: '2023',
      cardTitle: 'Performance & Testing',
      cardSubtitle: 'Quality Assurance',
      cardDetailedText: 'Focused on performance optimization, automated testing, and accessibility standards. Achieved WCAG AA compliance.'
    },
    {
      title: '2024',
      cardTitle: 'Tech Leadership',
      cardSubtitle: 'Mentoring & Architecture',
      cardDetailedText: 'Leading technical teams, architecting scalable systems, and mentoring junior developers. Building industry-standard libraries.'
    }
  ];

  return (
    <div className={`app ${isDark ? 'dark' : 'light'}`}>
      <header className="header">
        <h1>👨‍💻 Developer Portfolio</h1>
        <p>A journey through technology and growth</p>
        <button
          className="theme-toggle"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="horizontal-all"
          layout={{
            cardWidth: 350,
            cardHeight: 200,
            pointSize: 16
          }}
          display={{
            borderless: true,
            toolbar: {
              enabled: true
            }
          }}
          style={{
            googleFonts: {
              fontFamily: 'Poppins',
              weights: [400, 500, 600, 700],
              display: 'swap'
            }
          }}
          theme={{
            primary: isDark ? '#10b981' : '#059669',
            secondary: isDark ? '#059669' : '#047857',
            cardBgColor: isDark ? '#1f2937' : '#f3f4f6',
            cardForeColor: isDark ? '#e5e7eb' : '#1f2937',
            cardTitleColor: isDark ? '#10b981' : '#059669',
            titleColor: isDark ? '#f3f4f6' : '#1f2937',
            titleColorActive: isDark ? '#10b981' : '#059669'
          }}
          darkMode={{
            enabled: isDark,
            showToggle: false
          }}
        />
      </div>

      <footer className="footer">
        <div className="info">
          <h3>✨ Features Showcased</h3>
          <ul>
            <li>✓ Dark theme enabled by default with manual toggle</li>
            <li>✓ Horizontal-all mode shows all cards at once</li>
            <li>✓ Custom Google Font (Poppins) with multiple weights</li>
            <li>✓ Borderless card design for modern look</li>
            <li>✓ Professional color scheme (emerald/teal)</li>
            <li>✓ Clean typography and visual hierarchy</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
