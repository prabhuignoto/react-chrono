import React from 'react';
import Chrono from '../components';

/**
 * Demo for Issue #498: Auto cardHeight feature
 *
 * This demo shows that cards can automatically size to their content
 * when cardHeight is set to 'auto' instead of a fixed pixel value.
 */

const items = [
  {
    title: 'May 2020',
    cardTitle: 'Short Content',
    cardDetailedText: 'This card has minimal content.',
  },
  {
    title: 'June 2020',
    cardTitle: 'Medium Content',
    cardDetailedText:
      'This card has a moderate amount of content. It should automatically expand to fit the text without requiring a fixed height. The content determines the card size.',
  },
  {
    title: 'July 2020',
    cardTitle: 'Long Content',
    cardDetailedText:
      'This card has extensive content that spans multiple lines. The auto cardHeight feature allows this card to grow as needed to accommodate all the text without cutting it off or requiring scrolling within the card. This makes the timeline more flexible and content-driven. You can add as much text as needed, and the card will automatically adjust its height to display everything properly. This is especially useful when you have varying amounts of content across different timeline items.',
  },
  {
    title: 'August 2020',
    cardTitle: 'Short Again',
    cardDetailedText: 'Back to minimal content.',
  },
  {
    title: 'September 2020',
    cardTitle: 'Very Long Content',
    cardDetailedText:
      'This demonstrates that the auto height feature works consistently across all cards in the timeline. Each card can have its own unique height based on its content. There is no need to set a fixed height that might be too small for some cards and too large for others. The auto feature optimizes the display automatically. This makes the timeline look more professional and natural, as each card takes only the space it needs. You can mix short and long content freely, and the timeline will handle it gracefully. This is particularly useful for timelines with diverse content types, such as brief announcements mixed with detailed descriptions or explanations.',
  },
  {
    title: 'October 2020',
    cardTitle: 'Minimal',
    cardDetailedText: 'Tiny.',
  },
];

export default function AutoCardHeight() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Auto Card Height Demo</h2>
        <p>
          All cards below use <code>cardHeight: 'auto'</code> - notice how each
          card's height adjusts automatically to fit its content.
        </p>
      </div>

      <div style={{ width: '100%', height: '700px' }}>
        <Chrono
          items={items}
          mode="alternating"
          layout={{
            cardHeight: 'auto', // FIX for Issue #498: Use 'auto' instead of fixed height
          }}
          display={{
            scrollable: { scrollbar: true },
          }}
        />
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
        }}
      >
        <h3>Issue #498: Auto cardHeight</h3>
        <p>
          This demo shows cards with varying content lengths, all using{' '}
          <code>cardHeight: "auto"</code>.
        </p>
        <p>
          <strong>Before Fix:</strong> All cards had a fixed minimum height,
          causing short cards to have extra whitespace and long cards to be
          cramped.
        </p>
        <p>
          <strong>After Fix:</strong> Each card automatically sizes to fit its
          content - short cards are compact, long cards expand as needed.
        </p>
        <h4>Usage:</h4>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px' }}>
          {`<Chrono
  items={items}
  layout={{
    cardHeight: 'auto'  // Automatic sizing
  }}
/>`}
        </pre>
      </div>
    </div>
  );
}
