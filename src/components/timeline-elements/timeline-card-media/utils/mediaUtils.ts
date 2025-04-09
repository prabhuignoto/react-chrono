import { hexToRGBA } from '@utils/index';
import { Theme } from '@models/Theme';
export const isYouTubeUrl = (url: string): boolean => {
  return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url);
};

export const getYouTubeEmbedUrl = (url: string, autoplay: boolean): string => {
  const videoId =
    /(?:youtube\.com\/(?:embed\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/.exec(
      url,
    )?.[1];
  return `https://www.youtube.com/embed/${videoId}?${autoplay ? 'autoplay=1&' : ''}enablejsapi=1`;
};

export const getGradientColor = (theme: Theme): string | null => {
  return theme?.cardDetailsBackGround
    ? hexToRGBA(theme.cardDetailsBackGround, 0.8)
    : null;
};

export const getCardHeightWithTextOverlay = (cardHeight: number): number => {
  return cardHeight;
};

export const getCardHeightWithoutTextOverlay = (
  mediaHeight: number,
): number => {
  return mediaHeight;
};

export const shouldShowArrow = (
  mode: string,
  textOverlay: boolean,
): boolean => {
  return (
    (mode === 'VERTICAL' || mode === 'VERTICAL_ALTERNATING') && textOverlay
  );
};

export const shouldShowText = (
  showText: boolean,
  detailsText: any,
): boolean => {
  return showText && !!detailsText;
};

export const shouldShowTextContent = (
  title: string,
  content: string,
  detailsText: any,
): boolean => {
  return !!(title || content || detailsText);
};

export const shouldExpand = (
  textOverlay: boolean,
  detailsText: any,
): boolean => {
  return textOverlay && !!detailsText;
};

export const shouldShowGradient = (
  expandDetails: boolean,
  showText: boolean,
  textOverlay: boolean,
): boolean => {
  return !expandDetails && showText && textOverlay;
};

export const shouldShowProgressBar = (
  showProgressBar: boolean,
  textOverlay: boolean,
): boolean => {
  return showProgressBar && textOverlay;
};
