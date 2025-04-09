import React, { memo, FunctionComponent } from 'react';
import { TimelineMode } from '@models/TimelineModel';
import {
  CardMediaHeader,
  MediaDetailsWrapper,
} from '../timeline-card-media.styles';
import { DetailsTextMemo } from '../../memoized/details-text-memo';
import { ExpandButtonMemo } from '../../memoized/expand-button-memo';
import { ShowOrHideTextButtonMemo } from '../../memoized/show-hide-button';
import { SubTitleMemo } from '../../memoized/subtitle-memo';
import { TitleMemo } from '../../memoized/title-memo';
import { ButtonWrapper } from '../timeline-card-media-buttons';
import { Theme } from '@models/Theme';

interface MediaDetailsProps {
  mode: TimelineMode;
  textOverlay: boolean;
  theme: Theme;
  expandDetails: boolean;
  showText: boolean;
  canExpand: boolean;
  gradientColor: string | null;
  title?: string;
  active: boolean;
  url?: string;
  fontSizes: {
    cardTitle?: string;
    cardSubtitle?: string;
  };
  classNames: {
    cardTitle?: string;
    cardSubTitle?: string;
  };
  content?: string | React.ReactNode;
  detailsText?: FunctionComponent;
  onDetailsTextRef: (height?: number) => void;
  toggleText: () => void;
  toggleExpand: () => void;
}

const MediaDetails: React.FC<MediaDetailsProps> = memo(
  ({
    mode,
    textOverlay,
    theme,
    expandDetails,
    showText,
    canExpand,
    gradientColor,
    title,
    active,
    url,
    fontSizes,
    classNames,
    content,
    detailsText,
    onDetailsTextRef,
    toggleText,
    toggleExpand,
  }) => {
    return (
      <MediaDetailsWrapper
        mode={mode}
        $absolutePosition={textOverlay}
        $textInMedia={textOverlay}
        theme={theme}
        $expandFull={expandDetails}
        $showText={showText}
        $expandable={canExpand}
        $gradientColor={gradientColor}
      >
        <CardMediaHeader>
          <TitleMemo
            title={title || ''}
            theme={theme}
            active={active}
            url={url}
            fontSize={fontSizes?.cardTitle}
            classString={classNames?.cardTitle}
          />
          {canExpand && (
            <ButtonWrapper>
              <ShowOrHideTextButtonMemo
                onToggle={toggleText}
                show={showText}
                textOverlay
                theme={theme}
              />
              <ExpandButtonMemo
                theme={theme}
                expanded={expandDetails}
                onExpand={toggleExpand}
                textOverlay
              />
            </ButtonWrapper>
          )}
        </CardMediaHeader>
        {showText && content && (
          <SubTitleMemo
            content={content}
            fontSize={fontSizes?.cardSubtitle}
            classString={classNames?.cardSubTitle}
            padding
            theme={theme}
          />
        )}
        {showText && detailsText && (
          <DetailsTextMemo
            theme={theme}
            show={showText}
            expand={expandDetails}
            text={detailsText}
            onRender={onDetailsTextRef}
            textOverlay={textOverlay}
          />
        )}
      </MediaDetailsWrapper>
    );
  },
);

MediaDetails.displayName = 'MediaDetails';

export default MediaDetails;
