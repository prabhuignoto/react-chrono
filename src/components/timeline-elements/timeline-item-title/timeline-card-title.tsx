import cls from 'classnames';
import React, { useMemo } from 'react';
import { TitleModel } from '../../../models/TimelineCardTitleModel';
import { TitleWrapper } from './timeline-card-title.styles';

const TimelineItemTitle: React.FunctionComponent<TitleModel> = ({
  title,
  active,
  theme,
  align,
}: TitleModel) => {
  const titleClass = useMemo(
    () => cls('timeline-item-title', active ? 'active' : ''),
    [active],
  );
  return (
    <TitleWrapper
      className={titleClass}
      theme={theme}
      hide={!title}
      align={align}
    >
      {title}
    </TitleWrapper>
  );
};

export default TimelineItemTitle;
