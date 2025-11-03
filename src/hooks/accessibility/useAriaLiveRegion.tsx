import { useCallback, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

/**
 * Configuration options for ARIA live region
 */
export interface UseAriaLiveRegionOptions {
  /** Politeness level for screen reader announcements */
  politeness?: 'polite' | 'assertive' | 'off';
  /** Whether to announce all content as one atomic unit */
  atomic?: boolean;
  /** What type of changes to announce */
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  /** Custom container element ID (defaults to auto-generated) */
  containerId?: string;
}

/**
 * Return value from useAriaLiveRegion
 */
export interface UseAriaLiveRegionReturn {
  /** Function to announce a message to screen readers */
  announce: (message: string) => void;
  /** Component to render the live region portal */
  LiveRegion: React.FC;
  /** Container element ID for aria-describedby if needed */
  regionId: string;
}

/**
 * useAriaLiveRegion - Creates accessible screen reader announcements
 *
 * This hook provides a centralized way to make announcements to screen reader users.
 * It uses a portal-based live region to avoid multiple aria-live elements on the page.
 *
 * WCAG References:
 * - 4.1.3 Status Messages (Level A - at least AA)
 * - WAI-ARIA 1.2 Live Regions
 *
 * @example
 * ```typescript
 * const { announce, LiveRegion, regionId } = useAriaLiveRegion({
 *   politeness: 'polite'
 * });
 *
 * // Announce search results
 * useEffect(() => {
 *   if (totalMatches > 0) {
 *     announce(`Found ${totalMatches} matches`);
 *   }
 * }, [totalMatches, announce]);
 *
 * return (
 *   <>
 *     <SearchInput aria-describedby={regionId} />
 *     <LiveRegion />
 *   </>
 * );
 * ```
 */
export const useAriaLiveRegion = (
  options: UseAriaLiveRegionOptions = {},
): UseAriaLiveRegionReturn => {
  const {
    politeness = 'polite',
    atomic = true,
    relevant = 'all',
    containerId,
  } = options;

  const [messages, setMessages] = useState<string[]>([]);
  const regionId = containerId || `aria-live-region-${Math.random().toString(36).substr(2, 9)}`;
  const messageTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  /**
   * Announce a message to screen readers
   * Messages are automatically cleared after a delay
   */
  const announce = useCallback((message: string) => {
    if (!message.trim()) return;

    // Generate unique key for this message
    const messageKey = `${Date.now()}-${Math.random()}`;

    // Add message
    setMessages((prev) => [...prev, message]);

    // Clear existing timeout if any
    const existingTimeout = messageTimeoutsRef.current.get(messageKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    // Clear message after 3 seconds (or longer for longer messages)
    const delay = Math.max(3000, message.length * 50);
    const timeout = setTimeout(() => {
      setMessages((prev) => prev.filter((_, i) => i > 0));
      messageTimeoutsRef.current.delete(messageKey);
    }, delay);

    messageTimeoutsRef.current.set(messageKey, timeout);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      messageTimeoutsRef.current.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, []);

  /**
   * Component that renders the live region portal
   */
  const LiveRegion = useCallback(() => {
    return ReactDOM.createPortal(
      <div
        id={regionId}
        role="status"
        aria-live={politeness}
        aria-atomic={atomic}
        aria-relevant={relevant}
        style={{
          position: 'fixed',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
        }}
        data-testid="aria-live-region"
      >
        {messages.map((msg, index) => (
          <div key={`${index}-${msg}`}>{msg}</div>
        ))}
      </div>,
      document.body,
    );
  }, [regionId, politeness, atomic, relevant, messages]);

  return {
    announce,
    LiveRegion,
    regionId,
  };
};
