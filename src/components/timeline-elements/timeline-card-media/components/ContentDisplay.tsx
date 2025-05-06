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
import { ForwardRefExoticComponent } from 'react';
import { TextOrContentModel } from '../../timeline-card-content/text-or-content';

interface ContentDisplayProps {
  mode: TimelineMode;
  textOverlay: boolean;
  theme: any;
  expandDetails: boolean;
  showText: boolean;
  canExpand: boolean;
  canShowGradient: boolean;
  gradientColor: string | null;
  title?: ReactNode;
  active: boolean;
  url?: string;
  fontSizes: any;
  classNames: any;
  toggleText: () => void;
  toggleExpand: () => void;
  content?: ReactNode;
  canShowTextMemo: boolean;
  detailsText?: ForwardRefExoticComponent<TextOrContentModel>;
  onDetailsTextRef: (height?: number) => void;
}

/**
 * Renders the text content section of a timeline card
 */
export const ContentDisplay = memo(
  ({
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
  }: ContentDisplayProps) => {
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
        {canShowTextMemo && (
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
