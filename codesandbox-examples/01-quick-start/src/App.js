import React from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';
import 'react-chrono/dist/style.css';

/**
 * React Chrono - Quick Start
 *
 * A simple vertical timeline example for beginners.
 * This demonstrates the minimal setup needed to get started.
 */

function App() {
  const items = [
    {
      title: '2020',
      cardTitle: 'Started Learning React',
      cardDetailedText: 'Began my journey with React and discovered how to build interactive UIs with components.'
    },
    {
      title: '2021',
      cardTitle: 'Built First Web App',
      cardDetailedText: 'Created my first production web application using React and learned about state management.'
    },
    {
      title: '2022',
      cardTitle: 'Mastered React Patterns',
      cardDetailedText: 'Deep dive into hooks, context API, and performance optimization techniques.'
    },
    {
      title: '2023',
      cardTitle: 'Advanced React Skills',
      cardDetailedText: 'Became expert in React Chrono library and timeline component design.'
    },
    {
      title: '2024',
      cardTitle: 'Leading React Projects',
      cardDetailedText: 'Now architecting large-scale React applications and mentoring junior developers.'
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 React Chrono - Quick Start</h1>
        <p>Your first timeline in under 5 minutes</p>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="vertical"
          layout={{
            cardWidth: 550,
            cardHeight: 200
          }}
          display={{
            toolbar: {
              enabled: true
            }
          }}
        />
      </div>

      <footer className="footer">
        <p>
          This is the simplest way to create a timeline with React Chrono.
          Just pass an array of items and you're done!
        </p>
        <div className="links">
          <a href="https://github.com/prabhuignoto/react-chrono" target="_blank" rel="noopener noreferrer">
            📖 Learn More
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
