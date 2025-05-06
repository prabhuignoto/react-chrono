import { useMemo } from 'react';

/**
 * Custom hook to detect YouTube URLs
 * @param url - The URL to check
 * @returns boolean indicating if the URL is a YouTube URL
 */
export const useYouTubeDetection = (url: string) => {
  return useMemo(
    () => /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(url),
    [url],
  );
};
