import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import {
  getSearchableText,
  pauseVideoEmbeds,
  toggleMediaVisibility,
  findTimelineElement,
} from './timelineUtils';

describe('getSearchableText', () => {
  it('returns empty string for null/undefined', () => {
    expect(getSearchableText(null)).toBe('');
    expect(getSearchableText(undefined)).toBe('');
  });
  it('returns string as is', () => {
    expect(getSearchableText('hello')).toBe('hello');
  });
  it('joins array of strings', () => {
    expect(getSearchableText(['a', 'b', 'c'])).toBe('a b c');
  });
  it('recursively extracts text from nested arrays', () => {
    expect(getSearchableText(['a', ['b', 'c'], 'd'])).toBe('a b c d');
  });
  it('extracts text from React elements', () => {
    const el = React.createElement('span', null, 'foo');
    expect(getSearchableText(el)).toBe('foo');
  });
  it('extracts text from nested React elements', () => {
    const el = React.createElement('div', null, [
      'a',
      React.createElement('span', { key: 'span' }, 'b'),
      ['c', React.createElement('em', { key: 'em' }, 'd')],
    ]);
    expect(getSearchableText(el)).toBe('a b c d');
  });
});

describe('pauseVideoEmbeds', () => {
  let origConsoleError: any;
  beforeEach(() => {
    origConsoleError = console.error;
    console.error = vi.fn();
  });
  afterEach(() => {
    console.error = origConsoleError;
  });
  it('does nothing if element is null', () => {
    expect(() => pauseVideoEmbeds(null)).not.toThrow();
  });
  it('sends postMessage to valid YouTube iframe', () => {
    const postMessage = vi.fn();
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/xyz');
    Object.defineProperty(iframe, 'contentWindow', { value: { postMessage } });
    const container = document.createElement('div');
    container.appendChild(iframe);
    pauseVideoEmbeds(container);
    expect(postMessage).toHaveBeenCalledWith(
      '{"event":"command","func":"stopVideo","args":""}',
      'https://www.youtube.com',
    );
  });
  it('sends postMessage to valid Vimeo iframe', () => {
    const postMessage = vi.fn();
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://vimeo.com/video/xyz');
    Object.defineProperty(iframe, 'contentWindow', { value: { postMessage } });
    const container = document.createElement('div');
    container.appendChild(iframe);
    pauseVideoEmbeds(container);
    expect(postMessage).toHaveBeenCalledWith(
      '{"method":"pause"}',
      'https://vimeo.com',
    );
  });
  it('handles invalid iframe src gracefully', () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'not-a-valid-url');
    Object.defineProperty(iframe, 'contentWindow', {
      value: { postMessage: vi.fn() },
    });
    const container = document.createElement('div');
    container.appendChild(iframe);
    expect(() => pauseVideoEmbeds(container)).not.toThrow();
  });
});

describe('toggleMediaVisibility', () => {
  it('does nothing if element is null', () => {
    expect(() => toggleMediaVisibility(null, true)).not.toThrow();
  });
  it('toggles visibility of images and videos', () => {
    const img = document.createElement('img');
    const video = document.createElement('video');
    const div = document.createElement('div');
    div.appendChild(img);
    div.appendChild(video);
    toggleMediaVisibility(div, false);
    expect(img.style.visibility).toBe('hidden');
    expect(video.style.visibility).toBe('hidden');
    toggleMediaVisibility(div, true);
    expect(img.style.visibility).toBe('visible');
    expect(video.style.visibility).toBe('visible');
  });
});

describe('findTimelineElement', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('returns null for missing itemId or timelineMode', () => {
    expect(findTimelineElement('', 'VERTICAL', '')).toBeNull();
    expect(findTimelineElement('id', '', '')).toBeNull();
  });
  it('finds element by id for vertical mode', () => {
    const el = document.createElement('div');
    el.id = 'timeline-vertical-item-foo';
    document.body.appendChild(el);
    expect(findTimelineElement('foo', 'VERTICAL', '')).toBe(el);
  });
  it('finds element in portal for horizontal mode', () => {
    const portal = document.createElement('div');
    portal.id = 'portal';
    const card = document.createElement('div');
    card.id = 'timeline-card-bar';
    portal.appendChild(card);
    document.body.appendChild(portal);
    expect(findTimelineElement('bar', 'HORIZONTAL', 'portal')).toBe(card);
  });
  it('returns null if not found', () => {
    expect(findTimelineElement('notfound', 'VERTICAL', '')).toBeNull();
  });
});
