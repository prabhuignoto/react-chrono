import cls from 'classnames';
import React, { useContext, useMemo } from 'react';
import { TitleModel } from '../../../models/TimelineCardTitleModel';
import { GlobalContext } from '../../GlobalContext';
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

  const { fontSizes } = useContext(GlobalContext);

  return (
    <TitleWrapper
      className={titleClass}
      theme={theme}
      hide={!title}
      align={align}
      fontSize={fontSizes?.title}
    >
      {title}
    </TitleWrapper>
  );
};

export default TimelineItemTitle;
