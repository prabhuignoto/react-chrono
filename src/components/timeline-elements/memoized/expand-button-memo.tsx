import { memo, useMemo } from 'react';
import { MaximizeIcon, MinimizeIcon } from '../../icons';
import { ExpandButton } from '../timeline-card-media/timeline-card-media-buttons';
import { ExpandButtonModel } from './memoized-model';

const ExpandButtonMemo = memo<ExpandButtonModel>(
  ({ theme, expanded, onExpand, textOverlay }: ExpandButtonModel) => {
    const label = useMemo(() => {
      return expanded ? 'Minimize' : 'Maximize';
    }, [expanded]);

    return textOverlay ? (
      <ExpandButton
        onPointerDown={onExpand}
        onKeyDown={(ev) => ev.key === 'Enter' && onExpand?.(ev)}
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
