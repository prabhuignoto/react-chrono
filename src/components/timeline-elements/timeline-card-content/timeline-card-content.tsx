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
} from './timeline-card-content.styles';

const TimelineCardContent: React.FunctionComponent<TimelineContentModel> = React.memo(
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
  }: TimelineContentModel) => {
    const [showMore, setShowMore] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const containerWidth = useRef<number>(0);
    const slideShowElapsed = useRef(0);
    const timerRef = useRef(0);
    const startTime = useRef<Date>();
    const [paused, setPaused] = useState(false);

    // const [elapsed, setElapsed] = useState(0);
    const [remainInterval, setRemainInterval] = useState(0);
    const [startWidth, setStartWidth] = useState(0);

    const { mode, cardHeight, slideItemDuration = 2000 } = useContext(
      GlobalContext,
    );

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

    useEffect(() => {
      setTimeout(() => {
        if (containerRef.current) {
          containerWidth.current = containerRef.current.clientWidth;
          setStartWidth(containerWidth.current);
        }
      }, 100);
    }, []);

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
        const remainingInterval = slideItemDuration - slideShowElapsed.current;

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
        cls(active ? 'timeline-card-content active' : 'timeline-card-content '),
      [active],
    );

    const contentDetailsClass = useMemo(
      () =>
        cls(
          !showMore && !customContent
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

    return (
      <TimelineItemContentWrapper
        className={contentClass}
        theme={theme}
        noMedia={!media}
        minHeight={cardHeight}
        mode={mode}
        onClick={(ev: React.MouseEvent) => {
          ev.stopPropagation();
          if (!slideShowActive && onClick && id) {
            onClick(id);
          }
        }}
        onMouseEnter={tryHandlePauseSlideshow}
        onMouseLeave={tryHandleResumeSlideshow}
        ref={containerRef}
        tabIndex={0}
      >
        <TimelineCardHeader>
          {/* main title */}
          {!media && <MemoTitle title={title} theme={theme} />}
          {/* main timeline text */}
          {!media && <MemoSubTitle content={content} theme={theme} />}
        </TimelineCardHeader>

        {/* render media video or image */}
        {media && (
          <CardMedia
            media={media}
            content={content}
            title={title}
            onMediaStateChange={handleMediaState}
            id={id}
            active={active}
            theme={theme}
            slideshowActive={slideShowActive}
            hideMedia={showMore}
            cardHeight={cardHeight}
          />
        )}

        {/* detailed text */}
        <TimelineContentDetailsWrapper
          ref={detailsRef}
          className={contentDetailsClass}
          theme={theme}
          aria-expanded={showMore}
          customContent={!!customContent}
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
                    <TimelineSubContent key={index}>{text}</TimelineSubContent>
                  ))
                : detailedText}
            </TimelineContentDetails>
          )}
        </TimelineContentDetailsWrapper>

        {/* display the show more button for textual content */}
        {detailedText && !customContent && (
          <ShowMore
            role="button"
            onClick={handleExpandDetails}
            onKeyPress={useCallback(
              (event) => {
                if (event.key === 'Enter') {
                  handleExpandDetails();
                }
              },
              [active, paused, slideShowActive, showMore],
            )}
            className="show-more"
            show={canShowMore}
            theme={theme}
            tabIndex={0}
          >
            {<span>{showMore ? 'read less' : 'read more'}</span>}
            <ChevronIconWrapper collapsed={!showMore}>
              <ChevronIcon />
            </ChevronIconWrapper>
          </ShowMore>
        )}

        {canShowProgressBar && (
          <SlideShowProgressBar
            startWidth={startWidth}
            paused={paused}
            duration={remainInterval}
            ref={progressRef}
            color={theme && theme.primary}
          ></SlideShowProgressBar>
        )}
      </TimelineItemContentWrapper>
    );
  },
);

TimelineCardContent.displayName = 'TimelineCardContent';

export default TimelineCardContent;
