import React from 'react';
import cls from 'classnames';
import ChevronDown from '../../icons/chev-down';
import { showMoreButton, chevronIconWrapper } from './timeline-card-content.css';

interface CardExpandButtonProps {
  expanded: boolean;
  onToggle: () => void;
  expandable: boolean;
  showMore: string | undefined;
  showLess: string | undefined;
}

export const CardExpandButton: React.FC<CardExpandButtonProps> = React.memo(({
  expanded,
  onToggle,
  expandable,
  showMore = 'Show More',
  showLess = 'Show Less'
}) => {
  if (!expandable) return null;

  return (
    <button
      className={showMoreButton}
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={expanded ? showLess : showMore}
      type="button"
    >
      {expanded ? showLess : showMore}
      <span 
        className={cls(chevronIconWrapper, {
          expanded: expanded
        })}
      >
        <ChevronDown />
      </span>
    </button>
  );
});