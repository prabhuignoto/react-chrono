import { memo, useMemo } from 'react';
import { MaximizeIcon, MinimizeIcon } from '../../icons';
import { ExpandButton } from '../timeline-card-media/timeline-card-media-buttons';
import { ExpandButtonModel } from './memoized-model';

/**
 * Renders a button to expand or collapse timeline card content.
 * @param {ExpandButtonModel} props - The expand button properties
 * @returns {JSX.Element | null} The expand/collapse button
 */
const ExpandButtonMemo = memo<ExpandButtonModel>(
  ({ theme, expanded, onExpand, textOverlay }: ExpandButtonModel) => {
    const { label, action } = useMemo(() => {
      if (expanded) {
        return {
          label: 'Minimize',
          action: () => onExpand?.(null),
        };
      }
      return {
        label: 'Maximize',
        action: () => onExpand?.(null),
      };
    }, [expanded, onExpand]);

    const handleKeyDown = useMemo(() => {
      return (ev: React.KeyboardEvent) => {
        if (ev.key === 'Enter') {
          action();
        }
      };
    }, [action]);

    return textOverlay ? (
      <ExpandButton
        onPointerDown={action}
        onKeyDown={handleKeyDown}
        theme={theme}
        aria-expanded={expanded}
        tabIndex={0}
        aria-label={label}
        title={label}
      >
        {expanded ? <MinimizeIcon /> : <MaximizeIcon />}
      </ExpandButton>
    ) : null;
  },
  (prev, next) => prev.expanded === next.expanded,
);

ExpandButtonMemo.displayName = 'Expand Button';

export { ExpandButtonMemo };
