import { memo, useCallback, useMemo } from 'react';
import { hexToRGBA } from '../../../utils';
import { DetailsTextWrapper } from './../timeline-card-media/timeline-card-media.styles';
import { DetailsTextMemoModel } from './memoized-model';

const DetailsTextMemo = memo<DetailsTextMemoModel>(
  ({
    theme,
    show,
    expand,
    textOverlay,
    text,
    height,
    onRender,
  }: DetailsTextMemoModel) => {
    const onTextRef = useCallback((node: HTMLDivElement) => {
      if (node) {
        onRender?.(node.clientHeight);
      }
    }, []);

    const Text = text;

    const background = useMemo(() => {
      const bg = theme?.cardDetailsBackGround || '';
      if (bg) {
        return hexToRGBA(bg, 0.8);
      } else {
        return bg;
      }
    }, [theme?.cardDetailsBackGround]);

    return textOverlay ? (
      <DetailsTextWrapper
        ref={onTextRef}
        // height={expand ? height : 0}
        $expandFull={expand}
        theme={theme}
        $show={show}
        background={background}
      >
        <Text />
      </DetailsTextWrapper>
    ) : null;
  },
  (prev, next) =>
    prev.height === next.height &&
    prev.show === next.show &&
    prev.expand === next.expand &&
    JSON.stringify(prev.theme) === JSON.stringify(next.theme),
);

DetailsTextMemo.displayName = 'Details Text';

export { DetailsTextMemo };
