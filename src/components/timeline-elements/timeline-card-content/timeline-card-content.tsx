import { TimelineContentModel } from '@models/TimelineContentModel';
import { MediaState } from '@models/TimelineMediaModel';
import { hexToRGBA } from '@utils/index';
import { shallowEqual, arrayEqual, mediaEqual } from '@utils/comparison';
import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSlideshow } from 'src/components/effects/useSlideshow';
import { useCardSize } from '../../../hooks/useCardSize';
import { useFocusManager } from '../../../hooks/useFocusManager';
import { useTimelineContext } from '../../contexts';
// Remove the Timeline import to break the circular dependency
// import Timeline from '../../timeline/timeline';
import CardMedia from '../timeline-card-media/timeline-card-media';
import { ContentFooter } from './content-footer';
import { ContentHeader } from './content-header';
import { DetailsText } from './details-text';
import { getTextOrContent } from './text-or-content';
import { TimelineItemContentWrapper } from './timeline-card-content.styles';
import { SlideShowType } from '@models/TimelineModel';
import NestedTimelineRenderer from '../nested-timeline-renderer/nested-timeline-renderer';

  // Custom equality function for React.memo to prevent unnecessary re-renders
const arePropsEqual = (
  prevProps: TimelineContentModel,
  nextProps: TimelineContentModel,
): boolean => {
  // Always re-render if active state changes
  if (prevProps.active !== nextProps.active) return false;
    // If detailedText arrays are passed, compare structurally
    if (Array.isArray(prevProps.detailedText) || Array.isArray(nextProps.detailedText)) {
      if (!arrayEqual(prevProps.detailedText as any, nextProps.detailedText as any)) return false;
    }

  // Re-render if slideshow state changes
  if (prevProps.slideShowActive !== nextProps.slideShowActive) return false;

  // Re-render if hasFocus changes
  if (prevProps.hasFocus !== nextProps.hasFocus) return false;

  // Only re-render content-related props if they actually change
  if (prevProps.content !== nextProps.content) return false;
  // For non-array detailedText, compare by reference
  if (!Array.isArray(prevProps.detailedText) && !Array.isArray(nextProps.detailedText)) {
    if (prevProps.detailedText !== nextProps.detailedText) return false;
  }
  if (prevProps.title !== nextProps.title) return false;
  if (prevProps.cardTitle !== nextProps.cardTitle) return false;

  // Efficient media comparison
  if (!mediaEqual(prevProps.media, nextProps.media)) return false;

  // Efficient theme comparison (shallow)
  if (!shallowEqual(prevProps.theme, nextProps.theme)) return false;

  // Efficient items comparison for nested timeline
  if (!arrayEqual(prevProps.items, nextProps.items)) return false;

  // Default to true - don't re-render
  return true;
};

