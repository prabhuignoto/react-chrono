import React, { useEffect, useRef, useState, WheelEvent } from "react";
import { TimelineContentModel } from "../../../models/TimelineContentModel";
import { MediaURL } from "../../../models/TimelineItemMedia";
import { Theme } from "../../../models/TimelineTreeModel";
import {
  Media,
  MediaDetailsWrapper,
  MediaWrapper,
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
  media,
  mode,
}) => {
  const [showMore, setShowMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [canShowMore, setCanShowMore] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const Title = React.memo<{ title?: string; theme?: Theme; color?: string }>(
    ({ title, theme, color }) =>
      title && theme ? (
        <TimelineContentTitle
          className={active ? "active" : ""}
          theme={theme}
          style={{ color }}
        >
          {title}
        </TimelineContentTitle>
      ) : null
  );

  const ContentText = React.memo<{ content: string; color?: string }>(
    ({ content, color }) =>
      content ? (
        <TimelineContentText style={{ color }}>{content}</TimelineContentText>
      ) : null
  );

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <TimelineItemContentWrapper
      className={active ? "active" : ""}
      theme={theme}
      noMedia={!media}
    >
      {/* main title */}
      {!media && <Title title={title} theme={theme} />}

      {/* main timeline text */}
      {!media && <ContentText content={content} />}

      {/* media */}
      {media && media.type === "IMAGE" && (
        <MediaWrapper theme={theme} active={active} mode={mode}>
          <Media
            src={(media.source as MediaURL).url}
            mode={mode}
            onLoad={handleImageLoad}
            visible={imageLoaded}
            active={active}
          />
          {imageLoaded && (
            <MediaDetailsWrapper mode={mode}>
              <Title title={title} theme={theme} />
              <ContentText content={content} />
            </MediaDetailsWrapper>
          )}
        </MediaWrapper>
      )}

      {/* detailed text */}
      <TimelineContentDetailsWrapper
        ref={detailsRef}
        className={!showMore ? "show-less" : ""}
        theme={theme}
      >
        {detailedText && !media && (
          <TimelineContentDetails
            onWheel={handleMouseWheel}
            className={showMore ? "active" : ""}
          >
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
          show={canShowMore && !slideShowActive}
        >
          {active ? (showMore ? "show less" : "show more") : "..."}
        </ShowMore>
      )}
    </TimelineItemContentWrapper>
  );
};

export default TimelineItemContent;
