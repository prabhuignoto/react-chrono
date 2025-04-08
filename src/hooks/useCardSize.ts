import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface UseCardSizeProps {
  containerRef: RefObject<HTMLElement | null>;
  detailsRef: RefObject<HTMLElement | null>;
  setStartWidth: (width: number) => void;
}

interface UseCardSizeReturn {
  cardActualHeight: number;
  detailsHeight: number;
  textContentLarge: boolean;
  updateCardSize: (node: HTMLElement | null) => void;
}

export const useCardSize = ({
  containerRef,
  detailsRef,
  setStartWidth,
}: UseCardSizeProps): UseCardSizeReturn => {
  const [dimensions, setDimensions] = useState({
    cardHeight: 0,
    detailsHeight: 0,
    containerWidth: 0,
  });

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          setDimensions((prev) => ({
            ...prev,
            containerWidth: entry.contentRect.width,
          }));
        }
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [containerRef]);

  const updateCardSize = useCallback(
    (node: HTMLElement | null) => {
      if (!node || !detailsRef.current) return;

      const detailsEle = detailsRef.current;
      const { scrollHeight, offsetTop } = detailsEle;

      containerRef.current = node;
      setStartWidth(node.clientWidth);
      setDimensions({
        cardHeight: scrollHeight,
        detailsHeight: detailsEle.offsetHeight,
        containerWidth: node.clientWidth,
      });
    },
    [detailsRef, setStartWidth],
  );

  const { cardActualHeight, detailsHeight, textContentLarge } = useMemo(
    () => ({
      cardActualHeight: dimensions.cardHeight,
      detailsHeight: dimensions.detailsHeight,
      textContentLarge:
        dimensions.cardHeight + (detailsRef.current?.offsetTop || 0) >
        (containerRef.current?.clientHeight || 0),
    }),
    [dimensions, detailsRef],
  );

  return {
    cardActualHeight,
    detailsHeight,
    textContentLarge,
    updateCardSize,
  };
};
