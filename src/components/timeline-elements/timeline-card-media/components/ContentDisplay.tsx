import React, { useRef, ReactNode, useState, useCallback } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  cardMediaHeader,
  mediaDetailsWrapper,
  mediaDetailsAbsolute,
  mediaDetailsCard,
  mediaDetailsGradient,
  mediaDetailsMinimized,
  mediaDetailsMaximized,
} from '../timeline-card-media.css';
import { gradientVar } from '../timeline-card-media.css';
import { TitleMemo } from '../../memoized/title-memo';
import { ButtonWrapper } from '../timeline-card-media-buttons';
import { ShowOrHideTextButtonMemo } from '../../memoized/show-hide-button';
import { ExpandButtonMemo } from '../../memoized/expand-button-memo';
import { SubTitleMemo } from '../../memoized/subtitle-memo';
import { DetailsTextMemo } from '../../memoized/details-text-memo';
import { TimelineMode } from '@models/TimelineModel';

export interface ContentDisplayProps {
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

const ContentDisplayComponent: React.FunctionComponent<ContentDisplayProps> = (
  props,
) => {
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
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  return (
    <div
      ref={moreRef}
      className={[
        mediaDetailsWrapper,
        textOverlay ? mediaDetailsAbsolute : undefined,
        canExpand || !showText ? mediaDetailsCard : undefined,
        canShowGradient ? mediaDetailsGradient : undefined,
        textOverlay && isMinimized ? mediaDetailsMinimized : undefined,
        textOverlay && !isMinimized ? mediaDetailsMaximized : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        canShowGradient && gradientColor
          ? assignInlineVars({ [gradientVar]: gradientColor })
          : undefined
      }
      onClick={textOverlay && isMinimized ? toggleMinimize : undefined}
    >
      <div className={cardMediaHeader}>
        <TitleMemo
          title={title}
          theme={theme}
          active={active}
          url={url ?? ''}
          fontSize={fontSizes?.cardTitle}
          classString={classNames?.cardTitle}
        />
        {(canExpand || textOverlay) && (
          <ButtonWrapper>
            {canExpand && (
              <>
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
              </>
            )}
            {textOverlay && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMinimize();
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: theme?.cardSubTitle || '#666',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  padding: '0.25rem',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label={isMinimized ? 'Maximize text' : 'Minimize text'}
                title={isMinimized ? 'Maximize text' : 'Minimize text'}
              >
                {isMinimized ? '⬆️' : '⬇️'}
              </button>
            )}
          </ButtonWrapper>
        )}
      </div>
      {showText && !isMinimized && (
        <SubTitleMemo
          content={content}
          fontSize={fontSizes?.cardSubtitle}
          classString={classNames?.cardSubTitle}
          padding
          theme={theme}
        />
      )}
      {canShowTextMemo && detailsText && !isMinimized && (
        <DetailsTextMemo
          theme={theme}
          show={showText}
          expand={expandDetails}
          text={detailsText}
          onRender={onDetailsTextRef}
          textOverlay={textOverlay}
        />
      )}
    </div>
  ) as React.ReactElement;
};

// Export the memoized component
export const ContentDisplay = ContentDisplayComponent;

// Add display name for DevTools
ContentDisplay.displayName = 'ContentDisplay';
