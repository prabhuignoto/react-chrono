import {
  FunctionComponent,
  PointerEvent,
  useCallback,
  useMemo,
} from 'react';
import { useTimelineContext } from '../../contexts';
import ChevronIcon from '../../icons/chev-right';
import { ContentFooterProps } from './header-footer.model';
import { chevronIconWrapper, showMoreButton } from './timeline-card-content.css';

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
  onExpand,
  showMore,
  textContentIsLarge,
  showReadMore,
  canShow,
  buttonClassName,
  iconWrapperClassName,
}: ContentFooterProps) => {
  const { theme } = useTimelineContext();

  const handleClick = useCallback(
    (ev: PointerEvent) => {
      ev.stopPropagation();
      ev.preventDefault();
      onExpand();
    },
    [onExpand],
  );

  const canShowMore = useMemo(() => {
    // Show read more button when:
    // 1. The feature is enabled (showReadMore)
    // 2. The text is large enough OR we're already in expanded state
    // 3. We have actual content to show (canShow)
    return showReadMore && canShow && (textContentIsLarge || showMore);
  }, [showReadMore, textContentIsLarge, canShow, showMore]);

  return (
    <>
      {canShowMore ? (
        <button
          className={buttonClassName || showMoreButton}
          onPointerDown={handleClick}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              onExpand();
            }
          }}
          tabIndex={0}
        >
          {<span>{showMore ? 'read less' : 'read more'}</span>}
          <span className={iconWrapperClassName || chevronIconWrapper}>
            <ChevronIcon />
          </span>
        </button>
      ) : null}
    </>
  );
};

export { ContentFooter };
