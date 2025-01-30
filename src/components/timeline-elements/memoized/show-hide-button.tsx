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
    const label = useMemo(() => {
      return show ? 'Hide Text' : 'Show Text';
    }, [show]);

    return textOverlay ? (
      <ShowHideTextButton
        onPointerDown={onToggle}
        theme={theme}
        tabIndex={0}
        onKeyDown={(ev) => ev.key === 'Enter' && onToggle?.(ev)}
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
