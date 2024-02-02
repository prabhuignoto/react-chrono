import { TimelineModel } from '@models/TimelineModel';
import { FunctionComponent } from 'react';
import { ListModel } from './list.model';
import {
  ListItemStyle,
  ListStyle,
  TitleDescriptionStyle,
  TitleStyle,
} from './list.styles';

type ListItemProps = {
  active?: boolean;
  description: string;
  id: string;
  onClick?: (id: string) => void;
  title: string;
} & Pick<TimelineModel, 'theme'>;

const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  id,
  description,
  theme,
  onClick,
  active,
}) => {
  return (
    <ListItemStyle
      key={id}
      theme={theme}
      onClick={() => onClick(id)}
      active={active}
    >
      <TitleStyle theme={theme}>{title}</TitleStyle>
      <TitleDescriptionStyle>{description} </TitleDescriptionStyle>
    </ListItemStyle>
  );
};

const List: FunctionComponent<ListModel> = ({
  items,
  theme,
  onClick,
  activeItemIndex,
}) => {
  return (
    <ListStyle>
      {items?.map(({ title, id, description }, index) => {
        return (
          <ListItem
            title={title}
            id={id}
            key={id}
            description={description}
            theme={theme}
            onClick={onClick}
            active={activeItemIndex === index}
          />
        );
      })}
    </ListStyle>
  );
};

export { List };
