import { useCallback, useState } from 'react';

/**
 * Custom hook to handle text display toggle functionality
 * @returns Object with toggle states and functions
 */
export const useToggleControls = () => {
  const [expandDetails, setExpandDetails] = useState(false);
  const [showText, setShowText] = useState(true);

  const toggleExpand = useCallback(() => {
    setExpandDetails((prev) => !prev);
    setShowText(true);
  }, []);

  const toggleText = useCallback(() => {
    setExpandDetails(false);
    setShowText((prev) => !prev);
  }, []);

  return {
    expandDetails,
    showText,
    toggleExpand,
    toggleText,
  };
};
