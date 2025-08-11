import { globalStyle, style } from '@vanilla-extract/css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

export const timelineHorizontalWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    listStyle: 'none',
    margin: 0,
    width: '100%',
    // Enable container queries for children
    containerType: 'inline-size',
  },
]);

export const timelineItemWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  {
    visibility: 'visible',
    height: '150px',
    flexDirection: 'column',
    flexShrink: 0,
    position: 'relative',
  },
]);

globalStyle(`${timelineHorizontalWrapper}.vertical`, { flexDirection: 'column' });
globalStyle(`${timelineHorizontalWrapper}.horizontal`, { flexDirection: 'row' });
globalStyle(`${timelineHorizontalWrapper}.show-all-cards-horizontal`, {
  overflowX: 'auto',
  justifyContent: 'flex-start',
  gap: '1rem',
});

globalStyle(`${timelineItemWrapper}.vertical`, { marginBottom: '2rem', width: '100%' });
globalStyle(`${timelineItemWrapper}.visible`, { visibility: 'visible' });
globalStyle(`.show-all-cards-horizontal ${timelineItemWrapper}`, { visibility: 'visible', margin: '0 0.5rem', flexShrink: 0 });


