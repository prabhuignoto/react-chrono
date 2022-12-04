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
import CardMedia from '../timeline-card-media/timeline-card-media';
import { ContentFooter } from './content-footer';
import { ContentHeader } from './content-header';
import {
  TimelineContentDetails,
  TimelineContentDetailsWrapper,
  TimelineItemContentWrapper,
  TimelineSubContent,
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
      timelineContent,
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
        fontSizes,
        classNames,
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
        (node: HTMLElement) => {
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

      const getTextOrContent = useMemo(() => {
        const isTextArray = Array.isArray(detailedText);

        if (timelineContent) {
          return <div ref={detailsRef}>{timelineContent}</div>;
        } else {
          let textContent = null;
          if (isTextArray) {
            textContent = detailedText.map((text, index) => (
              <TimelineSubContent
                key={index}
                fontSize={fontSizes?.cardText}
                className={classNames?.cardText}
              >
                {text}
              </TimelineSubContent>
            ));
          } else {
            textContent = detailedText;
          }

          return (
            <TimelineContentDetails
              className={showMore ? 'active' : ''}
              ref={detailsRef}
              theme={theme}
            >
              {textContent}
            </TimelineContentDetails>
          );
        }
      }, [timelineContent, showMore]);

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
          <ContentHeader
            title={title}
            theme={theme}
            url={url}
            media={media}
            content={content}
          />

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
            {customContent ? customContent : getTextOrContent}
          </TimelineContentDetailsWrapper>

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
          />
        </TimelineItemContentWrapper>
      );
    },
  );

TimelineCardContent.displayName = 'TimelineCardContent';

export default TimelineCardContent;
