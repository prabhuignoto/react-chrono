import { Theme } from '@models/Theme';
import { TimelineMode } from '@models/TimelineModel';
import { FunctionComponent, useContext, useMemo } from 'react';
import { GlobalContext } from '../GlobalContext';
import { List } from '../elements/list/list';
import { ListItemModel } from '../elements/list/list.model';
import { PopOver } from '../elements/popover';

type CommonProps = {
  isDarkMode: boolean;
  position: 'top' | 'bottom';
  theme: Theme;
};

type LayoutSwitcherProp = {
  initialTimelineMode?: TimelineMode | 'HORIZONTAL_ALL';
  mode?: TimelineMode;
  onUpdateTimelineMode: (s: string) => void;
} & CommonProps;

type QuickJumpProp = {
  activeItem: number;
  items: ListItemModel[];
  onActivateItem: (id: string) => void;
} & CommonProps;

type TextDensity = 'LOW' | 'HIGH';

type ChangeDensityProp = {
  onChange: (value: TextDensity) => void;
  selectedDensity: TextDensity;
} & CommonProps;

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
        description: 'Show cards in a vertical layout',
        id: 'VERTICAL',
        onSelect: () => onUpdateTimelineMode('VERTICAL'),
        selected: activeTimelineMode === 'VERTICAL',
        title: 'Default',
      },
      {
        description: 'Show cards in a vertical layout with alternating fashion',
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
        description: 'Show cards in a horizontal layout',
        id: 'HORIZONTAL',
        onSelect: () => {
          onUpdateTimelineMode('HORIZONTAL');
        },
        selected: activeTimelineMode === 'HORIZONTAL',
        title: 'Default',
      },
      {
        description: 'Show all cards in a horizontal layout',
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

const ChangeDensity: FunctionComponent<ChangeDensityProp> = ({
  onChange,
  selectedDensity,
  theme,
  isDarkMode,
  position,
}) => {
  const { buttonTexts } = useContext(GlobalContext);

  const items = useMemo(
    () => [
      {
        description: 'Show less text',
        id: 'LOW',
        onSelect: () => onChange('LOW'),
        selected: selectedDensity === 'LOW',
        title: 'Low',
      },
      {
        description: 'Show more text',
        id: 'HIGH',
        onSelect: () => onChange('HIGH'),
        selected: selectedDensity === 'HIGH',
        title: 'High',
      },
    ],
    [selectedDensity],
  );

  return (
    <PopOver
      placeholder={buttonTexts.changeDensity}
      theme={theme}
      isDarkMode={isDarkMode}
      position={position}
    >
      <List items={items} theme={theme} multiSelectable />
    </PopOver>
  );
};

export { ChangeDensity, LayoutSwitcher, QuickJump };
