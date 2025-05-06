import { ReactNode, useMemo, ForwardRefExoticComponent } from 'react';
import { hexToRGBA } from '@utils/index';
import { TextOrContentModel } from '../../timeline-card-content/text-or-content';

interface UseViewOptionsParams {
  showText: boolean;
  expandDetails: boolean;
  textOverlay: boolean;
  detailsText?: ForwardRefExoticComponent<TextOrContentModel>;
  title?: ReactNode;
  content?: ReactNode;
  theme: any;
  cardHeight: number;
  mediaHeight: number;
}

interface UseViewOptionsResult {
  canShowTextMemo: boolean;
  canShowTextContent: boolean;
  canExpand: boolean;
  gradientColor: string;
  canShowGradient: boolean;
  getCardHeight: number;
}

/**
 * Custom hook for handling view options and memoized calculated values
 */
export const useViewOptions = ({
  showText,
  expandDetails,
  textOverlay,
  detailsText,
  title,
  content,
  theme,
  cardHeight,
  mediaHeight,
}: UseViewOptionsParams): UseViewOptionsResult => {
  const canShowTextMemo = useMemo(
    () => showText && !!detailsText,
    [showText, detailsText],
  );

  const canShowTextContent = useMemo(
    () => !!(title ?? content ?? detailsText),
    [title, content, detailsText],
  );

  const canExpand = useMemo(
    () => textOverlay && !!detailsText,
    [textOverlay, detailsText],
  );

  const gradientColor = useMemo(
    () => hexToRGBA(theme?.cardDetailsBackGround ?? '', 0.8),
    [theme?.cardDetailsBackGround],
  );

  const canShowGradient = useMemo(
    () => !expandDetails && showText && textOverlay,
    [expandDetails, showText, textOverlay],
  );

  const getCardHeight = useMemo(
    () => (textOverlay ? cardHeight : mediaHeight),
    [textOverlay, cardHeight, mediaHeight],
  );

  return {
    canShowTextMemo,
    canShowTextContent,
    canExpand,
    gradientColor,
    canShowGradient,
    getCardHeight,
  };
};
