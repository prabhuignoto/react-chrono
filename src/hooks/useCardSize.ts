import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

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
  if (!detailsRef.current || !containerRef.current) return false;

  const detailsOffsetTop = detailsRef.current.offsetTop ?? 0;
  const containerHeight = containerRef.current.clientHeight ?? 0;
  const detailsScrollHeight = detailsRef.current.scrollHeight ?? 0;
  const detailsClientHeight = detailsRef.current.clientHeight ?? 0;

  // Check if content is actually hidden or truncated
  // Only return true if there's significant overflow (more than 20px)
  const hasSignificantOverflow = detailsScrollHeight > detailsClientHeight + 20;

  // Check if content needs expansion in either of these ways:
  // 1. The total height (offset + actual height) significantly exceeds container height
  // 2. The content's scroll height exceeds its visible height by a meaningful amount
  return (
    cardHeight + detailsOffsetTop > containerHeight + 20 ||
    hasSignificantOverflow
  );
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
