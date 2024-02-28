import { TimelineMode } from '@models/TimelineModel';
import {
  FunctionComponent,
  PointerEvent,
  useCallback,
  useContext,
  useMemo,
} from 'react';
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
 * ContentFooter
 *
 * A functional component that renders the footer of the timeline card.
 * It displays the read more/less button, progress bar, and triangle icon.
 * The read more/less button appears only if the content is large.
 * The progress bar and triangle icon are displayed only if the card is in slideshow mode.
 *
 * @property {boolean} showProgressBar - Determines if progress bar should be displayed.
 * @property {Function} onExpand - Function called when expanding content.
 * @property {string} triangleDir - Direction of the triangle icon.
 * @property {boolean} showMore - Determines if 'read more' should be displayed.
 * @property {boolean} textContentIsLarge - Determines if text content is large.
 * @property {boolean} showReadMore - Determines if 'read more' button should be displayed.
 * @property {number} remainInterval - Remaining interval for progress bar.
 * @property {boolean} paused - Determines if progress is paused.
 * @property {number} startWidth - Starting width of progress bar.
 * @property {boolean} canShow - Determines if the element can be shown.
 * @property {React.RefObject} progressRef - Ref to the progress bar.
 * @property {boolean} isNested - Determines if component is nested.
 * @property {boolean} isResuming - Determines if slideshow is resuming.
 *
 * @returns {JSX.Element} ContentFooter component.
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
}: ContentFooterProps) => {
  const { mode, theme } = useContext(GlobalContext);

  const canShowTriangleIcon = useMemo(() => {
    return (
      !isNested &&
      (['VERTICAL', 'VERTICAL_ALTERNATING'] as TimelineMode[]).some(
        (m) => m === mode,
      )
    );
  }, [mode, isNested]);

  const handleClick = useCallback(
    (ev: PointerEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
      onExpand();
    },
    [onExpand],
  );

  const canShowMore = useMemo(
    () => showReadMore && textContentIsLarge,
    [showReadMore, textContentIsLarge],
  );

  return (
    <>
      {canShowMore ? (
        <ShowMore
          className="show-more"
          onPointerDown={handleClick}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              onExpand();
            }
          }}
          show={canShow ? 'true' : 'false'}
          theme={theme}
          tabIndex={0}
        >
          {<span>{showMore ? 'read less' : 'read more'}</span>}
          <ChevronIconWrapper collapsed={showMore ? 'true' : 'false'}>
            <ChevronIcon />
          </ChevronIconWrapper>
        </ShowMore>
      ) : null}

      {showProgressBar && (
        <SlideShowProgressBar
          color={theme?.primary}
          $duration={remainInterval}
          $paused={paused}
          ref={progressRef}
          $startWidth={startWidth}
          $resuming={isResuming}
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
