import React, { useCallback, useEffect, useRef, useState } from "react";
import { TimelineContentModel } from "../../../models/TimelineContentModel";
import { MemoContentText, MemoTitle } from "../memoized";
import CardMedia from "../timeline-card-media/timeline-card-media";
import {
  ShowMore,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineItemContentWrapper,
} from "./timeline-card-content.styles";

const TimelineItemContent: React.FunctionComponent<TimelineContentModel> = ({
  active,
  cardHeight,
  content,
  detailedText,
  id,
  media,
  mode,
  onShowMore,
  onMediaStateChange,
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
  const canShowMore = useRef(!!detailedText);
  const slideShowElapsed = useRef(0);
  const timerRef = useRef(0);

  // disabling auto collapse on inactive
  // useEffect(() => {
    // auto expand the details content when active and slideshow is running
    // if (active && slideShowActive) {
    //   setShowMore(true);
    //   onShowMore();
    // }
  // }, [active, slideShowActive, onShowMore]);

  useEffect(() => {
    const detailsEle = detailsRef.current;

    if (detailsEle) {
      detailsEle.scrollTop = 0;
    }
  }, [showMore]);

  const setupTimer = useCallback((interval: number) => {
    if (!slideItemDuration) {
      return;
    }
    timerRef.current = window.setInterval(() => {
      // clear the timer and move to the next card
      window.clearInterval(timerRef.current);
      onElapsed(id);
    }, interval);
  }, []);

  // pause the slide show
  const tryHandlePauseSlideshow = useCallback(() => {
    if (active && slideShowActive) {
      window.clearTimeout(timerRef.current);
    }
  }, [active, slideShowActive]);

  // resumes the slide show
  const tryHandleResumeSlideshow = useCallback(() => {
    if (active && slideShowActive) {
      if (!slideItemDuration) {
        return;
      }
      const interval = Math.round(slideItemDuration - slideShowElapsed.current);

      if (interval > 0) {
        setupTimer(interval);
      }
    }
  }, [active, slideShowActive, setupTimer, slideItemDuration]);

  useEffect(() => {
    if (!slideItemDuration) {
      return;
    }
    // setup the timer
    if (active && slideShowActive) {
      setupTimer(slideItemDuration);
    }
  }, [active, slideShowActive, setupTimer, slideItemDuration]);

  return (
    <TimelineItemContentWrapper
      className={active ? "active" : ""}
      theme={theme}
      noMedia={!media}
      minHeight={cardHeight}
      mode={mode}
      onClick={() => {
        if (!slideShowActive && onClick) {
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
          onMediaStateChange={onMediaStateChange}
          id={id}
          active={active}
          theme={theme}
        />
      )}

      {/* detailed text */}
      <TimelineContentDetailsWrapper
        ref={detailsRef}
        className={!showMore ? "show-less" : ""}
        theme={theme}
      >
        {detailedText && !media && (
          <TimelineContentDetails className={showMore ? "active" : ""}>
            {detailedText}
          </TimelineContentDetails>
        )}
      </TimelineContentDetailsWrapper>
      
      {/* display the show more button for textual content */}
      {!media && (
        <ShowMore
          role="button"
          onClick={() => {
            if (active) {
              setShowMore(!showMore);
              onShowMore();
            }
          }}
          className="show-more"
          show={canShowMore.current}
        >
          {active ? (showMore ? "show less" : "show more") : "..."}
        </ShowMore>
      )}
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
