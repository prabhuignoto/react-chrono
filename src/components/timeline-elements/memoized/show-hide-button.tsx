import { memo, useMemo } from 'react';
import { MinusIcon, PlusIcon } from '../../icons';
import { ShowHideTextButton } from '../timeline-card-media/timeline-card-media-buttons';
import { ShowHideTextButtonModel } from './memoized-model';

/**
 * Renders a button to toggle showing or hiding text content.
 * @param {ShowHideTextButtonModel} props - Button properties
 * @returns {JSX.Element | null} The toggle button
 */
const ShowOrHideTextButtonMemo = memo<ShowHideTextButtonModel>(
  ({ textOverlay, onToggle, theme, show }: ShowHideTextButtonModel) => {
    const { label, action } = useMemo(() => {
      if (show) {
        return {
          label: 'Hide Text',
          action: (ev: React.PointerEvent | React.KeyboardEvent) =>
            onToggle?.(ev),
        };
      }
      return {
        label: 'Show Text',
        action: (ev: React.PointerEvent | React.KeyboardEvent) =>
          onToggle?.(ev),
      };
    }, [show, onToggle]);

    const handleKeyDown = useMemo(() => {
      return (ev: React.KeyboardEvent) => {
        if (ev.key === 'Enter') {
          action(ev);
        }
      };
    }, [action]);

    const handlePointerDown = useMemo(() => {
      return (ev: React.PointerEvent) => {
        action(ev);
      };
    }, [action]);

    return textOverlay ? (
      <ShowHideTextButton
        onPointerDown={handlePointerDown}
        theme={theme}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={label}
        title={label}
      >
        {show ? <MinusIcon /> : <PlusIcon />}
      </ShowHideTextButton>
    ) : null;
  },
);

ShowOrHideTextButtonMemo.displayName = 'Show Hide Text Button';

export { ShowOrHideTextButtonMemo };
