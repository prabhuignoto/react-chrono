import React from 'react';
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
}: TitleModel) => (
  <TitleWrapper
    className={active ? 'timeline-item-title active' : 'timeline-item-title'}
    title={title}
    theme={theme}
  >
    {title}
  </TitleWrapper>
);

export default TimelineItemTitle;
