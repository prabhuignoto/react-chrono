import { FunctionComponent, PointerEvent, useContext, useMemo } from 'react';
import { TimelineMode } from '../../../models/TimelineModel';
import { GlobalContext } from '../../GlobalContext';
import ChevronIcon from '../../icons/chev-right';
import { ContentFooterProps } from './header-footer.model';
import {
  ChevronIconWrapper,
  ShowMore,
  SlideShowProgressBar,
  TriangleIconWrapper,
} from './timeline-card-content.styles';

/**
 * This component is used to render the footer of the timeline card.
 * It renders the read more/less button, progress bar and triangle icon.
 * The read more/less button is only rendered if the content is large.
 * The progress bar and triangle icon are only rendered if the card is in slideshow mode.
 */

const ContentFooter: FunctionComponent<ContentFooterProps> = ({
  showProgressBar,
  onExpand,
  triangleDir,
  showMore,
  textContentIsLarge,
  showReadMore,
  remainInterval,
  paused,
  startWidth,
  canShow,
  progressRef,
  isNested,
  isResuming,
}) => {
  const { mode, theme } = useContext(GlobalContext);

  const canShowTriangleIcon = useMemo(() => {
    return (
      !isNested &&
      (['VERTICAL', 'VERTICAL_ALTERNATING'] as TimelineMode[]).some(
        (m) => m === mode,
      )
    );
  }, [mode, isNested]);

  const handleClick = (ev: PointerEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    onExpand();
  };

  const canShowMore = useMemo(() => {
    return showReadMore && textContentIsLarge;
  }, [showReadMore, textContentIsLarge]);

  return (
    <>
      {canShowMore ? (
        <ShowMore
          className="show-more"
          onPointerDown={handleClick}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              onExpand();
            }
          }}
          role="button"
          show={canShow}
          theme={theme}
          tabIndex={0}
        >
          {<span>{showMore ? 'read less' : 'read more'}</span>}
          <ChevronIconWrapper collapsed={!showMore}>
            <ChevronIcon />
          </ChevronIconWrapper>
        </ShowMore>
      ) : null}

      {showProgressBar && (
        <SlideShowProgressBar
          color={theme?.primary}
          duration={remainInterval}
          paused={paused}
          ref={progressRef}
          startWidth={startWidth}
          role="progressbar"
          resuming={isResuming}
        ></SlideShowProgressBar>
      )}

      {canShowTriangleIcon && (
        <TriangleIconWrapper
          dir={triangleDir}
          theme={theme}
          offset={-8}
        ></TriangleIconWrapper>
      )}
    </>
  );
};

export { ContentFooter };
