import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

export const timelineHorizontalWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // Enable container queries for children
    containerType: 'inline-size',
  },
]);

export const timelineItemWrapper = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    visibility: 'visible',
    height: 'auto',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'relative',
    padding: '0.5rem 1rem',
    gap: '0.5rem',
  },
]);

globalStyle(`${timelineHorizontalWrapper}.vertical`, {
  flexDirection: 'column',
});
globalStyle(`${timelineHorizontalWrapper}.horizontal`, {
  flexDirection: 'row',
  overflowX: 'visible',
  justifyContent: 'space-evenly',
});
globalStyle(`${timelineHorizontalWrapper}.horizontal_all`, {
  flexDirection: 'row',
  overflowX: 'auto',
  justifyContent: 'flex-start',
  gap: '2rem',
  padding: '0 2rem',
});
globalStyle(`${timelineHorizontalWrapper}.show-all-cards-horizontal`, {
  overflowX: 'auto',
  justifyContent: 'flex-start',
  gap: '1rem',
});

globalStyle(`${timelineItemWrapper}.vertical`, {
  marginBottom: '2rem',
  width: '100%',
});
globalStyle(`${timelineItemWrapper}.visible`, { visibility: 'visible' });
globalStyle(`.show-all-cards-horizontal ${timelineItemWrapper}`, {
  visibility: 'visible',
  margin: '0 0.5rem',
  flexShrink: 0,
});

// Responsive styles for horizontal timeline
globalStyle(`${timelineHorizontalWrapper}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '0 0.5rem',
    },
    '(max-width: 480px)': {
      padding: '0 0.25rem',
    },
  },
});

globalStyle(`${timelineItemWrapper}`, {
  '@media': {
    '(max-width: 768px)': {
      padding: '0 0.5rem',
      minHeight: '120px', // Changed from height to minHeight to prevent clipping
    },
    '(max-width: 480px)': {
      padding: '0 0.25rem',
      minHeight: '120px', // Increased from 100px and changed to minHeight
    },
  },
});
