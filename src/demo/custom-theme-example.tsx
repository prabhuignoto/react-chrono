import React from 'react';
import Chrono from '../components';

// Example 1: Custom Brand Colors Dark Theme
const brandDarkTheme = {
  // Base colors
  cardBgColor: '#2d3748',
  toolbarBgColor: '#1a202c', 
  toolbarBtnBgColor: '#4a5568',
  toolbarTextColor: '#f7fafc',
  
  // Custom interactive colors
  iconColor: '#63b3ed',             // Bright cyan for icons
  buttonHoverBgColor: '#718096',    // Gray hover
  buttonActiveBgColor: '#ed8936',   // Orange active state
  buttonActiveIconColor: '#1a202c', // Dark icon on orange
  
  // Custom borders and effects
  buttonBorderColor: 'rgba(255, 255, 255, 0.2)',
  buttonHoverBorderColor: '#63b3ed',
  buttonActiveBorderColor: '#ed8936',
  shadowColor: 'rgba(0, 0, 0, 0.6)',
  glowColor: 'rgba(237, 137, 54, 0.4)',
  
  // Custom search and dark toggle
  searchHighlightColor: 'rgba(99, 179, 237, 0.3)',
  darkToggleActiveBgColor: '#2b6cb0',
  darkToggleActiveIconColor: '#f7fafc',
  darkToggleActiveBorderColor: '#63b3ed',
  darkToggleGlowColor: 'rgba(43, 108, 176, 0.5)',
};

// Example 2: High Contrast Dark Theme  
const highContrastDarkTheme = {
  cardBgColor: '#000000',
  toolbarBgColor: '#111111',
  toolbarBtnBgColor: '#333333',
  toolbarTextColor: '#ffffff',
  
  iconColor: '#00ff00',             // Bright green
  buttonHoverBgColor: '#444444',
  buttonActiveBgColor: '#ffff00',   // Bright yellow
  buttonActiveIconColor: '#000000',
  
  buttonBorderColor: 'rgba(255, 255, 255, 0.5)',
  buttonHoverBorderColor: '#00ff00',
  shadowColor: 'rgba(0, 0, 0, 0.8)',
  
  searchHighlightColor: 'rgba(0, 255, 0, 0.5)',
  darkToggleActiveBgColor: '#0066cc',
  darkToggleActiveIconColor: '#ffffff',
};

// Sample timeline data
const timelineItems = [
  {
    title: 'Custom Theme Demo',
    cardTitle: 'Configurable Colors',
    cardSubtitle: 'Brand Integration',
    cardDetailedText: 'This timeline demonstrates the new configurable dark mode properties. All colors can be customized to match your brand or design system.',
  },
  {
    title: 'Theme Properties',
    cardTitle: 'New Capabilities',
    cardSubtitle: 'Full Customization',
    cardDetailedText: 'Icon colors, button states, borders, shadows, and glow effects are all configurable through theme properties.',
  },
  {
    title: 'Accessibility',
    cardTitle: 'WCAG Compliance',
    cardSubtitle: 'Inclusive Design',
    cardDetailedText: 'The default colors maintain WCAG AA compliance. Custom themes should also consider accessibility requirements.',
  },
];

export const CustomThemeExample: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Configurable Dark Mode Theme Examples</h1>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2>Brand Colors Theme</h2>
        <p>Example showing custom brand color integration with cyan/orange palette:</p>
        <div style={{ height: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <Chrono
            items={timelineItems}
            mode="VERTICAL"
            theme={brandDarkTheme}
            enableDarkToggle
            disableToolbar={false}
          />
        </div>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <h2>High Contrast Theme</h2>
        <p>Example showing high contrast colors for accessibility:</p>
        <div style={{ height: '400px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <Chrono
            items={timelineItems}
            mode="VERTICAL"
            theme={highContrastDarkTheme}
            enableDarkToggle
            disableToolbar={false}
          />
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Theme Properties Used:</h3>
        <ul>
          <li><strong>iconColor</strong> - Controls all icon colors for better visibility</li>
          <li><strong>buttonHoverBgColor</strong> - Background color on button hover</li>
          <li><strong>buttonActiveBgColor</strong> - Background for active button states</li>
          <li><strong>buttonBorderColor</strong> - Border colors for enhanced contrast</li>
          <li><strong>shadowColor</strong> - Consistent shadow coloring</li>
          <li><strong>glowColor</strong> - Glow effects for focus states</li>
          <li><strong>searchHighlightColor</strong> - Search result highlighting</li>
          <li><strong>darkToggleActive*</strong> - Specific dark mode toggle styling</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomThemeExample; 