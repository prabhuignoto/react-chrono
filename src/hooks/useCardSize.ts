import {
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

interface CardDimensions {
  cardHeight: number;
  detailsHeight: number;
  containerWidth: number;
}

const calculateTextContentSize = (
  cardHeight: number,
  detailsRef: RefObject<HTMLElement | null>,
  containerRef: RefObject<HTMLElement | null>,
): boolean => {
  const detailsOffsetTop = detailsRef.current?.offsetTop || 0;
  const containerHeight = containerRef.current?.clientHeight || 0;
  return cardHeight + detailsOffsetTop > containerHeight;
};

export const useCardSize = ({
  containerRef,
  detailsRef,
  setStartWidth,
}: UseCardSizeProps): UseCardSizeReturn => {
  const [dimensions, setDimensions] = useState<CardDimensions>({
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
      const { scrollHeight } = detailsEle;

      containerRef.current = node;
      setStartWidth(node.clientWidth);
      setDimensions({
        cardHeight: scrollHeight,
        detailsHeight: detailsEle.offsetHeight,
        containerWidth: node.clientWidth,
      });
    },
    [detailsRef, setStartWidth, containerRef],
  );

  const { cardActualHeight, detailsHeight, textContentLarge } = useMemo(
    () => ({
      cardActualHeight: dimensions.cardHeight,
      detailsHeight: dimensions.detailsHeight,
      textContentLarge: calculateTextContentSize(
        dimensions.cardHeight,
        detailsRef,
        containerRef,
      ),
    }),
    [dimensions, detailsRef, containerRef],
  );

  return {
    cardActualHeight,
    detailsHeight,
    textContentLarge,
    updateCardSize,
  };
};
