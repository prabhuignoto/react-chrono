import { Theme } from '@models/Theme';
import { List } from '../list/list';
import { ListItemModel } from '../list/list.model';
import { PopOver } from '../popover';

const LayoutSwitcher = (
  theme: Theme,
  onUpdateTimelineMode: (s: string) => void,
) => (
  <PopOver placeholder="Change the layout" position="down" theme={theme}>
    <List
      items={[
        {
          id: 'VERTICAL',
          onSelect: () => onUpdateTimelineMode('VERTICAL'),
          title: 'Vertical Layout',
        },
        {
          id: 'VERTICAL_ALTERNATING',
          onSelect: () => onUpdateTimelineMode('VERTICAL_ALTERNATING'),
          title: 'Vertical Alternating Layout',
        },
        {
          id: 'HORIZONTAL',
          onSelect: () => onUpdateTimelineMode('HORIZONTAL'),
          title: 'Horizontal Layout',
        },
      ]}
      theme={theme}
      multiSelectable
    />
  </PopOver>
);

type QuickJumpProp = {
  activeItem: number;
  items: ListItemModel[];
  onActivateItem: (id: string) => void;
  theme: Theme;
};

const QuickJump: (prop: QuickJumpProp) => JSX.Element = ({
  activeItem,
  items,
  theme,
  onActivateItem,
}: QuickJumpProp) => {
  return (
    <PopOver
      placeholder="Jump to"
      position="down"
      theme={theme}
      width={'400px'}
    >
      <List
        items={items.map((item, index) => ({
          active: index === activeItem,
          description: item.description,
          id: item.id,
          label: item.title,
          onSelect: () => {},
          title: item.title,
        }))}
        theme={theme}
        onClick={onActivateItem}
      />
    </PopOver>
  );
};

export { LayoutSwitcher, QuickJump };
