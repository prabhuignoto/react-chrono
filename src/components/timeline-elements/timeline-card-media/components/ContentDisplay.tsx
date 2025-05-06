import React, { memo, useRef, ReactNode } from 'react';
import {
  CardMediaHeader,
  MediaDetailsWrapper,
} from '../timeline-card-media.styles';
import { TitleMemo } from '../../memoized/title-memo';
import { ButtonWrapper } from '../timeline-card-media-buttons';
import { ShowOrHideTextButtonMemo } from '../../memoized/show-hide-button';
import { ExpandButtonMemo } from '../../memoized/expand-button-memo';
import { SubTitleMemo } from '../../memoized/subtitle-memo';
import { DetailsTextMemo } from '../../memoized/details-text-memo';
import { TimelineMode } from '@models/TimelineModel';

interface ContentDisplayProps {
  readonly mode: TimelineMode;
  readonly textOverlay: boolean;
  readonly theme: any;
  readonly expandDetails: boolean;
  readonly showText: boolean;
  readonly canExpand: boolean;
  readonly canShowGradient: boolean;
  readonly gradientColor: string | null;
  readonly title?: ReactNode;
  readonly active: boolean;
  readonly url?: string;
  readonly fontSizes: any;
  readonly classNames: any;
  readonly toggleText: () => void;
  readonly toggleExpand: () => void;
  readonly content?: ReactNode;
  readonly canShowTextMemo: boolean;
  readonly detailsText?: any; // Use 'any' to bypass type checking temporarily
  readonly onDetailsTextRef: (height?: number) => void;
}

function ContentDisplayComponent(props: ContentDisplayProps) {
  const {
    mode,
    textOverlay,
    theme,
    expandDetails,
    showText,
    canExpand,
    canShowGradient,
    gradientColor,
    title,
    active,
    url,
    fontSizes,
    classNames,
    toggleText,
    toggleExpand,
    content,
    canShowTextMemo,
    detailsText,
    onDetailsTextRef,
  } = props;

  const moreRef = useRef(null);

  return (
    <MediaDetailsWrapper
      mode={mode}
      $absolutePosition={textOverlay}
      $textInMedia={textOverlay}
      ref={moreRef}
      theme={theme}
      $expandFull={expandDetails}
      $showText={showText}
      $expandable={canExpand}
      $gradientColor={canShowGradient ? gradientColor : null}
    >
      <CardMediaHeader>
        <TitleMemo
          title={title}
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
      {showText && (
        <SubTitleMemo
          content={content}
          fontSize={fontSizes?.cardSubtitle}
          classString={classNames?.cardSubTitle}
          padding
          theme={theme}
        />
      )}
      {canShowTextMemo && detailsText && (
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
}

// Using `any` type assertion to bypass React 19 type issues
export const ContentDisplay = memo(ContentDisplayComponent as any);
