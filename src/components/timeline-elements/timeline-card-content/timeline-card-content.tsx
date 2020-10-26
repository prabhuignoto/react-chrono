import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TimelineContentModel } from '../../../models/TimelineContentModel';
import { MediaState } from '../../../models/TimelineMediaModel';
import ChevronIcon from '../../icons/chev-right';
import { MemoContentText, MemoTitle } from '../memoized';
import CardMedia from '../timeline-card-media/timeline-card-media';
import {
  ChevronIconWrapper,
  ShowMore,
  SlideShowProgressBar,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineItemContentWrapper,
} from './timeline-card-content.styles';

const TimelineItemContent: React.FunctionComponent<TimelineContentModel> = ({
  active,
  cardHeight,
  content,
  detailedText,
  id,
  media,
  mode,
  onShowMore,
  slideShowActive,
  slideItemDuration,
  onElapsed,
  theme,
  title,
  onClick,
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

  const setupTimer = (interval: number) => {
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
  };

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
  }, [active, slideShowActive]);

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

  return (
    <TimelineItemContentWrapper
      className={active ? 'active' : ''}
      theme={theme}
      noMedia={!media}
      minHeight={cardHeight}
      mode={mode}
      onClick={() => {
        if (!slideShowActive && onClick && id) {
          onClick(id);
        }
      }}
      onMouseEnter={tryHandlePauseSlideshow}
      onMouseLeave={tryHandleResumeSlideshow}
      ref={containerRef}
    >
      {/* main title */}
      {!media && <MemoTitle title={title} theme={theme} />}

      {/* main timeline text */}
      {!media && <MemoContentText content={content} />}

      {/* render media video or image */}
      {media && (
        <CardMedia
          media={media}
          content={content}
          title={title}
          mode={mode}
          onMediaStateChange={handleMediaState}
          id={id}
          active={active}
          theme={theme}
          slideshowActive={slideShowActive}
          hideMedia={showMore}
        />
      )}

      {/* detailed text */}
      <TimelineContentDetailsWrapper
        ref={detailsRef}
        className={!showMore ? 'show-less' : ''}
        theme={theme}
      >
        {detailedText && (
          <TimelineContentDetails
            className={showMore ? 'active' : ''}
            ref={detailsRef}
          >
            {detailedText}
          </TimelineContentDetails>
        )}
      </TimelineContentDetailsWrapper>

      {/* display the show more button for textual content */}
      {
        <ShowMore
          role="button"
          onClick={() => {
            if ((active && paused) || !slideShowActive) {
              setShowMore(!showMore);
              onShowMore();
            }
          }}
          className="show-more"
          show={canShowMore}
          theme={theme}
        >
          {<span>{showMore ? 'read less' : 'read more'}</span>}
          <ChevronIconWrapper collapsed={!showMore}>
            <ChevronIcon />
          </ChevronIconWrapper>
        </ShowMore>
      }

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
};

export default TimelineItemContent;
