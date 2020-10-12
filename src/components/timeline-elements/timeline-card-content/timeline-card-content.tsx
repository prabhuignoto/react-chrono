import React, { useEffect, useRef, useState } from "react";
import { TimelineContentModel } from "../../../models/TimelineContentModel";
import { Theme } from "../../../models/TimelineTreeModel";
import {
  CardImage,
  CardVideo,
  MediaDetailsWrapper,
  MediaWrapper,
  ShowMore,
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineContentText,
  TimelineContentTitle,
  TimelineItemContentWrapper,
} from "./timeline-card-content.styles";

const Title = React.memo<{
  title?: string;
  theme?: Theme;
  color?: string;
  dir?: string;
  active?: boolean;
}>(({ title, theme, color, dir, active }) =>
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
  dir?: string;
}>(({ content, color, dir }) =>
  content ? (
    <TimelineContentText style={{ color }} dir={dir}>
      {content}
    </TimelineContentText>
  ) : null
);

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
    theme,
    title,
    branchDir,
  }: TimelineContentModel) => {
    const [showMore, setShowMore] = useState(false);
    const detailsRef = useRef<HTMLDivElement>(null);
    const canShowMore = useRef(!!detailedText);
    const [imageLoaded, setImageLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // disabling auto collapse on inactive
    useEffect(() => {
      // auto expand the details content when active and slideshow is running
      if (active && slideShowActive) {
        setShowMore(true);
        onShowMore();
      }

      if (!videoRef) {
        return;
      }

      if (active) {
        // play the video when active
        videoRef.current?.play();
      } else {
        // pause the video when not active
        videoRef.current?.pause();
      }
    }, [active]);

    useEffect(() => {
      const detailsEle = detailsRef.current;

      if (detailsEle) {
        detailsEle.scrollTop = 0;
      }
    }, [showMore]);

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

        {/* media - image*/}
        {media && media.type === "IMAGE" && (
          <MediaWrapper
            theme={theme}
            active={active}
            mode={mode}
            dir={branchDir}
          >
            <CardImage
              src={media.source.url}
              mode={mode}
              onLoad={handleImageLoad}
              visible={imageLoaded}
              active={active}
              dir={branchDir}
            />
            {imageLoaded && (
              <MediaDetailsWrapper mode={mode}>
                <Title title={title} theme={theme} dir={branchDir} active={active} />
                <ContentText content={content} dir={branchDir} />
              </MediaDetailsWrapper>
            )}
          </MediaWrapper>
        )}

        {media && media.type === "VIDEO" && (
          <MediaWrapper theme={theme} active={active} mode={mode}>
            <CardVideo
              controls
              autoPlay={active}
              ref={videoRef}
              onPlay={() =>
                onMediaStateChange({
                  id,
                  paused: false,
                  playing: true,
                })
              }
              onPause={() =>
                onMediaStateChange({
                  id,
                  paused: true,
                  playing: false,
                })
              }
              onEnded={() =>
                onMediaStateChange({
                  id,
                  paused: false,
                  playing: false,
                })
              }
            >
              <source src={media.source.url}></source>
            </CardVideo>
            <MediaDetailsWrapper mode={mode}>
              <Title title={title} theme={theme} dir={branchDir} active={active} />
              <ContentText content={content} dir={branchDir} />
            </MediaDetailsWrapper>
          </MediaWrapper>
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
      </TimelineItemContentWrapper>
    );
  },
  (prev, next) => prev.id !== next.id
);

export default TimelineItemContent;
