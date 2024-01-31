import { FunctionComponent } from 'react';
import { ListModel } from './list.model';
import {
  ListItemStyle,
  ListStyle,
  TitleDescriptionStyle,
  TitleStyle,
} from './list.styles';

interface ListItemProps {
  description: string;
  id: string;
  title: string;
}

const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  id,
  description,
}) => {
  return (
    <ListItemStyle key={id}>
      <TitleStyle>{title}</TitleStyle>
      <TitleDescriptionStyle>{description} </TitleDescriptionStyle>
    </ListItemStyle>
  );
};

const List: FunctionComponent<ListModel> = ({ items }) => {
  return (
    <ListStyle>
      {items?.map(({ title, id, description }) => {
        return (
          <ListItem title={title} id={id} key={id} description={description} />
        );
      })}
    </ListStyle>
  );
};

export { List };
