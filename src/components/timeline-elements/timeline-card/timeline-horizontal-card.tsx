import cls from 'classnames';
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react';
import { TimelineCardModel } from '../../../models/TimelineItemModel';
import { GlobalContext } from '../../GlobalContext';
import TimelineCardContent from '../timeline-card-content/timeline-card-content';
import TimelineItemTitle from '../timeline-item-title/timeline-card-title';
import HorizontalCircle from '../../timeline-horizontal/timeline-horizontal-cricle';
import {
  TimelineContentContainer,
  TimelineTitleContainer,
  Wrapper,
} from './timeline-horizontal-card.styles';

const TimelineCard: React.FunctionComponent<TimelineCardModel> = ({
  active,
  autoScroll,
  cardDetailedText,
  cardSubtitle,
  cardTitle,
  url,
  id,
  media,
  onClick,
  onActive,
  onElapsed,
  showOnlyCircle,
  slideShowRunning,
  theme,
  title,
  customContent,
  hasFocus,
  iconChild,
}: TimelineCardModel) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    mode,
    cardPositionHorizontal: position,
    timelineCircleDimension,
    disableClickOnCircle,
  } = useContext(GlobalContext);

  const handleOnActive = (offset: number) => {
    if (contentRef.current) {
      const { offsetLeft, clientWidth } = contentRef.current;
      onActive(offsetLeft + offset, offsetLeft, clientWidth);
    }
  };

  const handleOnShowMore = useCallback(() => {}, []);

  const modeLower = useMemo(() => mode?.toLowerCase(), [mode]);

  const containerClass = useMemo(
    () =>
      cls(
        'timeline-horz-card-wrapper',
        modeLower,
        position === 'TOP' ? 'bottom' : 'top',
      ),
    [mode, position],
  );

  const titleClass = useMemo(() => cls(modeLower, position), []);

  const timelineContent = useMemo(() => {
    return (
      <TimelineContentContainer className={containerClass}>
        <TimelineCardContent
          content={cardSubtitle}
          active={active}
          title={cardTitle}
          url={url}
          onClick={onClick}
          detailedText={cardDetailedText}
          onShowMore={handleOnShowMore}
          theme={theme}
          slideShowActive={slideShowRunning}
          media={media}
          onElapsed={onElapsed}
          id={id}
          customContent={customContent}
          hasFocus={hasFocus}
        />
      </TimelineContentContainer>
    );
  }, [hasFocus, slideShowRunning, active]);

  const Circle = useMemo(() => {
    return (
      <HorizontalCircle
        active={active}
        id={id}
        onActive={handleOnActive}
        onClick={onClick}
        slideShowRunning={slideShowRunning}
        iconChild={iconChild}
        theme={theme}
      />
    );
  }, [slideShowRunning, active]);

  return (
    <Wrapper
      className={modeLower}
      data-testid="timeline-item"
      style={{ display: 'flex', flexDirection: 'column' }}
      ref={contentRef}
      key={id}
      role="listitem"
    >
      {Circle}

      <TimelineTitleContainer
        className={titleClass}
        data-testid="timeline-title"
      >
        <TimelineItemTitle title={title} active={active} theme={theme} />
      </TimelineTitleContainer>
      {!showOnlyCircle ? timelineContent : null}
    </Wrapper>
  );
};

export default TimelineCard;
