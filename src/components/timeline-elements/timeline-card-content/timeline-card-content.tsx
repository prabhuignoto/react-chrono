import React, { useEffect, useMemo, useRef, useState } from "react";
import { TimelineContentModel } from "../../../models/TimelineContentModel";
import { MemoContentText, MemoTitle } from "../memoized";
import CardMedia from "../timeline-card-media/timeline-card-media";
import {
  ShowMore,
  SlideShowProgressBar,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineItemContentWrapper
} from "./timeline-card-content.styles";

const TimelineItemContent: React.FunctionComponent<TimelineContentModel> = React.memo(
  ({
    active,
    cardHeight,
    content,
    detailedText,
    id,
    media,
    mode,
    onClick,
    onShowMore,
    onMediaStateChange,
    slideShowActive,
    slideItemDuration,
    theme,
    title,
    branchDir,
  }: TimelineContentModel) => {
    const [showMore, setShowMore] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);
    const canShowMore = useRef(!!detailedText);

    const showProgressbar = useMemo(() => {
      return slideShowActive && active && media?.type !== "VIDEO";
    }, [slideShowActive, active, media]);

    // disabling auto collapse on inactive
    useEffect(() => {
      // auto expand the details content when active and slideshow is running
      if (active && slideShowActive) {
        setShowMore(true);
        onShowMore();
      }
    }, [active]);

    useEffect(() => {
      const detailsEle = detailsRef.current;

      if (detailsEle) {
        detailsEle.scrollTop = 0;
      }
    }, [showMore]);

    return (
      <TimelineItemContentWrapper
        className={active ? "active" : ""}
        theme={theme}
        noMedia={!media}
        minHeight={cardHeight}
        mode={mode}
        onClick={() => onClick && id && onClick(id)}
      >
        {/* main title */}
        {!media && <MemoTitle title={title} theme={theme} />}

        {/* main timeline text */}
        {!media && <MemoContentText content={content} />}

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
        {showProgressbar && (
          <SlideShowProgressBar theme={theme} duration={slideItemDuration} />
        )}
      </TimelineItemContentWrapper>
    );
  },
  (prev, next) => prev.id !== next.id
);

export default TimelineItemContent;
