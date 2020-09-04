import React, { useEffect, useRef, useState, WheelEvent } from "react";
import { TimelineContentModel } from "../../models/TimelineContentModel";
import {
  ShowMore,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineContentText,
  TimelineContentTitle,
  TimelineItemContentWrapper,
} from "./timeline-item-content.styles";

const TimelineItemContent: React.FunctionComponent<TimelineContentModel> = ({
  content,
  active,
  title,
  detailedText,
  onShowMore,
  theme,
  slideShowActive,
}) => {
  const [showMore, setShowMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [canShowMore, setCanShowMore] = useState(false);

  useEffect(() => {
    const detailsEle = detailsRef.current;

    if (!detailsEle) {
      return;
    }
    setTimeout(() => {
      setCanShowMore(detailsEle.scrollHeight > 100);
    }, 100);
  }, []);

  useEffect(() => {
    if (!active && ShowMore) {
      setShowMore(false);
    }
  }, [active]);

  useEffect(() => {
    const detailsEle = detailsRef.current;

    if (detailsEle) {
      detailsEle.scrollTop = 0;
    }
  }, [showMore]);

  const handleMouseWheel = (event: WheelEvent) => {
    if (showMore) {
      event.stopPropagation();
    }
  };

  return (
    <TimelineItemContentWrapper
      className={active ? "active" : ""}
      theme={theme}
    >
      {title && (
        <TimelineContentTitle className={active ? "active" : ""} theme={theme}>
          {title}
        </TimelineContentTitle>
      )}
      <TimelineContentText>{content}</TimelineContentText>
      <TimelineContentDetailsWrapper
        ref={detailsRef}
        className={!showMore ? "show-less" : ""}
        theme={theme}
      >
        <TimelineContentDetails
          onWheel={handleMouseWheel}
          className={showMore ? "active" : ""}
        >
          {detailedText}
        </TimelineContentDetails>
      </TimelineContentDetailsWrapper>
      {
        <ShowMore
          role="button"
          onClick={() => {
            if (active) {
              setShowMore(!showMore);
              onShowMore();
            }
          }}
          className="show-more"
          show={canShowMore && !slideShowActive}
        >
          {active ? (showMore ? "show less" : "show more") : "..."}
        </ShowMore>
      }
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
