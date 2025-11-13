import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';
import 'react-chrono/dist/style.css';

/**
 * React Chrono - Product Roadmap
 *
 * A professional product roadmap timeline using horizontal mode.
 * Perfect for showcasing product milestones and releases.
 */

function App() {
  const [playing, setPlaying] = useState(false);

  const items = [
    {
      title: 'Q1 2024',
      cardTitle: 'MVP Launch',
      cardSubtitle: 'Core Features Released',
      cardDetailedText: 'Released the minimum viable product with essential features and user authentication.'
    },
    {
      title: 'Q2 2024',
      cardTitle: 'User Onboarding',
      cardSubtitle: 'Improved UX',
      cardDetailedText: 'Implemented guided onboarding flow and improved user experience based on feedback.'
    },
    {
      title: 'Q3 2024',
      cardTitle: 'Analytics & Reporting',
      cardSubtitle: 'Data Insights',
      cardDetailedText: 'Added comprehensive analytics dashboard with real-time reporting capabilities.'
    },
    {
      title: 'Q4 2024',
      cardTitle: 'Mobile App',
      cardSubtitle: 'Native Experience',
      cardDetailedText: 'Launched iOS and Android native applications with offline support.'
    },
    {
      title: 'Q1 2025',
      cardTitle: 'AI Integration',
      cardSubtitle: 'Upcoming Feature',
      cardDetailedText: 'Planning to integrate AI-powered insights and automation features.'
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>📱 SaaS Product Roadmap</h1>
        <p>Our journey from MVP to enterprise platform</p>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="horizontal"
          layout={{
            cardWidth: 400,
            cardHeight: 220
          }}
          display={{
            borderless: false,
            toolbar: {
              enabled: true,
              sticky: true
            }
          }}
          animation={{
            slideshow: {
              enabled: true,
              duration: 5000,
              autoStart: playing,
              showProgress: true
            }
          }}
          theme={{
            primary: '#06b6d4',
            secondary: '#0891b2',
            cardBgColor: '#ffffff',
            cardForeColor: '#0c4a6e',
            cardTitleColor: '#0c4a6e',
            titleColor: '#0c4a6e'
          }}
          onItemSelected={() => setPlaying(false)}
        />
      </div>

      <footer className="footer">
        <div className="info">
          <h3>💡 Timeline Features</h3>
          <ul>
            <li>✓ Horizontal scrolling view for better overview</li>
            <li>✓ Automatic slideshow with play/pause controls</li>
            <li>✓ Click any milestone to jump to it</li>
            <li>✓ Responsive design for all devices</li>
            <li>✓ Professional color scheme (cyan/slate)</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
