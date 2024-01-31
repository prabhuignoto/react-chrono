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
} & Pick<TimelineModel, 'theme'>;

const ListItem: FunctionComponent<ListItemProps> = ({
  title,
  id,
  description,
  theme,
}) => {
  return (
    <ListItemStyle key={id} theme={theme}>
      <TitleStyle theme={theme}>{title}</TitleStyle>
      <TitleDescriptionStyle>{description} </TitleDescriptionStyle>
    </ListItemStyle>
  );
};

const List: FunctionComponent<ListModel> = ({ items, theme }) => {
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
          />
        );
      })}
    </ListStyle>
  );
};

export { List };
