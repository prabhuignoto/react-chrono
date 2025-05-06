import React from 'react';

/**
 * Safely extracts searchable text from potentially React node content
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
  return '';
};

/**
 * Pauses video embeds (primarily YouTube) within an element
 */
export const pauseVideoEmbeds = (element: HTMLElement) => {
  element.querySelectorAll('iframe').forEach((iframe) => {
    const src = iframe.getAttribute('src') || '';

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

    iframe.contentWindow?.postMessage(
      '{"event":"command","func":"stopVideo","args":""}',
      targetOrigin,
    );
  });
};

/**
 * Toggles visibility of media elements (images and videos) within an element
 */
export const toggleMediaVisibility = (
  element: HTMLElement,
  isVisible: boolean,
) => {
  element
    .querySelectorAll('img,video')
    .forEach(
      (ele) =>
        ((ele as HTMLElement).style.visibility = isVisible
          ? 'visible'
          : 'hidden'),
    );
};

/**
 * Finds a timeline item element by its ID in either the main timeline or portal
 */
export const findTimelineElement = (
  itemId: string,
  timelineMode: string,
  portalId: string,
) => {
  const elementId = `timeline-${timelineMode.toLowerCase()}-item-${itemId}`;
  let targetElement = document.getElementById(elementId);

  // Check in portal for horizontal modes
  if (
    !targetElement &&
    (timelineMode === 'HORIZONTAL' || timelineMode === 'HORIZONTAL_ALL')
  ) {
    const portalContainer = document.getElementById(portalId);
    if (portalContainer) {
      targetElement = portalContainer.querySelector(`#timeline-card-${itemId}`);
    }
  }

  return targetElement;
};
