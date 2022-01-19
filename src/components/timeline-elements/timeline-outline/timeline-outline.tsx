import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';
import MenuIcon from '../../icons/menu';
import {
  List,
  ListItem,
  ListItemBullet,
  ListItemName,
  OutlineButton,
  OutlinePane,
  OutlineWrapper,
} from './timeline-outline.styles';
import CloseIcon from '../../icons/close';

export enum OutlinePosition {
  'left',
  'right',
}

export interface TimelineOutlineItem {
  id?: string;
  name?: string;
  selected?: boolean;
}

export interface TimelineOutlineModel {
  items?: TimelineOutlineItem[];
  mode?: TimelineMode;
  onSelect?: (index: number) => void;
  theme?: Theme;
}

const TimelineOutline: React.FunctionComponent<TimelineOutlineModel> = ({
  items = [],
  onSelect,
  theme,
  mode,
}: TimelineOutlineModel) => {
  const [openPane, setOpenPane] = useState(false);
  const [outlineItems, setOutlineItems] = useState<TimelineOutlineItem[]>([]);

  const togglePane = useCallback(() => setOpenPane((prev) => !prev), []);
  const [showList, setShowList] = useState(false);

  const position = useMemo(() => {
    if (mode === 'VERTICAL') {
      return OutlinePosition.left;
    } else if (mode === 'VERTICAL_ALTERNATING') {
      return OutlinePosition.right;
    } else {
      return OutlinePosition.left;
    }
  }, [mode]);

  useEffect(() => {
    setOutlineItems(items.map((item) => ({ ...item, selected: false })));
  }, [items.length]);

  useEffect(() => {
    if (openPane) {
      setTimeout(() => {
        setShowList(openPane);
      }, 300);
    } else {
      setShowList(openPane);
    }
  }, [openPane]);

  const handleSelection = useCallback((index: number, id?: string) => {
    setOutlineItems((items) =>
      items.map((item) => ({ ...item, selected: item.id === id })),
    );

    if (onSelect) {
      onSelect(index);
    }
  }, []);

  return (
    <OutlineWrapper position={position} open={openPane}>
      <OutlineButton
        onClick={togglePane}
        theme={theme}
        open={openPane}
        position={position}
      >
        {openPane ? <CloseIcon /> : <MenuIcon />}
      </OutlineButton>
      <OutlinePane open={openPane}>
        {showList && (
          <List>
            {outlineItems.map((item, index) => (
              <ListItem
                key={item.id}
                onClick={() => handleSelection(index, item.id)}
              >
                <ListItemBullet
                  theme={theme}
                  selected={item.selected}
                ></ListItemBullet>
                <ListItemName theme={theme} selected={item.selected}>
                  {item.name}
                </ListItemName>
              </ListItem>
            ))}
          </List>
        )}
      </OutlinePane>
    </OutlineWrapper>
  );
};

export { TimelineOutline };
