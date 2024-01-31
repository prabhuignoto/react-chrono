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
  description: string;
  id: string;
  title: string;
  onClick?: (id: string) => void;
} & Pick<TimelineModel, 'theme'>;

const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  id,
  description,
  theme,
  onClick,
}) => {
  return (
    <ListItemStyle key={id} theme={theme} onClick={() => onClick(id)}>
      <TitleStyle theme={theme}>{title}</TitleStyle>
      <TitleDescriptionStyle>{description} </TitleDescriptionStyle>
    </ListItemStyle>
  );
};

const List: FunctionComponent<ListModel> = ({ items, theme, onClick }) => {
  return (
    <ListStyle>
      {items?.map(({ title, id, description }) => {
        return (
          <ListItem
            title={title}
            id={id}
            key={id}
            description={description}
            theme={theme}
            onClick={onClick}
          />
        );
      })}
    </ListStyle>
  );
};

export { List };