const TimelineCardContent: React.FunctionComponent<TimelineContentModel> =
  React.memo(
    ({
      active,
      content,
      detailedText,
      id,
      media,
      onShowMore,
      slideShowActive,
      onElapsed,
      theme,
      onClick,
      customContent,
      hasFocus,
      flip,
      branchDir,
      url,
      timelineContent,
      items,
      isNested,
      nestedCardHeight,
      title,
      cardTitle,
    }: TimelineContentModel) => {
      const [showMore, setShowMore] = useState(false);
      const detailsRef = useRef<HTMLDivElement | null>(null);
      const progressRef = useRef<HTMLProgressElement | null>(null);
      const isFirstRender = useRef(true);

      // Use improved focus management
      const containerRef = useFocusManager({
        shouldFocus: hasFocus,
        isActive: active,
        preventScroll: true,
        restoreFocus: true,
      });

      const [hasBeenActivated, setHasBeenActivated] = useState(false);
      const [isResuming, setIsResuming] = useState(false);

      // Use unified timeline context
      // Note: theme is passed as a prop to this component, so we don't need it from context
      const {
        mode,
        cardHeight,
        useReadMore,
        cardWidth,
        borderLessCards,
        highlightCardsOnHover,
        textContentDensity,
        textOverlay,
        disableInteraction,
        // Pull previously hard-coded values from context
        slideItemDuration,
        disableAutoScrollOnClick,
        classNames,
        slideShowType,
        showProgressOnSlideshow,
      } = useTimelineContext();

      // Map textContentDensity to textDensity for backward compatibility
      const textDensity = textContentDensity;

      // Values now sourced from context above

      const {
        paused,
        remainInterval,
        startWidth,
        tryPause,
        setupTimer,
        setStartWidth,
      } = useSlideshow(
        progressRef,
        active,
        slideShowActive,
        slideItemDuration,
        id,
        onElapsed,
      );

      const {
        cardActualHeight,
        detailsHeight,
        textContentLarge,
        updateCardSize,
      } = useCardSize({
        containerRef,
        detailsRef,
        setStartWidth,
      });

      // Memoize all calculated values to prevent re-renders
      const canShowProgressBar = useMemo(() => {
        return active && slideShowActive && showProgressOnSlideshow;
      }, [active, slideShowActive, showProgressOnSlideshow]);

      const canShowMore = useMemo(() => {
        return !!detailedText;
      }, [detailedText]);

      const canShowReadMore = useMemo(() => {
        return (
          useReadMore && detailedText && !customContent && textDensity !== 'LOW'
        );
      }, [useReadMore, detailedText, customContent, textDensity]);

      const canShowNestedTimeline = useMemo(() => {
        return items && items.length > 0;
      }, [items]);

      const canShowDetailsText = useMemo(() => {
        // Hide details when using text overlay with media, when density is LOW, otherwise show if content exists
        return (
          (detailedText ?? customContent ?? timelineContent) &&
          !(textOverlay && media) &&
          textDensity !== 'LOW'
        );
      }, [
        detailedText,
        customContent,
        timelineContent,
        textOverlay,
        media,
        textDensity,
      ]);

      // Initialize card size measurements when refs are ready
      useEffect(() => {
        // Use RAF to defer the initial measurement
        const rafId = requestAnimationFrame(() => {
          if (containerRef.current && detailsRef.current) {
            updateCardSize(containerRef.current);
          }
        });

        return () => cancelAnimationFrame(rafId);
      }, [updateCardSize]);

      // Reset details scroll position when toggling details
      useEffect(() => {
        const detailsEle = detailsRef.current;
        if (detailsEle) {
          detailsEle.scrollTop = 0;
        }
      }, [showMore]);

      // Handle card activation
      useEffect(() => {
        if (active && !hasBeenActivated) {
          setHasBeenActivated(true);
        }
      }, [active, hasBeenActivated]);

      // Setup timer when card becomes active
      useEffect(() => {
        if (!slideItemDuration) {
          return;
        }

        if (active && slideShowActive) {
          setupTimer(slideItemDuration);
        }

        // Focus is now handled by useTimelineNavigation hook
        // Only during keyboard navigation, not toolbar navigation

        if (!slideShowActive) {
          setHasBeenActivated(false);
        }
      }, [active, slideShowActive, slideItemDuration, hasFocus, setupTimer]);

      // Focus management is now handled by useFocusManager hook

      // Detect when resuming from pause
      useEffect(() => {
        if (!paused && !isFirstRender.current) {
          setIsResuming(true);
        }
      }, [paused]);

      // Track first render
      useEffect(() => {
        isFirstRender.current = false;

        // Cleanup function
        return () => {
          isFirstRender.current = true;
        };
      }, []);

      // Memoize handler functions
      const handleMediaState = useCallback(
        (state: MediaState) => {
          if (!slideShowActive) {
            return;
          }
          if (state.playing) {
            tryPause();
          } else if (state.paused) {
            if (paused && id && onElapsed) {
              onElapsed(id);
            }
          }
        },
        [slideShowActive, tryPause, paused, id, onElapsed],
      );

      const handleCardClick = useCallback(
        (event: React.MouseEvent) => {
          event.stopPropagation(); // Prevent event bubbling to parent handlers

          // Don't handle clicks if we're in slideshow mode
          if (slideShowActive) return;

          if (onClick && !disableInteraction) {
            // Focus the card first
            if (containerRef.current && !active) {
              containerRef.current.focus({ preventScroll: true });
            }

            // Then trigger the click handler which will handle scrolling
            onClick(id);
          }
        },
        [onClick, id, disableInteraction, slideShowActive, active],
      );

      const toggleShowMore = useCallback(() => {
        if ((active && paused) || !slideShowActive) {
          setShowMore((prev) => !prev);
          onShowMore?.();
          // Use setTimeout to ensure the DOM has updated before focusing
          // Focus immediately without delay
          requestAnimationFrame(() => {
            if (containerRef.current) {
              containerRef.current.focus({ preventScroll: true });
              // Force focus styles to be visible
              containerRef.current.classList.add('focus-visible');
            }
          });
        }
      }, [active, paused, slideShowActive, onShowMore]);

      // Memoize computed values to prevent re-renders
      const triangleDir = useMemo(() => {
        if (mode === 'VERTICAL_ALTERNATING') {
          return flip ? 'right' : 'left';
        }
        return null;
      }, [mode, flip]);

      const gradientColor = useMemo(() => {
        return hexToRGBA(theme?.cardBgColor ?? '#fff', 0.4);
      }, [theme?.cardBgColor]);

      const contentDetailsClass = useMemo(() => {
        return cls(
          'card-description',
          classNames?.cardText ?? '',
          borderLessCards ? 'no-border' : '',
        );
      }, [classNames?.cardText, borderLessCards]);

      // Get the accessible label for the card
      const accessibleLabel = useMemo(() => {
        return (
          (typeof cardTitle === 'string' ? cardTitle : null) ??
          (typeof title === 'string' ? title : null) ??
          'Timeline card'
        );
      }, [cardTitle, title]);

      // Create the detailsText component for text overlay mode using the proper function
      const detailsTextComponent = useMemo(() => {
        // Only create the component if we need it for text overlay mode
        if (textOverlay && (detailedText ?? customContent ?? timelineContent)) {
          return getTextOrContent({
            timelineContent,
            theme,
            detailedText,
            showMore,
          });
        }
        return null;
      }, [
        textOverlay,
        detailedText,
        customContent,
        timelineContent,
        theme,
        showMore,
      ]);

      // The card's minimum height
      const cardMinHeight = useMemo(() => {
        if (textOverlay && media) {
          return cardHeight;
        } else if (!isNested) {
          return cardHeight;
        } else {
          return nestedCardHeight;
        }
      }, [textOverlay, media, isNested, cardHeight, nestedCardHeight]);

      return (
        <TimelineItemContentWrapper
          as="article"
          aria-label={accessibleLabel}
          ref={containerRef}
          onClick={handleCardClick}
          className={`timeline-card-content ${active ? 'active' : ''} ${
            classNames?.card ?? ''
          }`}
          data-testid="timeline-card-content"
          data-item-id={id}
          $active={active}
          $branchDir={branchDir}
          $slideShowActive={slideShowActive}
          $slideShowType={slideShowType as SlideShowType}
          tabIndex={active ? 0 : -1}
          role="article"
          aria-current={active ? 'true' : 'false'}
          onDoubleClick={toggleShowMore}
          $minHeight={cardMinHeight}
          $maxWidth={cardWidth}
          mode={mode}
          $noMedia={!media}
          $textOverlay={textOverlay}
          $isNested={isNested}
          $highlight={highlightCardsOnHover}
          $borderLessCards={borderLessCards}
          $textDensity={textDensity}
          $customContent={!!customContent}
          $theme={theme}
        >
          {/* Only show the content header if we're not using text overlay mode with media */}
          {(!textOverlay || !media) && (
            <ContentHeader
              title={title}
              url={url}
              media={media}
              content={content}
              cardTitle={cardTitle}
              theme={theme}
            />
          )}

          {media && (
            <CardMedia
              active={active}
              cardHeight={cardHeight}
              content={content}
              hideMedia={showMore}
              id={id}
              media={media}
              onMediaStateChange={handleMediaState}
              slideshowActive={slideShowActive}
              theme={theme}
              title={typeof title === 'string' ? title : ''}
              url={url}
              startWidth={startWidth}
              detailsText={detailsTextComponent}
              paused={paused}
              remainInterval={remainInterval}
              showProgressBar={canShowProgressBar}
              triangleDir={triangleDir}
              resuming={isResuming}
              progressRef={progressRef}
            />
          )}

          {canShowDetailsText && (
            <DetailsText
              showMore={showMore}
              gradientColor={gradientColor}
              detailedText={detailedText}
              customContent={customContent}
              timelineContent={timelineContent}
              contentDetailsClass={contentDetailsClass}
              cardActualHeight={cardActualHeight}
              detailsHeight={detailsHeight}
              ref={detailsRef}
            />
          )}

          {canShowNestedTimeline && (
            <NestedTimelineRenderer
              items={items}
              mode={'VERTICAL'}
              nestedCardHeight={nestedCardHeight}
              isChild={true}
            />
          )}

          {canShowReadMore && canShowMore && !textOverlay && (
            <ContentFooter
              onExpand={toggleShowMore}
              triangleDir={triangleDir}
              showMore={showMore}
              textContentIsLarge={textContentLarge}
              showReadMore={canShowReadMore}
              remainInterval={remainInterval}
              startWidth={startWidth}
              canShow={!!detailedText}
              isNested={isNested}
              theme={theme}
            />
          )}
        </TimelineItemContentWrapper>
      );
    },
    arePropsEqual,
  );

export default TimelineCardContent;
