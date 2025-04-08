import { TimelineContentModel } from '@models/TimelineContentModel';
import { MediaState } from '@models/TimelineMediaModel';
import { hexToRGBA } from '@utils/index';
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
import { GlobalContext } from '../../GlobalContext';
import Timeline from '../../timeline/timeline';
import CardMedia from '../timeline-card-media/timeline-card-media';
import { ContentFooter } from './content-footer';
import { ContentHeader } from './content-header';
import { DetailsText } from './details-text';
import { getTextOrContent } from './text-or-content';
import { TimelineItemContentWrapper } from './timeline-card-content.styles';

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
      const containerRef = useRef<HTMLDivElement | null>(null);
      const progressRef = useRef<HTMLProgressElement | null>(null);
      const isFirstRender = useRef(true);

      const [hasBeenActivated, setHasBeenActivated] = useState(false);
      const [isResuming, setIsResuming] = useState(false);

      const {
        mode,
        cardHeight,
        slideItemDuration = 2000,
        useReadMore,
        cardWidth,
        borderLessCards,
        disableAutoScrollOnClick,
        classNames,
        textOverlay,
        slideShowType,
        showProgressOnSlideshow,
        disableInteraction,
        highlightCardsOnHover,
        textDensity,
      } = useContext(GlobalContext);

      const {
        paused,
        remainInterval,
        startWidth,
        tryPause,
        tryResume,
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

      const canShowProgressBar = useMemo(() => {
        return active && slideShowActive && showProgressOnSlideshow;
      }, [active, slideShowActive]);

      const canShowMore = useMemo(() => {
        return !!detailedText;
      }, [detailedText]);

      useEffect(() => {
        const detailsEle = detailsRef.current;

        if (detailsEle) {
          detailsEle.scrollTop = 0;
        }
      }, [showMore]);

      useEffect(() => {
        if (active) {
          setHasBeenActivated(true);
        }
      }, [active]);

      useEffect(() => {
        if (!slideItemDuration) {
          return;
        }
        if (active && slideShowActive) {
          setupTimer(slideItemDuration);
        }

        if (active && hasFocus) {
          containerRef.current && containerRef.current.focus();
        }

        if (!slideShowActive) {
          setHasBeenActivated(false);
        }
      }, [active, slideShowActive]);

      useEffect(() => {
        if (hasFocus && active) {
          containerRef.current && containerRef.current.focus();
        }
      }, [hasFocus, active]);

      useEffect(() => {
        if (!paused && !isFirstRender.current) {
          setIsResuming(true);
        }
      }, [paused, startWidth]);

      useEffect(() => {
        isFirstRender.current = false;
      }, []);

      const canShowReadMore = useMemo(() => {
        return (
          useReadMore &&
          detailedText &&
          !customContent &&
          textDensity === 'HIGH'
        );
      }, [textDensity]);

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
        [paused, slideShowActive],
      );

      const contentClass = useMemo(
        () =>
          cls(
            active ? 'timeline-card-content active' : 'timeline-card-content ',
            classNames?.card,
          ),
        [active],
      );

      const contentDetailsClass = useMemo(
        () =>
          cls(
            !showMore && !customContent && useReadMore
              ? 'show-less card-description'
              : 'card-description',
            classNames?.cardText,
          ),
        [showMore, customContent],
      );

      const cardMinHeight = useMemo(() => {
        if (textOverlay && media) {
          return cardHeight;
        } else if (!isNested) {
          return cardHeight;
        } else {
          return nestedCardHeight;
        }
      }, []);

      const handleExpandDetails = useCallback(() => {
        if ((active && paused) || !slideShowActive) {
          setShowMore(!showMore);
          onShowMore();
        }
      }, [active, paused, slideShowActive, showMore]);

      const triangleDir = useMemo(() => {
        if (flip) {
          if (branchDir === 'right') {
            return 'left';
          } else {
            return 'right';
          }
        }
        return branchDir;
      }, [branchDir, flip]);

      const gradientColor = useMemo(() => {
        const bgToUse = !isNested
          ? theme?.cardBgColor
          : theme?.nestedCardDetailsBackGround;
        return !showMore && textContentLarge
          ? hexToRGBA(bgToUse || '#ffffff', 0.8)
          : null;
      }, [textContentLarge, showMore, theme?.cardDetailsBackGround, isNested]);

      const canShowDetailsText = useMemo(() => {
        return !textOverlay && !items?.length && textDensity === 'HIGH';
      }, [items?.length, textDensity]);

      const TextOrContent = useMemo(() => {
        return getTextOrContent({
          detailedText,
          showMore,
          theme,
          timelineContent,
        });
      }, [showMore, timelineContent, theme, detailedText]);

      const handlers = useMemo(() => {
        if (!isNested && !disableInteraction) {
          return {
            onPointerDown: (ev: React.PointerEvent) => {
              ev.stopPropagation();
              if (
                !slideShowActive &&
                onClick &&
                id &&
                !disableAutoScrollOnClick
              ) {
                onClick(id);
              }
            },
            onPointerEnter: tryPause,
            onPointerLeave: tryResume,
          };
        }
      }, []);

      const canShowNestedTimeline = useMemo(() => {
        return !canShowDetailsText && textDensity === 'HIGH';
      }, [canShowDetailsText, textDensity]);

      return (
        <TimelineItemContentWrapper
          className={contentClass}
          $minHeight={cardMinHeight}
          $maxWidth={cardWidth}
          mode={mode}
          $noMedia={!media}
          {...handlers}
          ref={updateCardSize}
          tabIndex={!isNested ? 0 : -1}
          theme={theme}
          $borderLessCards={borderLessCards}
          $textOverlay={textOverlay}
          $active={hasBeenActivated}
          $slideShowType={slideShowType}
          $slideShowActive={slideShowActive}
          $branchDir={branchDir}
          $isNested={isNested}
          $highlight={highlightCardsOnHover}
          data-testid="timeline-card-content"
          $customContent={!!customContent}
          $textDensity={textDensity}
        >
          {title && !textOverlay ? (
            <ContentHeader
              title={title}
              theme={theme}
              url={url}
              media={media}
              content={content}
              cardTitle={cardTitle}
            />
          ) : null}

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
              title={title}
              url={url}
              startWidth={startWidth}
              detailsText={TextOrContent}
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
            <Timeline
              items={items}
              mode={'VERTICAL'}
              nestedCardHeight={nestedCardHeight}
              isChild
            />
          )}

          {(!textOverlay || !media) && (
            <ContentFooter
              theme={theme}
              progressRef={progressRef}
              startWidth={startWidth}
              textContentIsLarge={textContentLarge}
              remainInterval={remainInterval}
              paused={paused}
              triangleDir={triangleDir}
              showProgressBar={canShowProgressBar}
              showReadMore={canShowReadMore}
              onExpand={handleExpandDetails}
              canShow={canShowMore}
              showMore={showMore}
              isNested={isNested}
              isResuming={isResuming}
            />
          )}
        </TimelineItemContentWrapper>
      );
    },
  );

TimelineCardContent.displayName = 'TimelineCardContent';

export default TimelineCardContent;
