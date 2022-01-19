import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TimelineContentModel } from '../../../models/TimelineContentModel';
import { MediaState } from '../../../models/TimelineMediaModel';
import { TimelineMode } from '../../../models/TimelineModel';
import { GlobalContext } from '../../GlobalContext';
import ChevronIcon from '../../icons/chev-right';
import { MemoSubTitle, MemoTitle } from '../memoized';
import CardMedia from '../timeline-card-media/timeline-card-media';
import {
  ChevronIconWrapper,
  ShowMore,
  SlideShowProgressBar,
  TimelineCardHeader,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineItemContentWrapper,
  TimelineSubContent,
  TriangleIconWrapper,
} from './timeline-card-content.styles';

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

      // const [elapsed, setElapsed] = useState(0);
      const [remainInterval, setRemainInterval] = useState(0);
      const [startWidth, setStartWidth] = useState(0);
      const [textContentLarge, setTextContentLarge] = useState(false);

      const {
        mode,
        cardHeight,
        slideItemDuration = 2000,
        useReadMore,
        cardWidth,
        borderLessCards,
        disableAutoScrollOnClick,
      } = useContext(GlobalContext);

      const canShowProgressBar = useMemo(() => {
        const canShow = active && slideShowActive;
        if (media) {
          return canShow && media.type !== 'VIDEO';
        } else {
          return canShow;
        }
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

      const onContainerRef = useCallback(
        (node) => {
          const detailsEle = detailsRef.current;
          if (node && detailsEle) {
            const { scrollHeight, offsetTop } = detailsEle;
            containerWidth.current = node.clientWidth;
            setStartWidth(containerWidth.current);
            setTextContentLarge(scrollHeight + offsetTop > node.clientHeight);
          }
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

          // setRemainInterval(remainingInterval);
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
      }, [active, slideShowActive]);

      useEffect(() => {
        if (hasFocus && active) {
          containerRef.current && containerRef.current.focus();
        }
      }, [hasFocus, active]);

      const canShowReadMore = useMemo(() => {
        return useReadMore && detailedText && !customContent;
      }, []);

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
          ),
        [active],
      );

      const contentDetailsClass = useMemo(
        () =>
          cls(
            !showMore && !customContent && useReadMore
              ? 'show-less card-description'
              : 'card-description',
          ),
        [showMore, customContent],
      );

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

      const canShowTriangleIcon = useMemo(() => {
        return (['VERTICAL', 'VERTICAL_ALTERNATING'] as TimelineMode[]).some(
          (m) => m === mode,
        );
      }, [mode]);

      return (
        <TimelineItemContentWrapper
          className={contentClass}
          minHeight={cardHeight}
          maxWidth={cardWidth}
          mode={mode}
          noMedia={!media}
          onClick={(ev: React.MouseEvent) => {
            ev.stopPropagation();
            if (
              !slideShowActive &&
              onClick &&
              id &&
              !disableAutoScrollOnClick
            ) {
              onClick(id);
            }
          }}
          onMouseEnter={tryHandlePauseSlideshow}
          onMouseLeave={tryHandleResumeSlideshow}
          ref={onContainerRef}
          tabIndex={0}
          theme={theme}
          borderLess={borderLessCards}
        >
          <TimelineCardHeader>
            {/* main title */}
            {!media && <MemoTitle title={title} theme={theme} url={url} />}
            {/* main timeline text */}
            {!media && <MemoSubTitle content={content} theme={theme} />}
          </TimelineCardHeader>

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
            />
          )}

          {/* detailed text */}
          <TimelineContentDetailsWrapper
            aria-expanded={showMore}
            className={contentDetailsClass}
            customContent={!!customContent}
            ref={detailsRef}
            theme={theme}
            useReadMore={useReadMore}
            borderLess={borderLessCards}
          >
            {customContent ? (
              <>{customContent}</>
            ) : (
              <TimelineContentDetails
                className={showMore ? 'active' : ''}
                ref={detailsRef}
                theme={theme}
              >
                {Array.isArray(detailedText)
                  ? detailedText.map((text, index) => (
                      <TimelineSubContent key={index}>
                        {text}
                      </TimelineSubContent>
                    ))
                  : detailedText}
              </TimelineContentDetails>
            )}
          </TimelineContentDetailsWrapper>

          {/* display the show more button for textual content */}
          {canShowReadMore && textContentLarge ? (
            <ShowMore
              className="show-more"
              onClick={handleExpandDetails}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleExpandDetails();
                }
              }}
              role="button"
              show={canShowMore}
              theme={theme}
              tabIndex={0}
            >
              {<span>{showMore ? 'read less' : 'read more'}</span>}
              <ChevronIconWrapper collapsed={!showMore}>
                <ChevronIcon />
              </ChevronIconWrapper>
            </ShowMore>
          ) : null}

          {canShowProgressBar && (
            <SlideShowProgressBar
              color={theme && theme.primary}
              duration={remainInterval}
              paused={paused}
              ref={progressRef}
              startWidth={startWidth}
            ></SlideShowProgressBar>
          )}

          {canShowTriangleIcon && (
            <TriangleIconWrapper
              dir={triangleDir}
              theme={theme}
            ></TriangleIconWrapper>
          )}
        </TimelineItemContentWrapper>
      );
    },
  );

TimelineCardContent.displayName = 'TimelineCardContent';

export default TimelineCardContent;
