import { TimelineItemModel } from '@models/TimelineItemModel';
import React, { FunctionComponent, useState, useMemo, useCallback } from 'react';
import Chrono from '../../../components';
import { componentContainerTree, componentContainerTreeDesktop, componentContainerTreeBigScreen, componentContainerTreeTablet, componentContainerTreeMobile, vertical } from '../../App.css';

export interface MediaShowcaseVerticalProps {
    type: string;
    items: TimelineItemModel[];
}

export const MediaShowcaseVertical: FunctionComponent<MediaShowcaseVerticalProps> = ({
    type,
    items
}) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [slideshowActive, setSlideshowActive] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Professional Teal & Coral Theme with Dark Mode Support
    const mediaTheme = useMemo(() => ({
        // Base colors - Adaptive for light/dark mode
        cardBgColor: darkMode ? '#1e293b' : '#ffffff',
        cardDetailsBackGround: darkMode ? '#334155' : '#fff',
        cardDetailsColor: darkMode ? '#22d3ee' : '#0891b2',
        cardSubtitleColor: darkMode ? '#94a3b8' : '#64748b',
        cardTitleColor: darkMode ? '#06b6d4' : '#0e7490',

        // Timeline colors - Teal primary, coral secondary
        primary: '#0891b2',
        secondary: '#f97316',
        titleColor: darkMode ? '#e2e8f0' : '#374151',
        titleColorActive: darkMode ? '#22d3ee' : '#0891b2',

        // Media and content
        cardMediaBgColor: darkMode ? '#475569' : '#ecfeff',
        detailsColor: darkMode ? '#cbd5e1' : '#475569',

        // Toolbar - Adaptive backgrounds
        toolbarBgColor: darkMode ? '#0f172a' : '#ffffff',
        toolbarBtnBgColor: darkMode ? '#1e293b' : '#f8fafc',
        toolbarTextColor: darkMode ? '#22d3ee' : '#0891b2',

        // Timeline elements - Teal theme
        iconBackgroundColor: '#0891b2',
        timelineBgColor: darkMode ? '#0f172a' : '#f8fafc',

        // Nested timeline
        nestedCardBgColor: darkMode ? '#475569' : '#fff',
        nestedCardDetailsBackGround: darkMode ? '#64748b' : 'transparent',
        nestedCardDetailsColor: darkMode ? '#67e8f9' : '#0891b2',
        nestedCardSubtitleColor: darkMode ? '#cbd5e1' : '#64748b',
        nestedCardTitleColor: darkMode ? '#22d3ee' : '#0e7490',

        // Enhanced dark mode properties
        iconColor: darkMode ? '#ffffff' : '#0891b2',
        buttonHoverBgColor: darkMode ? '#374151' : '#cffafe',
        buttonActiveBgColor: '#0891b2',
        buttonActiveIconColor: '#ffffff',

        // Borders and effects - Adaptive contrast
        buttonBorderColor: darkMode ? '#475569' : '#e2e8f0',
        buttonHoverBorderColor: darkMode ? '#22d3ee' : '#0891b2',
        buttonActiveBorderColor: '#0e7490',
        shadowColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(8, 145, 178, 0.1)',
        glowColor: darkMode ? 'rgba(34, 211, 238, 0.3)' : 'rgba(8, 145, 178, 0.2)',

        // Search highlighting - Coral accent
        searchHighlightColor: 'rgba(249, 115, 22, 0.4)',

        // Dark mode toggle - Coral accent with proper contrast
        darkToggleActiveBgColor: '#f97316',
        darkToggleActiveIconColor: '#0e7490',
        darkToggleActiveBorderColor: '#ea580c',
        darkToggleGlowColor: 'rgba(249, 115, 22, 0.4)',
    }), [darkMode]);

    const handleItemSelected = useCallback((selected: any) => {
        setSelectedItem(selected);
    }, []);

    const handleSlideshowToggle = useCallback(() => {
        setSlideshowActive(prev => !prev);
    }, []);

    const handleThemeChange = useCallback(() => {
        setDarkMode(prev => !prev);
    }, []);

    // Memoize configuration objects to prevent re-renders
    const layoutConfig = useMemo(() => ({
        cardWidth: 550,
        cardHeight: 350,
        timelineHeight: "80vh" as const,
    }), []);

    const animationConfig = useMemo(() => ({
        slideshow: {
            enabled: slideshowActive,
            duration: 4000,
        },
    }), [slideshowActive]);

    const darkModeConfig = useMemo(() => ({
        enabled: darkMode,
        showToggle: true,
    }), [darkMode]);

    const displayConfig = useMemo(() => ({
        toolbar: {
            enabled: true,
            sticky: true,
        },
    }), []);

    const contentConfig = useMemo(() => ({
        allowHTML: true,
    }), []);

    return (
        <div className={vertical} id="media-showcase-vertical" style={{ backgroundColor: darkMode ? '#0f172a' : '#ffffff' }}>
            <div className={
                type === 'desktop' ? componentContainerTreeDesktop :
                    type === 'big-screen' ? componentContainerTreeBigScreen :
                        type === 'tablet' ? componentContainerTreeTablet :
                            type === 'mobile' ? componentContainerTreeMobile :
                                componentContainerTree
            } style={{ minHeight: '600px', maxHeight: '800px', padding: '20px', overflow: 'hidden' }}>

                <Chrono
                    items={items}
                    mode="alternating"
                    theme={mediaTheme}
                    onItemSelected={handleItemSelected}
                    onThemeChange={handleThemeChange}
                    layout={layoutConfig}
                    animation={animationConfig}
                    darkMode={darkModeConfig}
                    display={displayConfig}
                    content={contentConfig}
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
                            backgroundColor: slideshowActive ? '#ef4444' : '#0891b2',
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
                        Media showcase with images and YouTube videos. Current mode: {darkMode ? 'Dark' : 'Light'}
                    </p>
                </div>
            </div>
        </div>
    );
};
