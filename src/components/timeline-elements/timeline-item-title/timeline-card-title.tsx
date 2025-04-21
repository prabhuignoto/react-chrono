import { TitleModel } from '@models/TimelineCardTitleModel';
import cls from 'classnames';
import React, { useContext, useMemo } from 'react';
import { GlobalContext } from '../../GlobalContext';
import { useSearch } from '../../common/SearchContext';
import TextHighlighter from '../../common/TextHighlighter';
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
 * @property {string} data-testid - Test ID for testing purposes.
 * @returns {JSX.Element} The TimelineItemTitle component.
 */
const TimelineItemTitle: React.FunctionComponent<TitleModel> = ({
  title,
  active,
  theme,
  align,
  classString,
  'data-testid': testId,
}: TitleModel) => {
  const TITLE_CLASS = 'timeline-item-title'; // Base class name for the title
  const { searchTerm } = useSearch();

  // Computed class name for the title, combining base class, active state, and additional classes
  const titleClass = useMemo(
    () => cls(TITLE_CLASS, active ? 'active' : '', classString),
    [active, classString],
  );

  // Get font size from global context
  const { fontSizes } = useContext(GlobalContext);

  return (
    <div data-testid={testId}>
      <TitleWrapper
        className={titleClass}
        theme={theme}
        $hide={!title}
        align={align}
        $fontSize={fontSizes?.title}
      >
        {searchTerm && title ? (
          <TextHighlighter
            text={title}
            searchTerm={searchTerm}
            theme={theme!}
          />
        ) : (
          title
        )}
      </TitleWrapper>
    </div>
  );
};

export default TimelineItemTitle;
