import React from 'react';

/**
 * Timeline utility functions for managing timeline functionality
 */

/**
 * Safely extracts searchable text from potentially complex React node content
 * Recursively processes React nodes into plain text for search operations
 * @param content - React node (string, array, or component) to extract text from
 * @returns Plain text string suitable for searching
 */
export const getSearchableText = (content: React.ReactNode): string => {
  if (content === null || content === undefined) {
    return '';
  }
  if (typeof content === 'string') {
    return content;
  }
  if (Array.isArray(content)) {
    return content
      .map((item) => getSearchableText(item))
      .filter(Boolean)
      .join(' ');
  }
  // Handle React elements with children or other complex node types
  if (React.isValidElement(content)) {
    const elementProps = content.props as { children?: React.ReactNode };
    if (elementProps.children) {
      return getSearchableText(elementProps.children);
    }
  }
  return '';
};

/**
 * Pauses video embeds (primarily YouTube) within an element
 * @param element - HTML element containing video iframes to pause
 */
export const pauseVideoEmbeds = (element: HTMLElement | null): void => {
  if (!element) return;

  try {
    const iframes = element.querySelectorAll('iframe');
    iframes.forEach((iframe) => {
      const src = iframe.getAttribute('src') || '';
      if (!src || !iframe.contentWindow) return;

      // Determine appropriate target origin
      let targetOrigin = '*';
      if (src.includes('youtube.com')) {
        targetOrigin = 'https://www.youtube.com';
      } else if (src.startsWith('https://')) {
        try {
          targetOrigin = new URL(src).origin;
        } catch {
          targetOrigin = '*';
        }
      }

      try {
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"stopVideo","args":""}',
          targetOrigin,
        );
      } catch (error) {
        console.error('Error sending message to iframe:', error);
      }
    });
  } catch (error) {
    console.error('Error pausing video embeds:', error);
  }
};

/**
 * Toggles visibility of media elements (images and videos) within an element
 * @param element - HTML element containing media elements
 * @param isVisible - Whether media elements should be visible
 */
export const toggleMediaVisibility = (
  element: HTMLElement | null,
  isVisible: boolean,
): void => {
  if (!element) return;

  try {
    const mediaElements = element.querySelectorAll('img,video');
    mediaElements.forEach((ele) => {
      if (ele instanceof HTMLElement) {
        ele.style.visibility = isVisible ? 'visible' : 'hidden';
      }
    });
  } catch (error) {
    console.error('Error toggling media visibility:', error);
  }
};

/**
 * Finds a timeline item element by its ID in either the main timeline or portal
 * @param itemId - ID of the timeline item to find
 * @param timelineMode - Current timeline mode (HORIZONTAL, VERTICAL, etc.)
 * @param portalId - ID of the portal container for horizontal timeline modes
 * @returns HTML element of the timeline item or null if not found
 */
export const findTimelineElement = (
  itemId: string,
  timelineMode: string,
  portalId: string,
): HTMLElement | null => {
  if (!itemId || !timelineMode) return null;

  try {
    const elementId = `timeline-${timelineMode.toLowerCase()}-item-${itemId}`;
    let targetElement = document.getElementById(elementId);

    // Check in portal for horizontal modes
    if (
      !targetElement &&
      portalId &&
      (timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL')
    ) {
      const portalContainer = document.getElementById(portalId);
      if (portalContainer) {
        targetElement = portalContainer.querySelector(
          `#timeline-card-${itemId}`,
        );
      }
    }

    return targetElement;
  } catch (error) {
    console.error('Error finding timeline element:', error);
    return null;
  }
};
