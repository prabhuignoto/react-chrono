import { TimelineVerticalModel } from '@models/TimelineVerticalModel';
import React, { useCallback, useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import TimelineVerticalItem from './timeline-vertical-item';
import { TimelineVerticalWrapper } from './timeline-vertical.styles';

/**
 * TimelineVertical
 * @property {boolean} alternateCards - Whether to alternate cards.
 * @property {() => void} autoScroll - Function to handle auto scroll.
 * @property {React.ReactNode} contentDetailsChildren - The content details children nodes.
 * @property {boolean} hasFocus - Whether the timeline has focus.
 * @property {React.ReactNode} iconChildren - The icon children nodes.
 * @property {Array} items - The items of the timeline.
 * @property {string} mode - The mode of the timeline.
 * @property {() => void} onClick - Function to handle click event.
 * @property {() => void} onElapsed - Function to handle elapsed event.
 * @property {() => void} onOutlineSelection - Function to handle outline selection.
 * @property {boolean} slideShowRunning - Whether the slideshow is running.
 * @property {Object} theme - The theme of the timeline.
 * @property {boolean} cardLess - Whether the card is less.
 * @property {number} nestedCardHeight - The height of the nested card.
 * @returns {JSX.Element} The TimelineVertical component.
 */
const TimelineVertical: React.FunctionComponent<TimelineVerticalModel> = ({
  alternateCards = true,
  autoScroll,
  contentDetailsChildren,
  hasFocus,
  iconChildren,
  items,
  mode,
  onClick,
  onElapsed,
  onOutlineSelection,
  slideShowRunning,
  theme,
  cardLess,
  nestedCardHeight,
}: TimelineVerticalModel) => {
  // check if the timeline that has become active is visible.
  // if not auto scroll the content and bring it to the view.
  const handleOnActive = useCallback(
    (offset: number, wrapperOffset: number, height: number) => {
      autoScroll({
        contentHeight: height,
        contentOffset: wrapperOffset,
        pointOffset: offset,
      });
    },
    [autoScroll],
  );

  // todo remove this
  const handleOnShowMore = useCallback(() => {}, []);

  const { isMobile } = useContext(GlobalContext);

  return (
    <TimelineVerticalWrapper data-testid="tree-main" role="list">
      {items.map((item, index) => {
        let className = '';

        // in tree mode alternate cards position
        if (alternateCards && !isMobile) {
          className = index % 2 === 0 ? 'left' : 'right';
        } else {
          className = 'right';
        }

        const contentDetails =
          (contentDetailsChildren &&
            (contentDetailsChildren as React.ReactNode[])[index]) ||
          null;

        const customIcon = item.icon
          ? item.icon
          : Array.isArray(iconChildren)
            ? iconChildren[index]
            : index === 0
              ? iconChildren
              : null;

        return (
          <TimelineVerticalItem
            {...item}
            alternateCards={alternateCards}
            className={className}
            contentDetailsChildren={contentDetails}
            iconChild={customIcon}
            hasFocus={hasFocus}
            index={index}
            key={item.id}
            onActive={handleOnActive}
            onClick={onClick}
            onElapsed={onElapsed}
            onShowMore={handleOnShowMore}
            slideShowRunning={slideShowRunning}
            cardLess={cardLess}
            nestedCardHeight={nestedCardHeight}
          />
        );
      })}
    </TimelineVerticalWrapper>
  );
};

TimelineVertical.displayName = 'TimelineVertical';

export default TimelineVertical;
