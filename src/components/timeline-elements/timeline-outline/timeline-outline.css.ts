import { keyframes, globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';

export const openAnim = keyframes({
  from: { width: '30px', height: '30px' },
  to: { width: '200px', height: '50%' },
});

export const closeAnim = keyframes({
  from: { width: '200px', height: '50%' },
  to: { width: '30px', height: '30px' },
});

export const outlineWrapper = style({
  background: vars.color.cardBg,
  border: `1px solid ${vars.color.buttonBorder}`,
  height: '50%',
  width: '100%',
  position: 'absolute',
  top: '1rem',
});

export const outlineWrapperOpen = style({
  animation: `${openAnim} 0.2s ease-in`,
  width: '200px',
  height: '50%',
  overflowY: 'auto',
});

export const outlineWrapperClosed = style({
  animation: `${closeAnim} 0.2s ease-in`,
  width: '30px',
  height: '30px',
});

export const outlineLeft = style({ left: '1rem' });
export const outlineRight = style({ right: '3rem' });

export const outlinePane = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    borderRadius: '4px',
    position: 'absolute',
    zIndex: vars.zIndex.outlinePane,
    boxShadow: `0 5px 10px 2px ${vars.color.shadow}`,
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
  },
]);

export const outlineButton = style([
  sprinkles({ display: 'flex', placeCenter: 'center' }),
  {
    alignSelf: 'flex-end',
    background: vars.color.cardBg,
    borderRadius: '4px',
    border: 0,
    cursor: 'pointer',
    height: '30px',
    padding: 0,
    width: '30px',
  },
]);

export const buttonLeft = style({ marginRight: 'auto' });
export const buttonRight = style({ marginLeft: 'auto' });

globalStyle(`${outlineButton} svg`, { width: '70%', height: '70%' });
globalStyle(`${outlineButton} svg path`, { color: vars.color.icon });

export const listRoot = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    height: '100%',
    listStyle: 'none',
    margin: 0,
    overflowY: 'auto',
    padding: 0,
    width: '80%',
  },
]);

export const listItem = style([
  sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }),
  {
    fontSize: '0.9rem',
    margin: '0.75rem 0',
    cursor: 'pointer',
    position: 'relative',
    selectors: {
      '&:not(:last-child)::after': {
        content: "''",
        display: 'block',
        width: '100%',
        position: 'absolute',
        height: '1px',
        background: vars.color.buttonBorder,
        left: 0,
        right: 0,
        margin: '0 auto',
        bottom: '-50%',
      },
    },
  },
]);

export const listItemName = style({
  fontSize: '0.75rem',
  paddingLeft: '0.25rem',
  color: vars.color.cardSubtitle,
  selectors: {
    '&:hover': { color: vars.color.primary },
  },
});

export const listItemNameSelected = style({ color: vars.color.primary });

export const listItemBullet = style([
  sprinkles({ display: 'flex', placeCenter: 'center' }),
  { marginRight: '1rem', position: 'relative' },
]);

globalStyle(`${listItemBullet}::after`, {
  content: "''",
  display: 'block',
  position: 'absolute',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: vars.color.icon,
  left: 0,
  margin: '0 auto',
  border: `2px solid ${vars.color.icon}`,
});

export const listItemBulletSelected = style({});

globalStyle(`${listItemBulletSelected}::after`, {
  background: vars.color.primary,
  border: `2px solid ${vars.color.primary}`,
});
