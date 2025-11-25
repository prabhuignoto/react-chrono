import React, { useRef, ReactNode, useState, useCallback } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  cardMediaHeader,
  mediaDetailsWrapper,
  mediaDetailsAbsolute,
  mediaDetailsCard,
  mediaDetailsGradient,
  mediaDetailsMaximized,
  mediaDetailsExpanded,
  readMoreButton,
} from '../timeline-card-media.css';
import { gradientVar } from '../timeline-card-media.css';
import { TitleMemo } from '../../memoized/title-memo';
import { ButtonWrapper } from '../timeline-card-media-buttons';
import { ShowOrHideTextButtonMemo } from '../../memoized/show-hide-button';
import { ExpandButtonMemo } from '../../memoized/expand-button-memo';
import { SubTitleMemo } from '../../memoized/subtitle-memo';
import { DetailsTextMemo } from '../../memoized/details-text-memo';
import { TimelineMode } from '@models/TimelineModel';
import { pickDefined } from '../../../../utils/propUtils';

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

  const moreRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  const toggleReadMore = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    },
    [isExpanded],
  );

  React.useLayoutEffect(() => {
    if (moreRef.current && textOverlay) {
      const checkOverflow = () => {
        if (moreRef.current) {
          const containerHeight = moreRef.current.clientHeight;

          // Calculate the total height of all children, checking their scrollHeight too
          let totalChildrenHeight = 0;
          let hasInternalOverflow = false;

          Array.from(moreRef.current.children).forEach((child) => {
            const childElement = child as HTMLElement;
            const childHeight = childElement.offsetHeight;
            const childScrollHeight = childElement.scrollHeight;

            totalChildrenHeight += childHeight;

            // Check if this child has internal overflow
            if (childScrollHeight > childHeight) {
              console.log('Child has internal overflow:', {
                childTagName: childElement.tagName,
                childClassName: childElement.className,
                childHeight,
                childScrollHeight,
              });
              hasInternalOverflow = true;
            }
          });

          console.log('Overflow check:', {
            containerHeight,
            totalChildrenHeight,
            hasInternalOverflow,
            hasOverflow:
              totalChildrenHeight > containerHeight || hasInternalOverflow,
            showText,
            hasDetailsText: !!detailsText,
            hasContent: !!content,
            isExpanded,
          });

          // Check if children exceed container height OR if any child has internal overflow
          const hasOverflow =
            totalChildrenHeight > containerHeight + 5 || hasInternalOverflow;
          if (hasOverflow) {
            console.log('SETTING SHOW READ MORE TO TRUE');
            setShowReadMore(true);
          } else {
            console.log('SETTING SHOW READ MORE TO FALSE');
            setShowReadMore(false);
          }
        }
      };

      // Check immediately
      checkOverflow();

      // Also check after delays to ensure content is rendered
      const timeoutId1 = setTimeout(checkOverflow, 100);
      const timeoutId2 = setTimeout(checkOverflow, 300);
      const timeoutId3 = setTimeout(checkOverflow, 500);

      // Use ResizeObserver to detect when content size changes
      const resizeObserver = new ResizeObserver(() => {
        console.log('ResizeObserver triggered');
        checkOverflow();
      });

      if (moreRef.current) {
        resizeObserver.observe(moreRef.current);
      }

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
        clearTimeout(timeoutId3);
        resizeObserver.disconnect();
      };
    }
    return undefined;
  }, [textOverlay, content, detailsText, title, showText, isExpanded]);

  return (
    <div
      ref={moreRef}
      className={[
        mediaDetailsWrapper,
        textOverlay ? mediaDetailsAbsolute : undefined,
        canExpand || !showText ? mediaDetailsCard : undefined,
        canShowGradient ? mediaDetailsGradient : undefined,
        textOverlay && !isExpanded ? mediaDetailsMaximized : undefined,
        textOverlay && isExpanded ? mediaDetailsExpanded : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={
        canShowGradient && gradientColor
          ? assignInlineVars({ [gradientVar]: gradientColor })
          : undefined
      }
    >
      <div className={cardMediaHeader}>
        <TitleMemo
          title={title}
          theme={theme}
          active={active}
          url={url ?? ''}
          fontSize={fontSizes?.cardTitle}
          classString={classNames?.cardTitle}
          {...pickDefined({
            color: theme?.cardTitleColor || theme?.titleColor,
          })}
        />
        {canExpand && !textOverlay && (
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
      </div>
      {showText && (
        <SubTitleMemo
          content={content}
          fontSize={fontSizes?.cardSubtitle}
          classString={classNames?.cardSubTitle}
          padding
          theme={theme}
          {...pickDefined({
            color: theme?.cardSubtitleColor,
          })}
        />
      )}
      {canShowTextMemo && detailsText && (
        <DetailsTextMemo
          theme={theme}
          show={showText}
          expand={textOverlay ? isExpanded : expandDetails}
          text={detailsText}
          onRender={onDetailsTextRef}
          textOverlay={textOverlay}
        />
      )}
      {textOverlay && showReadMore && (
        <button
          className={readMoreButton}
          onClick={toggleReadMore}
          type="button"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  ) as React.ReactElement;
};

// Export the memoized component
export const ContentDisplay = ContentDisplayComponent;

// Add display name for DevTools
ContentDisplay.displayName = 'ContentDisplay';
