import { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import cls from 'classnames';
import { GlobalContext } from '../../../GlobalContext';

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
}) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { disableClickOnCircle } = useContext(GlobalContext);

  const handleClick = useCallback(() => {
    if (!disableClickOnCircle && onClick && !slideShowRunning) {
      onClick(id);
    }
  }, [disableClickOnCircle, onClick, slideShowRunning, id]);

  useEffect(() => {
    if (active) {
      const circle = circleRef.current;
      const wrapper = wrapperRef.current;

      if (circle && wrapper) {
        const circleOffsetLeft = circle.offsetLeft;
        const wrapperOffsetLeft = wrapper.offsetLeft;

        autoScroll?.({
          pointOffset: circleOffsetLeft + wrapperOffsetLeft,
          pointWidth: circle.clientWidth,
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
