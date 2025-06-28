import { describe, expect, it } from 'vitest';
import { Chrono } from '../react-chrono';
import type { TimelineItem } from '../react-chrono';

describe('react-chrono exports', () => {
  it('should export Chrono component', () => {
    expect(Chrono).toBeDefined();
    // Chrono is wrapped with React.memo, so typeof is 'object'
    expect(typeof Chrono).toBe('object');
  });

  it('should export TimelineItem type', () => {
    // This test verifies that the TimelineItem type is properly exported
    // TypeScript compilation will fail if the type is not properly exported
    const timelineItem: TimelineItem = {
      id: 'test-id',
      title: 'Test Title',
      cardTitle: 'Test Card Title',
      cardSubtitle: 'Test Card Subtitle',
      cardDetailedText: 'Test detailed text',
    };

    expect(timelineItem).toBeDefined();
    expect(timelineItem.id).toBe('test-id');
    expect(timelineItem.title).toBe('Test Title');
  });

  it('should verify Chrono is the default export from components', () => {
    // Since Chrono is wrapped with React.memo, check if it has the typical memo structure
    expect(Chrono).toHaveProperty('$$typeof');
    expect(Chrono.$$typeof).toBeDefined();
  });

  it('should validate TimelineItem interface properties', () => {
    // Test that TimelineItem accepts all expected properties
    const complexTimelineItem: TimelineItem = {
      id: 'complex-item',
      title: 'Complex Title',
      cardTitle: 'Complex Card Title',
      cardSubtitle: 'Complex Card Subtitle',
      cardDetailedText: ['Detail 1', 'Detail 2'],
      date: new Date(),
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://example.com/image.jpg',
        },
      },
      url: 'https://example.com',
      visible: true,
      active: false,
      position: 'left',
      isNested: false,
      hasNestedItems: false,
    };

    expect(complexTimelineItem).toBeDefined();
    expect(complexTimelineItem.cardDetailedText).toEqual([
      'Detail 1',
      'Detail 2',
    ]);
    expect(complexTimelineItem.date).toBeInstanceOf(Date);
    expect(complexTimelineItem.media?.type).toBe('IMAGE');
    expect(complexTimelineItem.url).toBe('https://example.com');
  });

  it('should handle optional TimelineItem properties', () => {
    // Test that TimelineItem works with minimal properties
    const minimalTimelineItem: TimelineItem = {};

    expect(minimalTimelineItem).toBeDefined();
    expect(Object.keys(minimalTimelineItem)).toHaveLength(0);
  });

  it('should support nested timeline items', () => {
    const nestedTimelineItem: TimelineItem = {
      id: 'parent-item',
      title: 'Parent Item',
      hasNestedItems: true,
      items: [
        {
          id: 'child-1',
          title: 'Child 1',
          cardTitle: 'Child Card 1',
        },
        {
          id: 'child-2',
          title: 'Child 2',
          cardTitle: 'Child Card 2',
        },
      ],
    };

    expect(nestedTimelineItem.hasNestedItems).toBe(true);
    expect(nestedTimelineItem.items).toHaveLength(2);
    expect(nestedTimelineItem.items?.[0]?.id).toBe('child-1');
    expect(nestedTimelineItem.items?.[1]?.id).toBe('child-2');
  });

  it('should support different media types in TimelineItem', () => {
    const imageItem: TimelineItem = {
      id: 'image-item',
      media: {
        type: 'IMAGE',
        source: {
          url: 'https://example.com/image.jpg',
        },
      },
    };

    const videoItem: TimelineItem = {
      id: 'video-item',
      media: {
        type: 'VIDEO',
        source: {
          url: 'https://example.com/video.mp4',
        },
      },
    };

    const youtubeItem: TimelineItem = {
      id: 'youtube-item',
      media: {
        type: 'VIDEO',
        source: {
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      },
    };

    expect(imageItem.media?.type).toBe('IMAGE');
    expect(videoItem.media?.type).toBe('VIDEO');
    expect(youtubeItem.media?.type).toBe('VIDEO');
  });

  it('should support React nodes in TimelineItem properties', () => {
    const timelineItemWithNodes: TimelineItem = {
      id: 'react-node-item',
      title: 'React Node Title',
      cardTitle: 'React Node Card Title',
      cardSubtitle: 'React Node Subtitle',
      cardDetailedText: 'React Node Details',
      timelineContent: 'Custom timeline content',
    };

    expect(timelineItemWithNodes.title).toBe('React Node Title');
    expect(timelineItemWithNodes.cardTitle).toBe('React Node Card Title');
    expect(timelineItemWithNodes.cardSubtitle).toBe('React Node Subtitle');
    expect(timelineItemWithNodes.cardDetailedText).toBe('React Node Details');
    expect(timelineItemWithNodes.timelineContent).toBe(
      'Custom timeline content',
    );
  });
});
