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
} from "./timeline-card-content.styles";

const TimelineItemContent: React.FunctionComponent<TimelineContentModel> = ({
  active,
  cardHeight,
  content,
  detailedText,
  id,
  media,
  mode,
  onClick,
  onShowMore,
  slideShowActive,
  theme,
  title,
  branchDir,
}: TimelineContentModel) => {
  const [showMore, setShowMore] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [canShowMore, setCanShowMore] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const detailsEle = detailsRef.current;

    if (!detailsEle) {
      return;
    }
    window.setTimeout(() => {
      // setCanShowMore(detailsEle.scrollHeight > 50);
      setCanShowMore(!!detailedText);
    }, 100);
  }, []);

  // disabling auto collapse on inactive
  // useEffect(() => {
  // if (!active && ShowMore) {
  //   setShowMore(false);
  // }
  // }, [active]);

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

  const Title = React.memo<{
    title?: string;
    theme?: Theme;
    color?: string;
    dir?: typeof branchDir;
  }>(({ title, theme, color, dir }) =>
    title && theme ? (
      <TimelineContentTitle
        className={active ? "active" : ""}
        theme={theme}
        style={{ color }}
        dir={dir}
      >
        {title}
      </TimelineContentTitle>
    ) : null
  );

  const ContentText = React.memo<{
    content: string;
    color?: string;
    dir?: typeof branchDir;
  }>(({ content, color, dir }) =>
    content ? (
      <TimelineContentText style={{ color }} dir={dir}>
        {content}
      </TimelineContentText>
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
      minHeight={cardHeight}
      mode={mode}
      onClick={() => onClick && id && onClick(id)}
    >
      {/* main title */}
      {!media && <Title title={title} theme={theme} />}

      {/* main timeline text */}
      {!media && <ContentText content={content} />}

      {/* media */}
      {media && media.type === "IMAGE" && (
        <MediaWrapper theme={theme} active={active} mode={mode} dir={branchDir}>
          <Media
            src={(media.source as MediaURL).url}
            mode={mode}
            onLoad={handleImageLoad}
            visible={imageLoaded}
            active={active}
            dir={branchDir}
          />
          {imageLoaded && (
            <MediaDetailsWrapper mode={mode}>
              <Title title={title} theme={theme} dir={branchDir} />
              <ContentText content={content} dir={branchDir} />
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
