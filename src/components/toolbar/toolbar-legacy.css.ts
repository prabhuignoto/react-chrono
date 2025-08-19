import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';

export const toolbarWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    listStyle: 'none',
    margin: 0,
    padding: '0.75rem 1rem',
    backgroundColor: vars.color.toolbarBg,
    width: '100%',
    minHeight: '64px',
    borderRadius: '10px',
    flexWrap: 'wrap',
    columnGap: '0.75rem',
    rowGap: '0.5rem',
    border: `1px solid ${vars.color.buttonBorder}`,
    boxShadow: vars.shadow.elevationSm,
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    containerType: 'inline-size',
    '@media': {
      '(max-width: 768px)': {
        padding: '0.75rem 0.75rem',
        justifyContent: 'center',
        gap: '0.75rem',
      },
      '(max-width: 480px)': {
        padding: '0.5rem 0.5rem',
        flexDirection: 'column',
        gap: '0.75rem',
        justifyContent: 'center',
      },
    },
  },
]);

// Direct children alignment and layout adjustments for toolbarWrapper
globalStyle(`${toolbarWrapper} > *`, { alignSelf: 'center' });
// Visually group search in the middle
globalStyle(`${toolbarWrapper} > :nth-child(2)`, { flex: 1 });

// Normalize all toolbar buttons to be minimal and borderless by default
globalStyle(`${toolbarWrapper} button`, {
  background: 'transparent',
  border: '1px solid transparent',
  borderRadius: '8px',
  padding: '6px',
  transition: `background-color ${vars.transition.duration.normal} ${vars.transition.easing.standard}, box-shadow ${vars.transition.duration.normal} ${vars.transition.easing.standard}, transform ${vars.transition.duration.fast} ${vars.transition.easing.standard}`,
});
globalStyle(`${toolbarWrapper} button:hover`, {
  background: vars.color.toolbarBtnBg,
  borderColor: vars.color.buttonBorder,
  boxShadow: vars.shadow.elevationSm,
});
globalStyle(`${toolbarWrapper} button:active`, {
  transform: 'scale(0.97)',
  boxShadow: vars.shadow.insetSm,
});
globalStyle(`${toolbarWrapper} button:focus`, {
  outline: `2px solid ${vars.color.primary}`,
  outlineOffset: '2px',
});
globalStyle(`${toolbarWrapper} button:focus:not(:focus-visible)`, {
  outline: 'none',
});

export const toolbarListItem = style([
  sprinkles({ display: 'flex' }),
  {
    padding: '0 0.25rem',
    margin: 0,
    alignItems: 'center',
    gap: '0.6rem',
    minHeight: '48px',
    cursor: 'default',
    borderRadius: '6px',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    selectors: {
      // Container is non-interactive; remove focus ring and hover background
      '&:focus': { outline: 'none' },
      '&:focus:not(:focus-visible)': { outline: 'none' },
      '&:focus-visible': { outline: 'none' },
    },
    '@media': {
      '(max-width: 768px)': { minHeight: '48px' },
      '(max-width: 480px)': { width: '100%', justifyContent: 'center' },
    },
  },
]);

export const iconWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20px',
    height: '20px',
    flexShrink: 0,
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    '@media': {
      '(max-width: 480px)': { width: '22px', height: '22px' },
    },
  },
]);
globalStyle(`${iconWrapper} svg`, {
  width: '20px',
  height: '20px',
  transition: 'transform 0.2s ease, opacity 0.2s ease',
  '@media': { '(max-width: 480px)': { width: '22px', height: '22px' } },
});
globalStyle(`${iconWrapper}:hover svg`, { transform: 'scale(1.1)' });

export const contentWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    flexWrap: 'nowrap',
    minWidth: 0,
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    '@media': {
      '(max-width: 768px)': { flex: 1 },
      '(max-width: 480px)': { width: '100%' },
    },
  },
]);

export const toolbarSection = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.75rem', flexShrink: 0 },
]);

export const toolbarSectionRecipe = recipe({
  base: [toolbarSection],
  variants: {
    primary: {
      true: {
        padding: '0.25rem 0.5rem',
        borderRadius: '8px',
        backgroundColor: vars.color.toolbarBtnBg,
        border: `1px solid ${vars.color.buttonBorder}`,
      },
      false: {},
    },
  },
  defaultVariants: { primary: false },
});

export const navigationGroup = style([toolbarSection, { flexWrap: 'nowrap' }]);
export const searchGroup = style([
  toolbarSection,
  {
    flex: '2 1 300px',
    maxWidth: '600px',
    justifyContent: 'center',
    '@media': {
      '(max-width: 768px)': { flex: '1 1 auto' },
      '(max-width: 480px)': { flex: '1 1 auto', order: -1, width: '100%' },
    },
  },
]);

export const actionGroup = style([
  toolbarSection,
  {
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    rowGap: '0.5rem',
    '@media': {
      '(max-width: 768px)': { justifyContent: 'center' },
      '(max-width: 480px)': { width: '100%', justifyContent: 'center' },
    },
  },
]);

export const searchWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    backgroundColor: vars.color.toolbarBtnBg,
    padding: '0.35rem 0.75rem',
    borderRadius: '8px',
    border: `1px solid ${vars.color.buttonBorder}`,
    width: '100%',
    transition:
      'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    minHeight: '40px',
    position: 'relative',
    selectors: {
      '&:focus-within': {
        borderColor: vars.color.primary,
        boxShadow: vars.shadow.focusRing,
        backgroundColor: vars.color.toolbarBtnBg,
      },
      '&:hover': { borderColor: vars.color.primary },
    },
  },
]);

export const searchInput = style({
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: vars.color.toolbarText,
  fontSize: '0.95rem',
  padding: '0.35rem 0.25rem',
  minHeight: '28px',
  width: '100%',
  selectors: {
    '&::placeholder': {
      color: vars.color.toolbarText,
      opacity: 0.8,
      fontWeight: 400,
    },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
    '&:focus': { outline: 'none' },
    '&:-webkit-autofill': {
      WebkitTextFillColor: vars.color.toolbarText,
      WebkitBoxShadow: `0 0 0px 1000px ${vars.color.toolbarBtnBg} inset`,
      transition: 'background-color 5000s ease-in-out 0s',
    },
  },
  '@media': {
    '(max-width: 480px)': { fontSize: '1rem' }, // Prevent zoom on iOS
  },
});

export const searchInfo = style({
  fontSize: '0.8rem',
  color: vars.color.toolbarText,
  opacity: 0.8,
  margin: '0 0.4rem',
  whiteSpace: 'nowrap',
  flexShrink: 0,
});

export const searchControls = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.5rem', flexShrink: 0, marginLeft: 'auto' },
]);
globalStyle(`${searchControls} .timeline-nav-wrapper`, {
  display: 'flex',
  alignItems: 'center',
});

export const extraControls = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    alignSelf: 'center',
    listStyle: 'none',
    margin: 0,
    padding: '0.25rem',
    flexShrink: 0,
    gap: '0.75rem',
    flexWrap: 'wrap',
    '@media': {
      '(max-width: 768px)': {
        justifyContent: 'center',
        gap: '0.5rem',
      },
      '(max-width: 480px)': {
        width: '100%',
        justifyContent: 'center',
        order: 1,
      },
    },
  },
]);

// Add styles for control wrapper
globalStyle(`${extraControls} .control-wrapper`, {
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'center',
  flexShrink: 0,
});

export const extraControlChild = style([
  sprinkles({ display: 'flex' }),
  { margin: '0.5rem 0', marginRight: '0.5rem' },
]);
