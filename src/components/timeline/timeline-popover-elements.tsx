import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import { List } from '../list/list';
import { ListItemModel } from '../list/list.model';
import { PopOver } from '../popover';

type LayoutSwitcherProp = {
  initialTimelineMode?: TimelineMode | 'HORIZONTAL_ALL';
  mode?: TimelineMode;
  onUpdateTimelineMode: (s: string) => void;
  theme: Theme;
};

const LayoutSwitcher: FunctionComponent<LayoutSwitcherProp> = ({
  onUpdateTimelineMode,
  theme,
  mode,
}: LayoutSwitcherProp) => {
  const { showAllCardsHorizontal } = useContext(GlobalContext);

  const activeTimelineMode = useMemo(
    () => (showAllCardsHorizontal ? 'HORIZONTAL_ALL' : mode),
    [showAllCardsHorizontal, mode],
  );

  // console.log(mode);
  const verticalItems = useMemo(
    () => [
      {
        id: 'VERTICAL',
        onSelect: () => onUpdateTimelineMode('VERTICAL'),
        selected: activeTimelineMode === 'VERTICAL',
        title: 'Default',
      },
      {
        id: 'VERTICAL_ALTERNATING',
        onSelect: () => onUpdateTimelineMode('VERTICAL_ALTERNATING'),
        selected: activeTimelineMode === 'VERTICAL_ALTERNATING',
        title: 'Alternating',
      },
    ],
    [activeTimelineMode],
  );

  // horizontal list OF options when the mode is `HORIZONTAL`
  const horizontalItems = useMemo(
    () => [
      {
        id: 'HORIZONTAL',
        onSelect: () => onUpdateTimelineMode('HORIZONTAL'),
        selected: activeTimelineMode === 'HORIZONTAL',
        title: 'Default',
      },
      {
        id: 'HORIZONTAL_ALL',
        onSelect: () => onUpdateTimelineMode('HORIZONTAL_ALL'),
        selected: activeTimelineMode === 'HORIZONTAL_ALL',
        title: 'Show all cards',
      },
    ],
    [activeTimelineMode],
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
