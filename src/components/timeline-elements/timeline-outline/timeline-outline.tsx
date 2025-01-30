import React, { useCallback, useContext, useEffect, useMemo, useState, PropsWithChildren } from 'react';
import { GlobalContext } from '../../GlobalContext';
import CloseIcon from '../../icons/close';
import MenuIcon from '../../icons/menu';
import { OutlineItemList } from './timeline-outline-item-list';
import { OutlinePosition, TimelineOutlineModel } from './timeline-outline.model';
import { OutlineButton, OutlinePane, OutlineWrapper } from './timeline-outline.styles';

class TimelineOutlineError extends React.Component<PropsWithChildren<{ onError?: (error: Error) => void }>> {
  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }
  
  render() {
    return this.props.children;
  }
}

/**
 * TimelineOutline component
 * This component renders the outline pane of a timeline, including a list of items and corresponding selection functionality.
 * It provides an interface to toggle the outline pane and select items within the timeline.
 * The component leverages memoization to prevent unnecessary re-renders and optimizes the rendering process.
 *
 * @property {TimelineOutlineItem[]} items - The items to be displayed in the outline.
 * @property {TimelineMode} mode - The mode of the timeline which determines the outline position.
 * @property {function} onSelect - The callback to be invoked when an item is selected.
 * @property {Theme} theme - The theme object, used for styling.
 * @returns {JSX.Element} The TimelineOutline component.
 */
const TimelineOutline: React.FC<TimelineOutlineModel> = ({
  items = [],
  onSelect,
  mode,
  theme,
  isLoading,
  error,
  onError,
}: TimelineOutlineModel) => {
  const [openPane, setOpenPane] = useState(false);
  const [showList, setShowList] = useState(false);

  const { theme: globalTheme } = useContext(GlobalContext);
  const mergedTheme = theme || globalTheme;

  const togglePane = useCallback(() => setOpenPane((prev) => !prev), []);

  const position = useMemo(
    () =>
      mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING'
        ? OutlinePosition.right
        : OutlinePosition.left,
    [mode],
  );

  useEffect(() => {
    if (openPane) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [openPane]);

  const handleSelection = useCallback(
    (index: number, id?: string) => {
      if (onSelect) onSelect(index);
    },
    [onSelect],
  );

  if (error) {
    return <div role="alert">Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div role="status">Loading outline...</div>;
  }

  return (
    <TimelineOutlineError onError={onError}>
      <OutlineWrapper 
        position={position} 
        open={openPane}
        aria-expanded={openPane}
        role="complementary"
      >
        <OutlineButton
          onPointerDown={togglePane}
          theme={mergedTheme}
          open={openPane}
          position={position}
        >
          {openPane ? <CloseIcon /> : <MenuIcon />}
        </OutlineButton>
        <OutlinePane open={openPane}>
          {showList && (
            <OutlineItemList
              items={items}
              handleSelection={handleSelection}
              theme={mergedTheme}
            />
          )}
        </OutlinePane>
      </OutlineWrapper>
    </TimelineOutlineError>
  );
};

export { TimelineOutline };
