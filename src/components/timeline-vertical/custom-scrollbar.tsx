import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

interface CustomScrollbarProps {
  containerRef: React.RefObject<HTMLElement>;
  totalHeight: number; // This is the total scrollable height
  visibleHeight: number; // This is the viewport height
  scrollTop: number;
  onScroll: (scrollTop: number) => void;
  theme?: any;
}

const ScrollbarContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: visible;
  z-index: 10000;
  opacity: 1;
  transition: opacity 0.2s;
  pointer-events: auto;

  &:hover,
  &:active {
    opacity: 1;
    background: rgba(0, 0, 0, 0.08);
  }
`;

const ScrollbarThumb = styled.div<{ $isDragging?: boolean }>`
  position: absolute;
  width: 8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background: ${(props) => props.theme?.primary || '#007bff'};
  border-radius: 4px;
  cursor: pointer;
  transition:
    opacity 0.2s,
    background-color 0.2s;
  opacity: ${(props) => (props.$isDragging ? 1 : 0.9)};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    opacity: 1;
  }
`;

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({
  containerRef,
  totalHeight,
  visibleHeight: passedVisibleHeight,
  scrollTop,
  onScroll,
  theme,
}) => {
  // Store our own measurement of the scrollbar container height
  const [scrollbarHeight, setScrollbarHeight] = useState(passedVisibleHeight);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startScrollTop, setStartScrollTop] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  const scrollbarContainerRef = useRef<HTMLDivElement>(null);

  // Get the real dimensions after the component mounts
  useLayoutEffect(() => {
    const updateHeight = () => {
      if (scrollbarContainerRef.current) {
        // Get parent element height if available
        const parent = scrollbarContainerRef.current.parentElement;
        const parentHeight = parent ? parent.clientHeight : 0;

        // Use parent height if non-zero, otherwise use passed height
        let newHeight = parentHeight > 10 ? parentHeight : passedVisibleHeight;

        if (newHeight !== scrollbarHeight) {
          setScrollbarHeight(newHeight);
          console.log('Updated scrollbar height:', {
            newHeight,
            parentHeight,
            passedHeight: passedVisibleHeight,
          });
        }
      }
    };

    // Run once on mount
    updateHeight();

    // And again after a delay to ensure DOM is fully rendered
    setTimeout(updateHeight, 100);
    setTimeout(updateHeight, 500);

    // Add resize listener
    window.addEventListener('resize', updateHeight);

    return () => window.removeEventListener('resize', updateHeight);
  }, [scrollbarHeight, passedVisibleHeight]);

  // The actual visible height to use in calculations
  const visibleHeight = Math.max(scrollbarHeight, passedVisibleHeight);

  // Get the content visible ratio (how much of the content is visible at once)
  const visibleRatio = Math.min(visibleHeight / Math.max(totalHeight, 1), 1);

  // Calculate thumb height based on visible ratio
  // Min 20px for usability, max 90% of scrollbar height
  const thumbHeight = Math.max(
    20,
    Math.min(visibleHeight * visibleRatio, visibleHeight * 0.9),
  );

  // Calculate maximum scroll range
  const maxScroll = Math.max(0, totalHeight - visibleHeight);

  // Calculate max range the thumb can move
  const maxThumbTravel = Math.max(0, visibleHeight - thumbHeight);

  // Calculate the thumb position proportional to scroll position
  const thumbPosition =
    maxScroll > 0 ? (scrollTop / maxScroll) * maxThumbTravel : 0;

  // Handle mouse down on thumb
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setStartScrollTop(scrollTop);
    e.preventDefault();
    e.stopPropagation();
    // Add a class to the body to prevent text selection during drag
    document.body.classList.add('scrollbar-dragging');
  };

  // Handle mouse move for dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = e.clientY - startY;

      // Use a more direct calculation based on the ratio of thumb travel to content travel
      const scrollDistancePerPixel = maxScroll / maxThumbTravel;
      const newScrollTop = startScrollTop + deltaY * scrollDistancePerPixel;

      // Clamp the scroll position to valid bounds
      const boundedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
      onScroll(boundedScrollTop);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.classList.remove('scrollbar-dragging');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('scrollbar-dragging');
    };
  }, [isDragging, startY, startScrollTop, maxScroll, maxThumbTravel, onScroll]);

  // Handle click on scrollbar track
  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target === thumbRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;

    // Account for the thumb's height in the calculation
    // This centers the thumb on the click position
    const adjustedClickY = Math.max(
      0,
      Math.min(clickY - thumbHeight / 2, maxThumbTravel),
    );

    // Convert the adjusted click position to a scroll position
    const scrollDistancePerPixel = maxScroll / maxThumbTravel;
    const newScrollTop = adjustedClickY * scrollDistancePerPixel;

    onScroll(Math.max(0, Math.min(newScrollTop, maxScroll)));
  };

  // Add enhanced debugging
  useEffect(() => {
    console.log('Scrollbar Debug:', {
      totalHeight,
      passedVisibleHeight,
      measuredScrollbarHeight: scrollbarHeight,
      finalVisibleHeight: visibleHeight,
      scrollTop,
      maxScroll,
      visibleRatio,
      thumbHeight,
      maxThumbTravel,
      thumbPosition,
      containerBounds:
        scrollbarContainerRef.current?.getBoundingClientRect() || null,
      parentBounds:
        scrollbarContainerRef.current?.parentElement?.getBoundingClientRect() ||
        null,
    });
  }, [
    totalHeight,
    passedVisibleHeight,
    scrollbarHeight,
    visibleHeight,
    scrollTop,
    visibleRatio,
    thumbHeight,
    maxThumbTravel,
    thumbPosition,
  ]);

  // Don't render if no scroll needed
  if (maxScroll <= 0) {
    console.log('Scrollbar not needed', { totalHeight, visibleHeight });
    return null;
  }

  return (
    <ScrollbarContainer
      ref={scrollbarContainerRef}
      onClick={handleTrackClick}
      className="custom-scrollbar"
    >
      <ScrollbarThumb
        ref={thumbRef}
        $isDragging={isDragging}
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbPosition}px)`,
        }}
        onMouseDown={handleMouseDown}
        className="custom-scrollbar-thumb"
      />
    </ScrollbarContainer>
  );
};

export default CustomScrollbar;
