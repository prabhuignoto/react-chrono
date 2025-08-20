import { memo } from 'react';
import { useBackground } from '../../../hooks/useBackground';
import { useMeasureHeight } from '../../../hooks/useMeasureHeight';
import { detailsTextWrapper } from '../timeline-card-media/timeline-card-media.css';
import { DetailsTextMemoModel } from './memoized-model';
import { computeCssVarsFromTheme } from '../../../styles/theme-bridge';
import { useTimelineContext } from '../../contexts';

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
    const { isDarkMode } = useTimelineContext();
    const background = useBackground(theme?.cardDetailsBackGround);
    const measureRef = useMeasureHeight(onRender);
    const themeStyle = computeCssVarsFromTheme(theme, isDarkMode);

    if (!textOverlay) return null;

    return (
      <div
        ref={measureRef}
        className={detailsTextWrapper}
        style={{
          ...themeStyle,
          background,
          height: show ? '100%' : 0,
          overflow: expand ? 'auto' : 'hidden',
        }}
      >
        <Text />
      </div>
    );
  },
  arePropsEqual,
);

DetailsTextMemo.displayName = 'DetailsText';

export { DetailsTextMemo };
