import { TitleModel } from '@models/TimelineCardTitleModel';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { useTimelineContext } from '../../contexts';
import { titleActive, titleWrapper } from './timeline-card-title.css';
import { cardTitleRecipe } from '../timeline-card-content/timeline-card-content.css';
import { computeCssVarsFromTheme } from '../../../styles/theme-bridge';

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
    () => cls(TITLE_CLASS, active ? 'active' : '', classString, cardTitleRecipe({ active: !!active })),
    [active, classString],
  );

  // Get font size from unified context
  const { fontSizes } = useTimelineContext();

  return (
    <div
      className={titleClass}
      style={{
        ...computeCssVarsFromTheme(theme),
        fontSize: fontSizes?.title || '1rem',
        textAlign: align || undefined,
        visibility: title ? 'visible' : 'hidden',
      }}
      data-ve-class={titleWrapper}
      data-ve-active-class={titleActive}
    >
      {title}
    </div>
  );
};

export default TimelineItemTitle;
