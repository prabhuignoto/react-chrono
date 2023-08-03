import { TitleModel } from '@models/TimelineCardTitleModel';
import cls from 'classnames';
import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { TitleWrapper } from './timeline-card-title.styles';

/**
 * TimelineItemTitle component
 * This component renders the title of a timeline item and applies appropriate styling based on the given props.
 *
 * @property {string} title - The text of the title.
 * @property {boolean} active - Indicates whether the title is active or not.
 * @property {Theme} theme - The theme object, used for styling.
 * @property {string} align - The alignment of the title.
 * @property {string} classString - Additional CSS classes for the title.
 * @returns {JSX.Element} The TimelineItemTitle component.
 */
const TimelineItemTitle: React.FunctionComponent<TitleModel> = ({
  title,
  active,
  theme,
  align,
  classString,
}: TitleModel) => {
  const TITLE_CLASS = 'timeline-item-title'; // Base class name for the title

  // Computed class name for the title, combining base class, active state, and additional classes
  const titleClass = useMemo(
    () => cls(TITLE_CLASS, active ? 'active' : '', classString),
    [active, classString],
  );

  // Get font size from global context
  const { fontSizes } = useContext(GlobalContext);

  return (
    <TitleWrapper
      className={titleClass}
      theme={theme}
      $hide={!title}
      align={align}
      $fontSize={fontSizes?.title}
    >
      {title}
    </TitleWrapper>
  );
};

export default TimelineItemTitle;
