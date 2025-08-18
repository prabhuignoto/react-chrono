import React, { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { wrapper as veCardWrapper } from '../timeline-horizontal-card.css';
import TimelineCardContent from '../../timeline-card-content/timeline-card-content';

interface TimelineCardPortalProps {
  containerClass: string;
  contentRef: React.RefObject<HTMLDivElement>;
  id: string;
  theme?: any;
  active: boolean;
  disableInteraction: boolean;
  showAllCardsHorizontal: boolean;
  cardWidth?: number;
  cardSubtitle?: string;
  cardTitle?: string;
  url?: string;
  cardDetailedText?: string | string[];
  slideShowRunning?: boolean;
  media?: any;
  onElapsed?: (id: string) => void;
  customContent?: React.ReactNode;
  hasFocus?: boolean;
  onClick?: (id: string) => void;
  timelineContent?: any;
  isNested?: boolean;
  nestedCardHeight?: number;
  items?: any[];
  wrapperId: string;
}

const TimelineCardPortal: React.FC<TimelineCardPortalProps> = ({
  containerClass,
  contentRef,
  id,
  theme,
  active,
  disableInteraction,
  showAllCardsHorizontal,
  cardWidth,
  cardSubtitle,
  cardTitle,
  url,
  cardDetailedText,
  slideShowRunning,
  media,
  onElapsed,
  customContent,
  hasFocus,
  onClick,
  timelineContent,
  isNested,
  nestedCardHeight,
  items,
  wrapperId,
}) => {
  const handleOnShowMore = useCallback(() => {}, []);

  const Content = useMemo(() => {
    return (
      <div
        className={`${containerClass} ${veCardWrapper} ${showAllCardsHorizontal || active ? 'highlight-active' : ''} ${active ? 'active' : ''}`}
        ref={contentRef}
        id={`timeline-card-${id}`}
        tabIndex={active ? 0 : -1}
        style={{
          minWidth:
            cardWidth &&
            (Number.isFinite(cardWidth) ? `${cardWidth}px` : undefined),
          display: active || showAllCardsHorizontal ? 'flex' : 'none',
          margin: showAllCardsHorizontal ? '0 1rem' : '0 auto',
          transform: active ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.3s ease-in-out',
          opacity: active ? 1 : (showAllCardsHorizontal ? 0.7 : 0),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TimelineCardContent
          content={cardSubtitle}
          active={active}
          title={cardTitle}
          {...(url ? { url } : {})}
          detailedText={cardDetailedText}
          onShowMore={handleOnShowMore}
          theme={theme}
          {...(slideShowRunning !== undefined ? { slideShowActive: slideShowRunning } : {})}
          media={media}
          {...(onElapsed ? { onElapsed: (id?: string) => id && onElapsed(id) } : {})}
          id={id}
          customContent={customContent}
          {...(hasFocus !== undefined ? { hasFocus } : {})}
          {...(onClick ? { onClick } : {})}
          {...(timelineContent ? { timelineContent } : {})}
          {...(isNested !== undefined ? { isNested } : {})}
          {...(nestedCardHeight !== undefined ? { nestedCardHeight } : {})}
          {...(items !== undefined ? { items } : {})}
        />
      </div>
    );
  }, [
    containerClass,
    contentRef,
    id,
    active,
    disableInteraction,
    showAllCardsHorizontal,
    cardWidth,
    cardSubtitle,
    cardTitle,
    url,
    cardDetailedText,
    slideShowRunning,
    theme,
    media,
    onElapsed,
    customContent,
    hasFocus,
    onClick,
    timelineContent,
    isNested,
    nestedCardHeight,
    items,
  ]);

  const renderedPortal = useMemo(() => {
    const ele = document.getElementById(wrapperId);
    if (ele) {
      return ReactDOM.createPortal(Content, ele);
    }
    return null;
  }, [Content, wrapperId]);

  return <>{renderedPortal}</>;
};

export default TimelineCardPortal;
