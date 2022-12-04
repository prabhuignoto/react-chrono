import React, {
  FunctionComponent,
  RefObject,
  useContext,
  useMemo,
} from 'react';
import { Theme } from '../../../models/Theme';
import { TimelineMode } from '../../../models/TimelineModel';
import { GlobalContext } from '../../GlobalContext';
import ChevronIcon from '../../icons/chev-right';
import {
  ChevronIconWrapper,
  ShowMore,
  SlideShowProgressBar,
  TriangleIconWrapper,
} from './timeline-card-content.styles';

export type ContentFooterProps = {
  canShow: boolean;
  onExpand: () => void;
  paused: boolean;
  progressRef: RefObject<HTMLDivElement>;
  remainInterval: number;
  showMore: boolean;
  showProgressBar?: boolean;
  showReadMore?: boolean | '';
  startWidth: number;
  textContentIsLarge: boolean;
  theme?: Theme;
  triangleDir?: string;
};

const ContentFooter: FunctionComponent<ContentFooterProps> = ({
  theme,
  showProgressBar,
  onExpand,
  triangleDir,
  showMore,
  textContentIsLarge,
  showReadMore,
  remainInterval,
  paused,
  startWidth,
  canShow,
  progressRef,
}) => {
  const { mode } = useContext(GlobalContext);

  const canShowTriangleIcon = useMemo(() => {
    return (['VERTICAL', 'VERTICAL_ALTERNATING'] as TimelineMode[]).some(
      (m) => m === mode,
    );
  }, [mode]);

  return (
    <>
      {showReadMore && textContentIsLarge ? (
        <ShowMore
          className="show-more"
          onClick={onExpand}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              onExpand();
            }
          }}
          role="button"
          show={canShow}
          theme={theme}
          tabIndex={0}
        >
          {<span>{showMore ? 'read less' : 'read more'}</span>}
          <ChevronIconWrapper collapsed={!showMore}>
            <ChevronIcon />
          </ChevronIconWrapper>
        </ShowMore>
      ) : null}

      {showProgressBar && (
        <SlideShowProgressBar
          color={theme?.primary}
          duration={remainInterval}
          paused={paused}
          ref={progressRef}
          startWidth={startWidth}
        ></SlideShowProgressBar>
      )}

      {canShowTriangleIcon && (
        <TriangleIconWrapper
          dir={triangleDir}
          theme={theme}
        ></TriangleIconWrapper>
      )}
    </>
  );
};

export { ContentFooter };
