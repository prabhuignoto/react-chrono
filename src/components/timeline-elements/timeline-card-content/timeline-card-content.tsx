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
import { useSlideshow } from '../../effects/useSlideshow';
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
import {
  baseCard,
  itemContentWrapper,
  contentDetailsWrapper,
  showMoreButton,
  chevronIconWrapper,
} from './timeline-card-content.css';
import { nestedTimelineWrapper } from '../../timeline-vertical/timeline-vertical.css';
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
  if (
    Array.isArray(prevProps.detailedText) ||
    Array.isArray(nextProps.detailedText)
  ) {
    if (
      !arrayEqual(prevProps.detailedText as any, nextProps.detailedText as any)
    )
      return false;
  }

  // Re-render if slideshow state changes
  if (prevProps.slideShowActive !== nextProps.slideShowActive) return false;

  // Re-render if hasFocus changes
  if (prevProps.hasFocus !== nextProps.hasFocus) return false;

  // Only re-render content-related props if they actually change
  if (prevProps.content !== nextProps.content) return false;
  // For non-array detailedText, compare by reference
  if (
    !Array.isArray(prevProps.detailedText) &&
    !Array.isArray(nextProps.detailedText)
  ) {
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
      focusable,
    }: TimelineContentModel) => {
      const [showMore, setShowMore] = useState(false);
      const detailsRef = useRef<HTMLDivElement | null>(null);
      const progressRef = useRef<HTMLProgressElement | null>(null);
      const isFirstRender = useRef(true);

      // Use improved focus management
      const containerRef = useFocusManager({
        shouldFocus: !!hasFocus,
        isActive: !!active,
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
        isDarkMode,
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
        progressRef as unknown as React.RefObject<HTMLElement>,
        !!active,
        !!slideShowActive,
        slideItemDuration,
        id || '',
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
        // Show read more functionality when:
        // 1. We have detailed text content
        // 2. The text is large enough to be truncated OR we're already in expanded state
        return !!detailedText && (textContentLarge || showMore);
      }, [detailedText, textContentLarge, showMore]);

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

      // Remeasure card size when textDensity changes
      useEffect(() => {
        // When textDensity changes (e.g., from LOW to HIGH), we need to remeasure
        // the card to update textContentLarge value
        const rafId = requestAnimationFrame(() => {
          if (containerRef.current && detailsRef.current) {
            updateCardSize(containerRef.current);
          }
        });

        return () => cancelAnimationFrame(rafId);
      }, [textDensity, updateCardSize]);

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
            // Pause slideshow when video starts playing
            tryPause();
          } else if (state.paused || state.ended) {
            // Resume slideshow when video is paused or ends
            // Continue to next slide immediately when video is paused/ended
            if (id && onElapsed) {
              onElapsed(id);
            }
          }
        },
        [slideShowActive, tryPause, id, onElapsed],
      );

      const handleCardClick = useCallback(
        (event: React.MouseEvent) => {
          event.stopPropagation(); // Prevent event bubbling to parent handlers

          // Don't handle clicks if we're in slideshow mode or if already active
          if (slideShowActive || active) return;

          if (onClick && !disableInteraction) {
            // Focus the card first
            if (containerRef.current) {
              containerRef.current.focus({ preventScroll: true });
            }

            // Then trigger the click handler which will handle scrolling
            onClick(id || '');

            // For horizontal modes, ensure the timeline point gets focus
            if (mode === 'HORIZONTAL' || mode === 'HORIZONTAL_ALL') {
              requestAnimationFrame(() => {
                const point = document.querySelector(
                  `button[data-testid="timeline-circle"][data-item-id="${id}"]`,
                ) as HTMLButtonElement | null;
                try {
                  point?.focus?.({ preventScroll: true });
                } catch {}
              });
            } else {
              // For vertical modes, focus the row
              requestAnimationFrame(() => {
                const row = document.querySelector(
                  `[data-testid="vertical-item-row"][data-item-id="${id}"]`,
                ) as HTMLElement | null;
                try {
                  row?.focus?.({ preventScroll: true });
                } catch {}
              });
            }
          }
        },
        [onClick, id, disableInteraction, slideShowActive, active, mode],
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
            theme: theme!,
            detailedText: detailedText!,
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
        <section
          aria-label={accessibleLabel}
          ref={containerRef}
          onClick={handleCardClick}
          className={`timeline-card-content ${active ? 'active' : ''} ${classNames?.card ?? ''} ${baseCard} ${itemContentWrapper}`}
          data-testid="timeline-card-content"
          data-item-id={id}
          tabIndex={focusable !== false && active ? 0 : -1}
          role="article"
          aria-current={active ? 'true' : 'false'}
          onDoubleClick={toggleShowMore}
          style={{
            minHeight: customContent ? undefined : cardMinHeight,
            height: customContent ? cardMinHeight : undefined,
            maxWidth: cardWidth ? `${cardWidth}px` : '100%',
          }}
        >
          {/* Only show the content header if we're not using text overlay mode with media */}
          {(!textOverlay || !media) && (
            <ContentHeader
              title={title}
              url={url || ''}
              media={media as any}
              content={content}
              cardTitle={cardTitle}
              theme={theme as any}
            />
          )}

          {media && (
            <CardMedia
              active={!!active}
              cardHeight={cardHeight}
              content={content}
              hideMedia={showMore}
              id={id || ''}
              media={media as any}
              onMediaStateChange={handleMediaState}
              slideshowActive={!!slideShowActive}
              theme={theme as any}
              title={typeof title === 'string' ? title : ''}
              url={url || ''}
              startWidth={startWidth}
              detailsText={detailsTextComponent as any}
              paused={paused}
              remainInterval={remainInterval}
              showProgressBar={!!canShowProgressBar}
              triangleDir={triangleDir || ''}
              resuming={isResuming}
              progressRef={progressRef as any}
            />
          )}

          {canShowDetailsText && (
            <DetailsText
              showMore={showMore}
              gradientColor={gradientColor}
              detailedText={detailedText}
              customContent={customContent}
              timelineContent={timelineContent}
              contentDetailsClass={`${contentDetailsClass} ${contentDetailsWrapper}`}
              cardActualHeight={cardActualHeight}
              detailsHeight={detailsHeight}
              ref={detailsRef}
            />
          )}

          {canShowNestedTimeline && (
            <div className={nestedTimelineWrapper}>
              <NestedTimelineRenderer
                items={items || []}
                mode={'VERTICAL'}
                nestedCardHeight={nestedCardHeight || 0}
                isChild={true}
              />
            </div>
          )}

          {canShowReadMore && canShowMore && (
            <ContentFooter
              onExpand={toggleShowMore}
              triangleDir={triangleDir || ''}
              showMore={showMore}
              textContentIsLarge={textContentLarge}
              showReadMore={canShowReadMore}
              remainInterval={remainInterval}
              startWidth={startWidth}
              canShow={!!detailedText}
              isNested={!!isNested}
              theme={theme as any}
              buttonClassName={showMoreButton}
              iconWrapperClassName={chevronIconWrapper}
            />
          )}
        </section>
      );
    },
    arePropsEqual,
  );

export default TimelineCardContent;
