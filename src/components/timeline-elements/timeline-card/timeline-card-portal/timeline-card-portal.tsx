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
        className={`${containerClass} ${veCardWrapper} ${showAllCardsHorizontal || active ? 'highlight-active' : ''}`}
        ref={contentRef}
        id={`timeline-card-${id}`}
        tabIndex={0}
        style={{ minWidth: cardWidth && (Number.isFinite(cardWidth) ? `${cardWidth}px` : undefined) }}
      >
        <TimelineCardContent
          content={cardSubtitle}
          active={active}
          title={cardTitle}
          url={url}
          detailedText={cardDetailedText}
          onShowMore={handleOnShowMore}
          theme={theme}
          slideShowActive={slideShowRunning}
          media={media}
          onElapsed={onElapsed}
          id={id}
          customContent={customContent}
          hasFocus={hasFocus}
          onClick={onClick}
          timelineContent={timelineContent}
          isNested={isNested}
          nestedCardHeight={nestedCardHeight}
          items={items}
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
