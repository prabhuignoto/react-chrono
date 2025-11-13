import React, { CSSProperties } from 'react';

interface StoryContainerProps {
  children: React.ReactNode;
  minHeight?: string;
  maxHeight?: string;
  background?: string;
  padding?: string;
}

/**
 * Standardized container for Storybook stories
 * Provides consistent sizing, spacing, and overflow handling
 */
export const StoryContainer: React.FC<StoryContainerProps> = ({
  children,
  minHeight = '600px',
  maxHeight = '90vh',
  background,
  padding = '20px',
}) => {
  const style: CSSProperties = {
    minHeight,
    maxHeight,
    padding,
    width: '100%',
    overflow: 'auto',
    boxSizing: 'border-box',
    ...(background && { backgroundColor: background }),
  };

  return <div style={style}>{children}</div>;
};
