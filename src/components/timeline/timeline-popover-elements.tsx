import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import { useMemo } from 'react';
import { List } from '../list/list';
import { ListItemModel } from '../list/list.model';
import { PopOver } from '../popover';

type LayoutSwitcherProp = {
  initialTimelineMode?: TimelineMode | 'HORIZONTAL_ALL';
  mode: 'VERTICAL' | 'HORIZONTAL';
  onUpdateTimelineMode: (s: string) => void;
  theme: Theme;
};

const LayoutSwitcher: (p: LayoutSwitcherProp) => any = ({
  initialTimelineMode,
  mode,
  onUpdateTimelineMode,
  theme,
}: LayoutSwitcherProp) => {
  // vertical list options when the mode is `VERTICAL`
  const verticalItems = useMemo(
    () => [
      {
        id: 'VERTICAL',
        onSelect: () => onUpdateTimelineMode('VERTICAL'),
        selected: initialTimelineMode === 'VERTICAL',
        title: 'Vertical',
      },
      {
        id: 'VERTICAL_ALTERNATING',
        onSelect: () => onUpdateTimelineMode('VERTICAL_ALTERNATING'),
        selected: initialTimelineMode === 'VERTICAL_ALTERNATING',
        title: 'Vertical Alternating',
      },
    ],
    [initialTimelineMode],
  );

  // horizontal list OF options when the mode is `HORIZONTAL`
  const horizontalItems = useMemo(
    () => [
      {
        id: 'HORIZONTAL',
        onSelect: () => onUpdateTimelineMode('HORIZONTAL'),
        selected: initialTimelineMode === 'HORIZONTAL',
        title: 'Horizontal Layout',
      },
      {
        id: 'HORIZONTAL_ALL',
        onSelect: () => onUpdateTimelineMode('HORIZONTAL_ALL'),
        selected: initialTimelineMode === 'HORIZONTAL_ALL',
        title: 'Horizontal Show All',
      },
    ],
    [initialTimelineMode],
  );

  return (
    <PopOver placeholder="Change layout" position="down" theme={theme}>
      <List
        items={mode === 'HORIZONTAL' ? horizontalItems : verticalItems}
        theme={theme}
        multiSelectable
      />
    </PopOver>
  );
};

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
      placeholder="Jump to a date"
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
