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
import { GlobalContext } from '../../GlobalContext';
import Timeline from '../../timeline/timeline';
import CardMedia from '../timeline-card-media/timeline-card-media';
import { ContentFooter } from './content-footer';
import { ContentHeader } from './content-header';
import { TimelineItemContentWrapper } from './timeline-card-content.styles';
import { getTextOrContent } from './text-or-content';
import { DetailsText } from './details-text';

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
      title,
      onClick,
      customContent,
      hasFocus,
      flip,
      branchDir,
      url,
      urlClassName,
      timelineContent,
      items,
      isNested,
      nestedCardHeight,
    }: TimelineContentModel) => {
      const [showMore, setShowMore] = useState(false);
      const detailsRef = useRef<HTMLDivElement | null>(null);
      const containerRef = useRef<HTMLDivElement | null>(null);
      const progressRef = useRef<HTMLDivElement | null>(null);

      const containerWidth = useRef<number>(0);
      const slideShowElapsed = useRef(0);
      const timerRef = useRef(0);
      const startTime = useRef<Date>();
      const [paused, setPaused] = useState(false);
      const isFirstRender = useRef(true);

      const [remainInterval, setRemainInterval] = useState(0);
      const [startWidth, setStartWidth] = useState(0);
      const [textContentLarge, setTextContentLarge] = useState(false);

      const [cardActualHeight, setCardActualHeight] = useState(0);
      const [detailsHeight, setDetailsHeight] = useState(0);
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
      } = useContext(GlobalContext);

      // If the media is a video, we don't show the progress bar.
      // If the media is an image, we show the progress bar if the
      // showProgressOnSlideshow flag is set.
      const canShowProgressBar = useMemo(() => {
        return active && slideShowActive && showProgressOnSlideshow;
      }, [active, slideShowActive]);

      // This function returns a boolean value that indicates whether the user
      // can see more information about the item. The detailed text is only
      // available if the user has expanded the row.
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

      const onContainerRef = useCallback(
        (node: HTMLElement) => {
          if (node === null) {
            return;
          }
          const detailsEle = detailsRef.current;
          if (!detailsEle) {
            return;
          }
          const { scrollHeight, offsetTop } = detailsEle;
          containerWidth.current = node.clientWidth;
          setStartWidth(containerWidth.current);
          setCardActualHeight(scrollHeight);
          setDetailsHeight(detailsEle.offsetHeight);
          setTextContentLarge(scrollHeight + offsetTop > node.clientHeight);
        },
        [detailsRef.current],
      );

      const setupTimer = useCallback((interval: number) => {
        if (!slideItemDuration) {
          return;
        }

        setRemainInterval(interval);

        startTime.current = new Date();

        setPaused(false);

        timerRef.current = window.setTimeout(() => {
          // clear the timer and move to the next card
          window.clearTimeout(timerRef.current);
          setPaused(true);
          setStartWidth(0);
          setRemainInterval(slideItemDuration);
          id && onElapsed && onElapsed(id);
        }, interval);
      }, []);

      useEffect(() => {
        if (timerRef.current && !slideShowActive) {
          window.clearTimeout(timerRef.current);
        }
      }, [slideShowActive]);

      // pause the slide show
      const tryHandlePauseSlideshow = useCallback(() => {
        if (active && slideShowActive) {
          window.clearTimeout(timerRef.current);
          setPaused(true);

          if (startTime.current) {
            const elapsed: any = +new Date() - +startTime.current;
            slideShowElapsed.current = elapsed;
          }

          if (progressRef.current) {
            setStartWidth(progressRef.current.clientWidth);
          }
        }
      }, [active, slideShowActive]);

      // resumes the slide show
      const tryHandleResumeSlideshow = useCallback(() => {
        if (active && slideShowActive) {
          if (!slideItemDuration) {
            return;
          }
          const remainingInterval =
            slideItemDuration - slideShowElapsed.current;

          setPaused(false);

          if (remainingInterval > 0) {
            setupTimer(remainingInterval);
          }
        }
      }, [active, slideShowActive, slideItemDuration]);

      useEffect(() => {
        if (!slideItemDuration) {
          return;
        }
        // setup the timer
        if (active && slideShowActive) {
          setStartWidth(containerWidth.current);
          setupTimer(slideItemDuration);
        }

        // disabled autofocus on active
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

      // This code is used to determine whether the read more button should be shown.
      // It is only shown if the useReadMore prop is true, the detailedText is non-null,
      // and the customContent prop is false.
      const canShowReadMore = useMemo(() => {
        return useReadMore && detailedText && !customContent;
      }, []);

      // decorate the comments
      // This function is triggered when the media state changes. If the slideshow is
      // active, and the media state changes to paused, this function will call
      // tryHandlePauseSlideshow(), which will pause the slideshow.
      const handleMediaState = useCallback(
        (state: MediaState) => {
          if (!slideShowActive) {
            return;
          }
          if (state.playing) {
            tryHandlePauseSlideshow();
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

      /**
       * Calculate the minimum height of the card. If the card has a text overlay and
       * media, the minimum height is equal to the card height. If the card is not
       * nested, the minimum height is equal to the card height. If the card is nested,
       * the minimum height is equal to the nested card height.
       */
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

      // Get the background color for the gradient, which is either the
      // cardDetailsBackGround or nestedCardDetailsBackGround theme variable,
      // based on whether the card is nested or not. If we are showing more
      // content, the background color should be null, so that there is no
      // gradient.
      const gradientColor = useMemo(() => {
        const bgToUse = !isNested
          ? theme?.cardBgColor
          : theme?.nestedCardDetailsBackGround;
        return !showMore && textContentLarge
          ? hexToRGBA(bgToUse || '#ffffff', 0.8)
          : null;
      }, [textContentLarge, showMore, theme?.cardDetailsBackGround, isNested]);

      // This code checks whether the textOverlay and items props are truthy. If so, then it returns false. Otherwise, it returns true.
      const canShowDetailsText = useMemo(() => {
        return !textOverlay && !items?.length;
      }, [items?.length]);

      const TextOrContent = useMemo(() => {
        return getTextOrContent({
          detailedText,
          showMore,
          theme,
          timelineContent,
        });
      }, [showMore, timelineContent, theme, detailedText]);

      const handlers = useMemo(() => {
        if (!isNested) {
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
            onPointerEnter: tryHandlePauseSlideshow,
            onPointerLeave: tryHandleResumeSlideshow,
          };
        }
      }, [tryHandlePauseSlideshow, tryHandleResumeSlideshow]);

      return (
        <TimelineItemContentWrapper
          className={contentClass}
          $minHeight={cardMinHeight}
          $maxWidth={cardWidth}
          mode={mode}
          $noMedia={!media}
          {...handlers}
          ref={onContainerRef}
          tabIndex={!isNested ? 0 : -1}
          theme={theme}
          $borderLessCards={borderLessCards}
          $textOverlay={textOverlay}
          $active={hasBeenActivated}
          $slideShowType={slideShowType}
          $slideShowActive={slideShowActive}
          $branchDir={branchDir}
          $isNested={isNested}
        >
          {title && !textOverlay ? (
            <ContentHeader
              title={title}
              theme={theme}
              url={url}
              urlClassName={urlClassName}
              media={media}
              content={content}
            />
          ) : null}

          {/* render media video or image */}
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
              urlClassName={urlClassName}
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

          {canShowDetailsText ? (
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
          ) : (
            <Timeline
              items={items}
              mode={'VERTICAL'}
              enableOutline={false}
              hideControls
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
              url={url}
            />
          )}
        </TimelineItemContentWrapper>
      );
    },
  );

TimelineCardContent.displayName = 'TimelineCardContent';

export default TimelineCardContent;
