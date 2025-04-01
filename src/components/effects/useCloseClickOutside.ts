import { RefObject } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import useEscapeKey from '../../hooks/useEscapeKey';

/**
 * Custom hook that handles click outside and escape key events
 * @param el - Reference to the DOM element to watch for outside clicks
 * @param callback - Function to call when a click outside or escape key is detected
 */
export default function useCloseClickOutside(
  el: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  useOutsideClick(el, callback);
  useEscapeKey(callback);
}
