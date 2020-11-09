import cls from 'classnames';
import React, { useMemo } from 'react';
import { Theme } from '../../../models/Theme';
import { TitleWrapper } from './timeline-card-title.styles';

interface TitleModel {
  title?: string;
  active?: boolean;
  theme?: Theme;
}

const TimelineItemTitle: React.FunctionComponent<TitleModel> = ({
  title,
  active,
  theme,
}: TitleModel) => {
  const titleClass = useMemo(
    () => cls('timeline-item-title', active ? 'active' : ''),
    [active],
  );
  return (
    <TitleWrapper className={titleClass} theme={theme} hide={!title}>
      {title}
    </TitleWrapper>
  );
};

export default TimelineItemTitle;
