import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent, useState } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface ComprehensiveVerticalProps {
  type: string;
  items: TimelineItemModel[];
}

export const ComprehensiveVertical: FunctionComponent<ComprehensiveVerticalProps> = ({ 
  type, 
  items 
}) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [slideshowActive, setSlideshowActive] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Complete Blue, Amber, White Theme with Dark Mode Support
  const comprehensiveTheme = {
    // Base colors - Adaptive for light/dark mode
    cardBgColor: darkMode ? '#1e293b' : '#ffffff',
    cardDetailsBackGround: darkMode ? '#334155' : '#fff',
    cardDetailsColor: darkMode ? '#60a5fa' : '#1e40af',
    cardSubtitleColor: darkMode ? '#94a3b8' : '#64748b',
    cardTitleColor: darkMode ? '#3b82f6' : '#1e3a8a',
    
    // Timeline colors - Blue primary, amber secondary
    primary: '#2563eb',
    secondary: '#f59e0b',
    titleColor: darkMode ? '#e2e8f0' : '#374151',
    titleColorActive: darkMode ? '#60a5fa' : '#2563eb',
    
    // Media and content
    cardMediaBgColor: darkMode ? '#475569' : '#eff6ff',
    detailsColor: darkMode ? '#cbd5e1' : '#475569',
    
    // Toolbar - Adaptive backgrounds
    toolbarBgColor: darkMode ? '#0f172a' : '#ffffff',
    toolbarBtnBgColor: darkMode ? '#1e293b' : '#f8fafc',
    toolbarTextColor: darkMode ? '#60a5fa' : '#2563eb',
    
    // Timeline elements - Blue theme
    iconBackgroundColor: '#2563eb',
    timelineBgColor: darkMode ? '#0f172a' : '#f8fafc',
    
    // Nested timeline
    nestedCardBgColor: darkMode ? '#475569' : '#fff',
    nestedCardDetailsBackGround: darkMode ? '#64748b' : 'transparent',
    nestedCardDetailsColor: darkMode ? '#93c5fd' : '#1e40af',
    nestedCardSubtitleColor: darkMode ? '#cbd5e1' : '#64748b',
    nestedCardTitleColor: darkMode ? '#60a5fa' : '#1e3a8a',
    
    // Enhanced dark mode properties - Complete icon theming
    iconColor: darkMode ? '#ffffff' : '#2563eb',
    buttonHoverBgColor: darkMode ? '#374151' : '#dbeafe',
    buttonActiveBgColor: '#2563eb',
    buttonActiveIconColor: '#ffffff',
    
    // Borders and effects - Adaptive contrast
    buttonBorderColor: darkMode ? '#475569' : '#e2e8f0',
    buttonHoverBorderColor: darkMode ? '#60a5fa' : '#2563eb',
    buttonActiveBorderColor: '#1d4ed8',
    shadowColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(37, 99, 235, 0.1)',
    glowColor: darkMode ? 'rgba(96, 165, 250, 0.3)' : 'rgba(37, 99, 235, 0.2)',
    
    // Search highlighting - Amber accent
    searchHighlightColor: 'rgba(245, 158, 11, 0.4)',
    
    // Dark mode toggle - Amber accent with proper contrast
    darkToggleActiveBgColor: '#f59e0b',
    darkToggleActiveIconColor: '#1e3a8a',
    darkToggleActiveBorderColor: '#d97706',
    darkToggleGlowColor: 'rgba(245, 158, 11, 0.4)',
  };

  const handleItemSelected = (selected: any) => {
    setSelectedItem(selected);
  };

  const handleSlideshowToggle = () => {
    setSlideshowActive(!slideshowActive);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={vertical} id="comprehensive-vertical" style={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff' }}>
      <div className={
        type === 'desktop' ? componentContainerTreeDesktop :
        type === 'big-screen' ? componentContainerTreeBigScreen :
        type === 'tablet' ? componentContainerTreeTablet :
        type === 'mobile' ? componentContainerTreeMobile :
        componentContainerTree
      } style={{ minHeight: '600px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>
        {/* Simple header */}
        {/* <div style={{ 
          marginBottom: '20px', 
          padding: '20px',
          backgroundColor: '#2563eb',
          borderRadius: '8px',
          color: 'white',
          textAlign: 'center' as const
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            fontSize: '1.8rem', 
            fontWeight: '600'
          }}>
            Technology Evolution Timeline
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: '0.95rem', 
            opacity: 0.9
          }}>
            Showcasing react-chrono with complete dark mode support - toggle using the moon icon
          </p>
        </div> */}

        {/* Display selected item information */}
        {/* {selectedItem && (
          <div style={{ 
            margin: '20px 0', 
            padding: '20px', 
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '2px solid #2563eb',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '6px',
                height: '40px',
                backgroundColor: '#f59e0b',
                borderRadius: '3px'
              }}></div>
              <div>
                <h3 style={{ 
                  margin: '0 0 6px 0', 
                  color: '#1e3a8a',
                  fontSize: '1.2rem',
                  fontWeight: '600'
                }}>
                  📍 {selectedItem.cardTitle}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#64748b',
                  fontSize: '0.9rem'
                }}>
                  Timeline Position: {selectedItem.index + 1} of {items.length} • Click timeline points to explore milestones
                </p>
              </div>
            </div>
          </div>
        )} */}

        <Chrono
          items={items}
          mode="VERTICAL"
          theme={comprehensiveTheme}
          onItemSelected={handleItemSelected}
          slideShow={slideshowActive}
          slideItemDuration={4000}
          darkMode={darkMode}
          enableDarkToggle={true}
          onThemeChange={handleThemeChange}
          cardHeight={250}
          cardWidth={700}
          stickyToolbar={true}
        />

        {/* Simple controls */}
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          borderRadius: '8px',
          border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
          textAlign: 'center' as const
        }}>
          <button 
            onClick={handleSlideshowToggle}
            style={{
              padding: '10px 20px',
              backgroundColor: slideshowActive ? '#ef4444' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            {slideshowActive ? 'Stop Slideshow' : 'Start Slideshow'}
          </button>
          <p style={{ 
            marginTop: '10px', 
            fontSize: '14px', 
            color: darkMode ? '#94a3b8' : '#64748b'
          }}>
            Complete dark mode theme with adaptive colors. Current mode: {darkMode ? 'Dark' : 'Light'}
          </p>
        </div>
      </div>
    </div>
  );
};