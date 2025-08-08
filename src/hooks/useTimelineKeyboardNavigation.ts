import { useCallback } from 'react';

interface UseTimelineKeyboardNavigationProps {
  mode: string;
  hasFocus: boolean;
  flipLayout?: boolean;
  onNext: () => void;
  onPrevious: () => void;
  onFirst: () => void;
  onLast: () => void;
}

/**
 * Hook for handling timeline keyboard navigation
 */
export const useTimelineKeyboardNavigation = ({
  mode,
  hasFocus,
  flipLayout = false,
  onNext,
  onPrevious,
  onFirst,
  onLast,
}: UseTimelineKeyboardNavigationProps) => {
  const handleKeySelection = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!hasFocus) return;

      const { key } = event;

      // Common handlers
      switch (key) {
        case 'Home':
          event.preventDefault();
          onFirst();
          return;
        case 'End':
          event.preventDefault();
          onLast();
          return;
      }

      // Mode-specific handlers
      if (mode === 'HORIZONTAL' || mode === 'HORIZONTAL_ALL') {
        if (key === 'ArrowRight') {
          event.preventDefault();
          flipLayout ? onPrevious() : onNext();
        } else if (key === 'ArrowLeft') {
          event.preventDefault();
          flipLayout ? onNext() : onPrevious();
        }
      } else if (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') {
        if (key === 'ArrowDown') {
          event.preventDefault();
          onNext();
        } else if (key === 'ArrowUp') {
          event.preventDefault();
          onPrevious();
        }
      }
    },
    [mode, flipLayout, hasFocus, onNext, onPrevious, onFirst, onLast],
  );

  return { handleKeySelection };
};
