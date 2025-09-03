import React from 'react';
import Chrono from '../../components';
import { Theme } from '@models/Theme';

// Modern Minimal Theme
const modernMinimalTheme: Theme = {
  cardBgColor: '#ffffff',
  primary: '#2d3748',
  secondary: '#4a5568',
  titleColor: '#1a202c',
  titleColorActive: '#2b6cb0',
  cardTitleColor: '#2d3748',
  cardSubtitleColor: '#4a5568',
  cardDetailsColor: '#718096',
  iconBackgroundColor: '#edf2f7',
  iconColor: '#4a5568',
  toolbarBgColor: '#f7fafc',
  toolbarBtnBgColor: '#edf2f7',
  toolbarTextColor: '#2d3748',
  buttonHoverBgColor: '#e2e8f0',
  buttonActiveBgColor: '#2b6cb0',
  buttonActiveIconColor: '#ffffff',
  buttonBorderColor: '#e2e8f0',
  buttonHoverBorderColor: '#cbd5e0',
  buttonActiveBorderColor: '#2b6cb0',
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  glowColor: 'rgba(43, 108, 176, 0.2)',
};

// Vibrant Theme
const vibrantTheme: Theme = {
  cardBgColor: '#1a1a2e',
  primary: '#e94560',
  secondary: '#16213e',
  titleColor: '#ffffff',
  titleColorActive: '#e94560',
  cardTitleColor: '#ffffff',
  cardSubtitleColor: '#e94560',
  cardDetailsColor: '#b8b8b8',
  iconBackgroundColor: '#16213e',
  iconColor: '#e94560',
  toolbarBgColor: '#16213e',
  toolbarBtnBgColor: '#1a1a2e',
  toolbarTextColor: '#ffffff',
  buttonHoverBgColor: '#e94560',
  buttonActiveBgColor: '#e94560',
  buttonActiveIconColor: '#ffffff',
  buttonBorderColor: '#e94560',
  buttonHoverBorderColor: '#e94560',
  buttonActiveBorderColor: '#e94560',
  shadowColor: 'rgba(233, 69, 96, 0.3)',
  glowColor: 'rgba(233, 69, 96, 0.4)',
};

// Nature Theme
const natureTheme: Theme = {
  cardBgColor: '#f0f7f4',
  primary: '#2a9d8f',
  secondary: '#264653',
  titleColor: '#264653',
  titleColorActive: '#2a9d8f',
  cardTitleColor: '#264653',
  cardSubtitleColor: '#2a9d8f',
  cardDetailsColor: '#4a4a4a',
  iconBackgroundColor: '#e9f5f3',
  iconColor: '#2a9d8f',
  toolbarBgColor: '#ffffff',
  toolbarBtnBgColor: '#e9f5f3',
  toolbarTextColor: '#264653',
  buttonHoverBgColor: '#e9f5f3',
  buttonActiveBgColor: '#2a9d8f',
  buttonActiveIconColor: '#ffffff',
  buttonBorderColor: '#d1e7e2',
  buttonHoverBorderColor: '#2a9d8f',
  buttonActiveBorderColor: '#2a9d8f',
  shadowColor: 'rgba(42, 157, 143, 0.2)',
  glowColor: 'rgba(42, 157, 143, 0.3)',
};

const timelineItems = [
  {
    title: 'Theme Showcase',
    cardTitle: 'Modern Minimal Theme',
    cardSubtitle: 'Clean and Professional',
    cardDetailedText: 'A modern, minimal theme with subtle colors and clean typography. Perfect for professional applications.',
  },
  {
    title: 'This is a very long timeline title that should demonstrate text truncation behavior in vertical modes',
    cardTitle: 'Bold and Dynamic',
    cardSubtitle: 'High Contrast Design',
    cardDetailedText: 'A vibrant theme with bold colors and high contrast. Great for creative and engaging content.',
  },
  {
    title: 'Nature Theme',
    cardTitle: 'Calm and Organic',
    cardSubtitle: 'Earthy Tones',
    cardDetailedText: 'A nature-inspired theme with calming colors and organic feel. Ideal for environmental or wellness content.',
  },
  {
    title: 'Another extremely long title to test the text overflow and ellipsis functionality in timeline components',
    cardTitle: 'Testing Long Titles',
    cardSubtitle: 'Overflow Handling',
    cardDetailedText: 'This demonstrates how the timeline handles very long titles without breaking the layout or misaligning the trunk.',
  },
];

export const ThemeShowcase: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>Timeline Theme Showcase</h1>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>Modern Minimal Theme</h2>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          A clean, professional theme with subtle colors and modern typography.
        </p>
        <div style={{ height: '400px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <Chrono
            items={timelineItems}
            mode="VERTICAL"
            theme={modernMinimalTheme}
            enableDarkToggle={false}
            disableToolbar={false}
            stickyToolbar={true}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>Vibrant Theme</h2>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          A bold, high-contrast theme perfect for creative content.
        </p>
        <div style={{ height: '400px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <Chrono
            items={timelineItems}
            mode="VERTICAL"
            theme={vibrantTheme}
            enableDarkToggle={false}
            disableToolbar={false}
            stickyToolbar={false}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '1rem' }}>Nature Theme</h2>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          A calming, nature-inspired theme with earthy tones.
        </p>
        <div style={{ height: '400px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <Chrono
            items={timelineItems}
            mode="VERTICAL"
            theme={natureTheme}
            enableDarkToggle={false}
            disableToolbar={false}
            stickyToolbar={true}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#f7fafc', borderRadius: '8px' }}>
        <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>Theme Customization Guide</h3>
        <p style={{ color: '#4a5568', marginBottom: '1rem' }}>
          The timeline component supports extensive theme customization through the following properties:
        </p>
        <ul style={{ color: '#4a5568', listStyle: 'disc', paddingLeft: '1.5rem' }}>
          <li><strong>Primary & Secondary Colors</strong> - Main brand colors for the timeline</li>
          <li><strong>Card Colors</strong> - Background, title, subtitle, and text colors for timeline cards</li>
          <li><strong>Icon Colors</strong> - Colors for timeline icons and their backgrounds</li>
          <li><strong>Toolbar Colors</strong> - Colors for the timeline toolbar and its buttons</li>
          <li><strong>Interactive States</strong> - Colors for hover, active, and focus states</li>
          <li><strong>Effects</strong> - Shadow and glow effects for enhanced visual hierarchy</li>
        </ul>
      </div>
    </div>
  );
}; 