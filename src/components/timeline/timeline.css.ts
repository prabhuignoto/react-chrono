import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';

export const wrapper = style([
  sprinkles({ display: 'flex' }),
  {
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
    width: '100%',
    overflow: 'visible',
    zIndex: vars.zIndex.timelineCard.toString() ? (Number(vars.zIndex.timelineCard) - 2) as unknown as number : undefined,
    selectors: {
      '&:focus': { outline: 0 },
      '&.horizontal': { justifyContent: 'flex-start' },
      '&.js-focus-visible :focus:not(.focus-visible)': { outline: 0 },
      '&[data-toolbar-navigation="true"] :focus': { outline: 0 },
    },
  },
]);

// Fullscreen adjustments (cross-browser)
globalStyle(`${wrapper}:fullscreen, ${wrapper}:-webkit-full-screen, ${wrapper}:-moz-full-screen, ${wrapper}:-ms-fullscreen, ${wrapper}[data-fullscreen='true']`, {
  background: vars.color.background,
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  overflowY: 'auto',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999999,
  boxSizing: 'border-box',
});

globalStyle(`${wrapper}:fullscreen::backdrop, ${wrapper}:-webkit-full-screen::backdrop, ${wrapper}:-moz-full-screen::backdrop, ${wrapper}:-ms-fullscreen::backdrop`, {
  background: vars.color.background,
});

export const timelineMainWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: '1 1 auto',
    minHeight: 0,
    height: 'auto',
    overflowY: 'auto',
    overflowX: 'visible',
    overscrollBehavior: 'contain',
    width: '100%',
    background: 'transparent',
    padding: 0,
  },
]);

export const timelineMain = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    position: 'absolute',
    top: '50%',
    left: 0,
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    transform: 'translate(0, -50%)',
    selectors: {
      '&.vertical': { alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%', height: '100%' },
      '&.horizontal': { alignItems: 'center', justifyContent: 'center', flexDirection: 'row' },
      '&.horizontal_all': { alignItems: 'center', justifyContent: 'flex-start', width: '100%', flexDirection: 'row', overflowX: 'auto' },
    },
  },
]);

export const outline = style({
  position: 'absolute',
  right: 0,
  left: 0,
  width: '100%',
  marginRight: 'auto',
  marginLeft: 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
});

export const timelineControlContainer = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  { minHeight: '3rem' },
]);

export const timelineContentRender = style([
  sprinkles({ display: 'flex' }),
  {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '98%',
    marginRight: 'auto',
    marginLeft: 'auto',
    overflowX: 'hidden',
  },
]);

export const toolbarWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }),
  {
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '8px',
    width: '100%',
    padding: '0.5rem 1rem',
    marginBlockEnd: '1rem',
    zIndex: vars.zIndex.controls,
    gap: '1rem',
    flexWrap: 'wrap',
  },
]);

export const extraControls = style([
  sprinkles({ display: 'flex', alignItems: 'center', p: 'xs' }),
  {
    listStyle: 'none',
    margin: 0,
    visibility: 'visible',
    flexShrink: 0,
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
]);

export const extraControlChild = style([
  sprinkles({ display: 'flex' }),
  { margin: '0.5rem 0.5rem 0.5rem 0' },
]);

export const searchWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    backgroundColor: vars.color.toolbarBtnBg,
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    border: `1px solid ${vars.color.buttonBorder}`,
    width: '100%',
    minHeight: '38px',
    position: 'relative',
    transition: `border-color ${vars.transition.duration.normal} ${vars.transition.easing.standard}, box-shadow ${vars.transition.duration.normal} ${vars.transition.easing.standard}, background-color ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    selectors: {
      '&:focus-within': {
        borderColor: vars.color.primary,
        boxShadow: vars.shadow.focusRing,
        backgroundColor: vars.color.toolbarBtnBg,
      },
    },
  },
]);

export const searchInput = style({
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: vars.color.text,
  fontSize: '0.9rem',
  padding: '0.4rem 0.2rem',
  selectors: { '&::placeholder': { color: vars.color.text, opacity: 0.8, fontWeight: 400 } },
});

export const searchInfo = style({ fontSize: '0.8rem', color: vars.color.text, opacity: 0.8, margin: '0 0.4rem', whiteSpace: 'nowrap', flexShrink: 0 });

export const searchControls = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.25rem', flexShrink: 0, marginLeft: 'auto' },
]);

export const toolbarSection = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.5rem', flexShrink: 0 },
]);

export const navigationGroup = style([toolbarSection, { flexWrap: 'nowrap' }]);
export const searchGroup = style([toolbarSection, { flex: '1 1 300px', maxWidth: '600px', justifyContent: 'center' }]);
export const actionGroup = style([toolbarSection, { flexWrap: 'wrap', justifyContent: 'flex-end' }]);


