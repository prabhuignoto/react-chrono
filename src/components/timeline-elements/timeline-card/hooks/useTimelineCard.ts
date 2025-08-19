import { useCallback, useEffect, useMemo, useRef } from 'react';
import cls from 'classnames';
import { useTimelineContext } from '../../../contexts';

interface UseTimelineCardProps {
  active?: boolean;
  autoScroll?: (params: {
    pointOffset?: number;
    contentHeight?: number;
    contentOffset?: number;
  }) => void;
  slideShowRunning?: boolean;
  cardLess?: boolean;
  showAllCardsHorizontal?: boolean;
  id?: string;
  onClick?: (id?: string) => void;
  mode?: 'HORIZONTAL' | 'VERTICAL' | 'VERTICAL_ALTERNATING' | 'HORIZONTAL_ALL';
  position?: 'TOP' | 'BOTTOM';
  iconChild?: React.ReactNode;
}

export const useTimelineCard = ({
  active,
  autoScroll,
  slideShowRunning,
  cardLess,
  showAllCardsHorizontal,
  id,
  onClick,
  mode,
  position,
  iconChild,
}: UseTimelineCardProps) => {
  const circleRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { disableClickOnCircle, disableInteraction, disableAutoScrollOnClick } =
    useTimelineContext();

  const handleClick = useCallback(() => {
    if (
      !disableClickOnCircle &&
      !disableInteraction &&
      !disableAutoScrollOnClick &&
      onClick &&
      !slideShowRunning
    ) {
      onClick(id);
    }
  }, [
    disableClickOnCircle,
    disableInteraction,
    disableAutoScrollOnClick,
    onClick,
    slideShowRunning,
    id,
  ]);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;

      if (circle && wrapper) {
        const circleOffsetLeft = circle.offsetLeft;
        const wrapperOffsetLeft = wrapper.offsetLeft;

        autoScroll?.({
          pointOffset: circleOffsetLeft + wrapperOffsetLeft,
        });

        // Bring the timeline point itself to keyboard focus for accessibility
        requestAnimationFrame(() => {
          try {
            circle.focus({ preventScroll: true });
          } catch (_) {
            // ignore focus errors
          }
        });
      }
    }
  }, [active, autoScroll, mode]);

  const modeLower = useMemo(() => mode?.toLowerCase(), [mode]);

  const containerClass = useMemo(
    () =>
      cls(
        'timeline-horz-card-wrapper',
        modeLower,
        position === 'TOP' ? 'bottom' : 'top',
        showAllCardsHorizontal ? 'show-all' : '',
      ),
    [modeLower, position, showAllCardsHorizontal],
  );

  const titleClass = useMemo(
    () => cls(modeLower, position),
    [modeLower, position],
  );

  const circleClass = useMemo(
    () =>
      cls(
        'timeline-circle',
        { 'using-icon': !!iconChild },
        modeLower,
        active ? 'active' : 'in-active',
      ),
    [active, iconChild, modeLower],
  );

  const canShowTimelineContent = useMemo(
    () => (active && !cardLess) || showAllCardsHorizontal,
    [active, cardLess, showAllCardsHorizontal],
  );

  return {
    circleRef,
    wrapperRef,
    contentRef,
    handleClick,
    modeLower,
    containerClass,
    titleClass,
    circleClass,
    canShowTimelineContent,
  };
};
