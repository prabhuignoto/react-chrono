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

import DemoPageLayout from './DemoPageLayout';

const codeExample = `import { Chrono } from 'react-chrono';

// Define your custom theme
const customTheme = {
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
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  glowColor: 'rgba(43, 108, 176, 0.2)',
};

function ThemedTimeline() {
  return (
    <Chrono
      items={items}
      mode="VERTICAL"
      theme={customTheme}
      enableDarkToggle={false}
      disableToolbar={false}
    />
  );
}`;

export const ThemeShowcase: React.FC = () => {
  return (
    <DemoPageLayout
      title="Theme Showcase Gallery"
      description="Explore the powerful theming capabilities of React Chrono. From minimal professional designs to vibrant creative themes, customize every aspect of your timeline's appearance to match your brand and content."
      features={[
        'Custom Color Schemes',
        'Complete Theme Control',
        'Dark Mode Support',
        'Professional Templates',
        'Brand Integration',
        'Accessibility Compliant'
      ]}
      codeExample={codeExample}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Modern Minimal Theme */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Modern Minimal</h3>
              <p className="text-sm text-gray-600 mt-1">Clean and professional</p>
            </div>
            <div style={{ minHeight: '300px', maxHeight: '400px', padding: '10px', overflow: 'hidden' }}>
              <Chrono
                items={timelineItems}
                mode="VERTICAL"
                theme={modernMinimalTheme}
                enableDarkToggle={false}
                disableToolbar={true}
              />
            </div>
          </div>

          {/* Vibrant Theme */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Vibrant Dark</h3>
              <p className="text-sm text-gray-600 mt-1">Bold and dynamic</p>
            </div>
            <div style={{ minHeight: '300px', maxHeight: '400px', padding: '10px', backgroundColor: '#1a1a2e', overflow: 'hidden' }}>
              <Chrono
                items={timelineItems}
                mode="VERTICAL"
                theme={vibrantTheme}
                enableDarkToggle={false}
                disableToolbar={true}
              />
            </div>
          </div>

          {/* Nature Theme */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h3 className="font-semibold text-gray-900">Nature Inspired</h3>
              <p className="text-sm text-gray-600 mt-1">Calm and organic</p>
            </div>
            <div style={{ minHeight: '300px', maxHeight: '400px', padding: '10px', overflow: 'hidden' }}>
              <Chrono
                items={timelineItems}
                mode="VERTICAL"
                theme={natureTheme}
                enableDarkToggle={false}
                disableToolbar={true}
              />
            </div>
          </div>
        </div>

        {/* Interactive Full-Size Demo */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900">Interactive Theme Demo</h3>
            <p className="text-sm text-gray-600 mt-1">
              Full-featured timeline with the Modern Minimal theme - try the controls and interactions
            </p>
          </div>
          <div style={{ minHeight: '500px', maxHeight: '700px', padding: '20px', overflow: 'hidden' }}>
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

        {/* Theme Properties Reference */}
        <div className="bg-gradient-to-r from-electric-50 to-electric-100 rounded-lg p-6 border border-electric-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Property Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Core Colors</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">primary</code> - Main brand color</li>
                <li><code className="bg-gray-100 px-1 rounded">secondary</code> - Accent color</li>
                <li><code className="bg-gray-100 px-1 rounded">cardBgColor</code> - Card background</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Typography</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">titleColor</code> - Timeline titles</li>
                <li><code className="bg-gray-100 px-1 rounded">cardTitleColor</code> - Card titles</li>
                <li><code className="bg-gray-100 px-1 rounded">cardDetailsColor</code> - Body text</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Interactive</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><code className="bg-gray-100 px-1 rounded">iconColor</code> - Timeline icons</li>
                <li><code className="bg-gray-100 px-1 rounded">shadowColor</code> - Drop shadows</li>
                <li><code className="bg-gray-100 px-1 rounded">glowColor</code> - Hover effects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DemoPageLayout>
  );
}; 