import { memo, useCallback } from 'react';
import { useBackground } from '../../../hooks/useBackground';
import { DetailsTextWrapper } from '../timeline-card-media/timeline-card-media.styles';
import { DetailsTextMemoModel } from './memoized-model';

const useMeasureHeight = (onRender?: (height: number) => void) => {
  return useCallback(
    (node: HTMLDivElement | null) => {
      if (node && onRender) {
        requestAnimationFrame(() => onRender(node.clientHeight));
      }
    },
    [onRender],
  );
};

const arePropsEqual = (
  prev: DetailsTextMemoModel,
  next: DetailsTextMemoModel,
): boolean => {
  return (
    prev.height === next.height &&
    prev.show === next.show &&
    prev.expand === next.expand &&
    prev.theme?.cardDetailsBackGround === next.theme?.cardDetailsBackGround
  );
};

const DetailsTextMemo = memo<DetailsTextMemoModel>(
  ({ theme, show, expand, textOverlay, text: Text, onRender }) => {
    const background = useBackground(theme?.cardDetailsBackGround);
    const measureRef = useMeasureHeight(onRender);

    if (!textOverlay) return null;

    return (
      <DetailsTextWrapper
        ref={measureRef}
        $expandFull={expand}
        theme={theme}
        $show={show}
        background={background}
      >
        <Text />
      </DetailsTextWrapper>
    );
  },
  arePropsEqual,
);

DetailsTextMemo.displayName = 'DetailsText';

export { DetailsTextMemo };
