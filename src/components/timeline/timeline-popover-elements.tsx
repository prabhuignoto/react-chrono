import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import { List } from '../elements/list/list';
import { ListItemModel } from '../elements/list/list.model';
import { PopOver } from '../elements/popover';

type LayoutSwitcherProp = {
  initialTimelineMode?: TimelineMode | 'HORIZONTAL_ALL';
  isDarkMode: boolean;
  mode?: TimelineMode;
  onUpdateTimelineMode: (s: string) => void;
  position: 'top' | 'bottom';
  theme: Theme;
};

type QuickJumpProp = {
  activeItem: number;
  isDarkMode: boolean;
  items: ListItemModel[];
  onActivateItem: (id: string) => void;
  position: 'top' | 'bottom';
  theme: Theme;
};

const LayoutSwitcher: FunctionComponent<LayoutSwitcherProp> = ({
  onUpdateTimelineMode,
  theme,
  mode,
  isDarkMode,
  position,
}: LayoutSwitcherProp) => {
  const { showAllCardsHorizontal, buttonTexts } = useContext(GlobalContext);

  const activeTimelineMode = useMemo(
    () => mode,
    [showAllCardsHorizontal, mode],
  );

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
        onSelect: () => {
          onUpdateTimelineMode('HORIZONTAL');
        },
        selected: activeTimelineMode === 'HORIZONTAL',
        title: 'Default',
      },
      {
        id: 'HORIZONTAL_ALL',
        onSelect: () => {
          onUpdateTimelineMode('HORIZONTAL_ALL');
        },
        selected: activeTimelineMode === 'HORIZONTAL_ALL',
        title: 'Show all cards',
      },
    ],
    [activeTimelineMode],
  );

  return (
    <PopOver
      placeholder={buttonTexts.changeLayout}
      position={position}
      theme={theme}
      isDarkMode={isDarkMode}
    >
      <List
        items={
          mode === 'HORIZONTAL' || mode === 'HORIZONTAL_ALL'
            ? horizontalItems
            : verticalItems
        }
        theme={theme}
        multiSelectable
      />
    </PopOver>
  );
};

const QuickJump: FunctionComponent<QuickJumpProp> = ({
  activeItem,
  items,
  theme,
  onActivateItem,
  isDarkMode,
  position,
}: QuickJumpProp) => {
  const { buttonTexts } = useContext(GlobalContext);
  return (
    <PopOver
      placeholder={buttonTexts.jumpTo}
      position={position}
      theme={theme}
      width={'400px'}
      isDarkMode={isDarkMode}
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
