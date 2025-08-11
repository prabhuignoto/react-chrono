import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../styles/tokens.css';
import { sprinkles } from '../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';

export const toolbarWrapper = style([
  sprinkles({ display: 'flex' }),
  {
    listStyle: 'none',
    margin: 0,
    padding: '0.5rem',
    backgroundColor: vars.color.toolbarBg,
    width: '100%',
    minHeight: '60px',
    borderRadius: '8px',
    flexWrap: 'wrap',
    border: `1px solid ${vars.color.buttonBorder}`,
    alignItems: 'center',
    transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    selectors: {
      '& > *': { alignSelf: 'center' },
    },
    '@media': {
      '(max-width: 768px)': { padding: '0.75rem 0.5rem' },
      '(max-width: 480px)': { padding: '0.5rem', flexDirection: 'column' },
    },
  },
]);

export const toolbarListItem = style([
  sprinkles({ display: 'flex' }),
  {
    padding: 0,
    margin: 0,
    alignItems: 'center',
    gap: '0.5rem',
    minHeight: '44px',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.2s ease-in-out',
    selectors: {
      '&:focus': { outline: `2px solid ${vars.color.primary}`, outlineOffset: '2px', borderRadius: '4px' },
      '&:focus:not(:focus-visible)': { outline: 'none' },
      '&:focus-visible': { outline: `2px solid ${vars.color.primary}`, outlineOffset: '2px' },
    },
    '@media': { '(max-width: 768px)': { minHeight: '48px' }, '(max-width: 480px)': { width: '100%', justifyContent: 'center' } },
  },
]);

export const iconWrapper = style([
  sprinkles({ display: 'flex' }),
  { justifyContent: 'center', alignItems: 'center', width: '1.25rem', height: '1.25rem', flexShrink: 0, transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}` },
]);
globalStyle(`${iconWrapper} svg`, { width: '100%', height: '100%', transition: 'transform 0.2s ease, opacity 0.2s ease' });
globalStyle(`${iconWrapper}:hover svg`, { transform: 'scale(1.1)' });
globalStyle(`@media (max-width: 480px) { ${iconWrapper} { width: 24px; height: 24px; } }`, {} as never);

export const contentWrapper = style([
  sprinkles({ display: 'flex' }),
  { flexWrap: 'nowrap', minWidth: 0, transition: `all ${vars.transition.duration.normal} ${vars.transition.easing.standard}` },
]);
globalStyle(`@media (max-width: 768px) { ${contentWrapper} { flex: 1; } }`, {} as never);
globalStyle(`@media (max-width: 480px) { ${contentWrapper} { width: '100%'; } }`, {} as never);

export const toolbarSection = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.5rem', flexShrink: 0 },
]);

export const toolbarSectionRecipe = recipe({
  base: [toolbarSection],
  variants: {
    primary: {
      true: {
        padding: '0.25rem 0.5rem',
        borderRadius: '6px',
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
  { flex: '1 1 300px', maxWidth: '600px', justifyContent: 'center' },
]);
globalStyle(`@media (max-width: 480px) { ${searchGroup} { flex: '1 1 auto'; order: -1; width: '100%'; } }`, {} as never);

export const actionGroup = style([
  toolbarSection,
  { flexWrap: 'wrap', justifyContent: 'flex-end' },
]);
globalStyle(`@media (max-width: 768px) { ${actionGroup} { justify-content: center; } }`, {} as never);

export const searchWrapper = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    backgroundColor: vars.color.toolbarBtnBg,
    padding: '0.2rem 0.6rem',
    borderRadius: '6px',
    border: `1px solid ${vars.color.buttonBorder}`,
    width: '100%',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    minHeight: '38px',
    position: 'relative',
    selectors: {
      '&:focus-within': {
        borderColor: vars.color.primary,
        boxShadow: `0 0 0 2px ${vars.color.primary}`,
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
  fontSize: '0.9rem',
  padding: '0.4rem 0.2rem',
  minHeight: '28px',
  selectors: {
    '&::placeholder': { color: vars.color.toolbarText, opacity: 0.8, fontWeight: 400 },
    '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
  },
});

export const searchInfo = style({ fontSize: '0.8rem', color: vars.color.toolbarText, opacity: 0.8, margin: '0 0.4rem', whiteSpace: 'nowrap', flexShrink: 0 });

export const searchControls = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  { gap: '0.25rem', flexShrink: 0, marginLeft: 'auto' },
]);
globalStyle(`${searchControls} .timeline-nav-wrapper`, { display: 'flex', alignItems: 'center' });

export const extraControls = style([
  sprinkles({ display: 'flex', alignItems: 'center' }),
  {
    alignSelf: 'center',
    listStyle: 'none',
    margin: 0,
    padding: '0.125rem',
    flexShrink: 0,
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
]);
export const extraControlChild = style([sprinkles({ display: 'flex' }), { margin: '0.5rem 0', marginRight: '0.5rem' }]);


