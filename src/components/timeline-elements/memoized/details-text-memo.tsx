import { memo, useCallback, useMemo } from 'react';
import { hexToRGBA } from '../../../utils';
import { DetailsTextWrapper } from './../timeline-card-media/timeline-card-media.styles';
import { DetailsTextMemoModel } from './memoized-model';

// Add type for background calculation result
type Background = string;

// Extract background calculation to a custom hook
const useBackgroundColor = (cardDetailsBackGround?: string): Background => {
  return useMemo(() => {
    if (!cardDetailsBackGround) return '';
    return hexToRGBA(cardDetailsBackGround, 0.8);
  }, [cardDetailsBackGround]);
};

// Extract height measurement logic
const useMeasureHeight = (onRender?: (height: number) => void) => {
  return useCallback((node: HTMLDivElement | null) => {
    if (node && onRender) {
      onRender(node.clientHeight);
    }
  }, [onRender]);
};

// Add prop types equality check function
const arePropsEqual = (prev: DetailsTextMemoModel, next: DetailsTextMemoModel): boolean => {
  return prev.height === next.height &&
    prev.show === next.show &&
    prev.expand === next.expand &&
    prev.theme?.cardDetailsBackGround === next.theme?.cardDetailsBackGround;
};

/**
 * Renders additional text details overlay for timeline cards.
 * @param {DetailsTextMemoModel} props - The details text model
 * @returns {JSX.Element | null} The details text overlay
 */
const DetailsTextMemo = memo<DetailsTextMemoModel>(({
  theme,
  show,
  expand,
  textOverlay,
  text: Text,
  height,
  onRender,
}: DetailsTextMemoModel) => {
  const background = useBackgroundColor(theme?.cardDetailsBackGround);
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
}, arePropsEqual);

DetailsTextMemo.displayName = 'DetailsText';

export { DetailsTextMemo };
