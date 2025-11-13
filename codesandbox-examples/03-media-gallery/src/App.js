import React from 'react';
import { Chrono } from 'react-chrono';
import './styles.css';
import 'react-chrono/dist/style.css';

/**
 * React Chrono - Media Gallery
 *
 * Showcasing rich media support with images and YouTube videos
 * using the alternating vertical layout.
 */

function App() {
  const items = [
    {
      title: 'Day 1: Arrival',
      cardTitle: 'Landing in Tokyo',
      cardSubtitle: 'January 2024',
      cardDetailedText: 'Started our amazing journey in the vibrant city of Tokyo with its bustling streets and modern architecture.',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1540959375944-7049f642e9cc?w=800&h=500&fit=crop'
        }
      }
    },
    {
      title: 'Day 3: Temples',
      cardTitle: 'Traditional Culture',
      cardSubtitle: 'Kyoto Experience',
      cardDetailedText: 'Explored ancient temples and experienced traditional Japanese ceremonies in the beautiful city of Kyoto.',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1545226255-61228e4c2315?w=800&h=500&fit=crop'
        }
      }
    },
    {
      title: 'Day 5: Food Tour',
      cardTitle: 'Culinary Adventures',
      cardSubtitle: 'Street Food Discovery',
      cardDetailedText: 'Enjoyed incredible street food and visited local markets. The sushi and ramen were absolutely unforgettable!',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=500&fit=crop'
        }
      }
    },
    {
      title: 'Day 7: Cherry Blossoms',
      cardTitle: 'Spring Beauty',
      cardSubtitle: 'Nature at its Best',
      cardDetailedText: 'Witnessed the stunning cherry blossom season with picnics in serene gardens and peaceful walks.',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1514432324607-2e2be62dba68?w=800&h=500&fit=crop'
        }
      }
    },
    {
      title: 'Day 10: Mountain Views',
      cardTitle: 'Alpine Adventure',
      cardSubtitle: 'Mt. Fuji Experience',
      cardDetailedText: 'Hiked to scenic viewpoints with breathtaking mountain vistas and peaceful nature experiences.',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop'
        }
      }
    }
  ];

  return (
    <div className="app">
      <header className="header">
        <h1>🌍 Travel Memories Timeline</h1>
        <p>Showcasing rich media support with images and stories</p>
      </header>

      <div className="timeline-container">
        <Chrono
          items={items}
          mode="vertical-alternating"
          layout={{
            cardWidth: 500,
            cardHeight: 350,
            pointSize: 16
          }}
          display={{
            toolbar: {
              enabled: true
            }
          }}
          media={{
            height: 250,
            align: 'center',
            fit: 'cover'
          }}
          content={{
            allowHTML: true,
            readMore: true
          }}
          theme={{
            primary: '#ec4899',
            secondary: '#db2777',
            cardBgColor: '#ffffff',
            cardTitleColor: '#1f2937',
            cardSubtitleColor: '#6b7280'
          }}
        />
      </div>

      <footer className="footer">
        <div className="info">
          <h3>🎬 Media Features</h3>
          <p>This example demonstrates:</p>
          <ul>
            <li>✓ Alternating vertical layout for visual balance</li>
            <li>✓ High-quality image display with proper aspect ratios</li>
            <li>✓ YouTube video embedding capabilities</li>
            <li>✓ Read more functionality for detailed descriptions</li>
            <li>✓ Responsive media sizing across devices</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
