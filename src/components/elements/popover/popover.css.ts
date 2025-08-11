import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../../styles/tokens.css';
import { sprinkles } from '../../../styles/sprinkles/sprinkles.css';
import { recipe } from '@vanilla-extract/recipes';

export const popoverWrapper = style({ position: 'relative', display: 'inline-block' });

export const popoverHolder = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'center' }),
  {
    flexDirection: 'column',
    background: vars.color.toolbarBg,
    borderRadius: '6px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: vars.color.buttonBorder,
    boxShadow: vars.shadow.elevationLg,
    maxHeight: '500px',
    overflowY: 'auto',
    padding: '0.5rem',
    position: 'absolute',
    width: '300px',
    opacity: 0,
    transition: `opacity ${vars.transition.duration.normal} ${vars.transition.easing.standard}, transform ${vars.transition.duration.normal} ${vars.transition.easing.standard}`,
    transform: 'translateY(-10px)',
    zIndex: vars.zIndex.popover,
    selectors: {
      '&::-webkit-scrollbar': { width: '0.3em' },
      '&::-webkit-scrollbar-track': { backgroundColor: vars.color.toolbarBg },
      '&::-webkit-scrollbar-thumb': { backgroundColor: vars.color.primary, borderRadius: '3px' },
    },
  },
]);

export const holderVisible = style({
  opacity: 1,
  transform: 'translateY(0)',
});

export const holderTop = style({ top: '4rem' });
export const holderBottom = style({ bottom: '3.5rem' });
export const holderLeftMobile = style({ left: '4px' });

// Optional recipe to compose popover holder state without changing existing exports
export const popoverHolderRecipe = recipe({
  base: [popoverHolder],
  variants: {
    visible: { true: [holderVisible], false: {} },
    position: { top: [holderTop], bottom: [holderBottom] },
    leftMobile: { true: [holderLeftMobile], false: {} },
  },
  defaultVariants: { visible: false, position: 'bottom', leftMobile: false },
});

export const selecter = style([
  sprinkles({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }),
  {
    background: vars.color.toolbarBtnBg,
    color: vars.color.toolbarText,
    borderRadius: '6px',
    border: '1px solid transparent',
    boxShadow: `0 1px 1px ${vars.color.shadow}`,
    cursor: 'pointer',
    userSelect: 'none',
    marginRight: '0.5rem',
    height: '36px',
    minWidth: '36px',
    width: 'auto',
    padding: '0 0.5rem',
    transition:
      'background-color 0.2s ease-out, border-color 0.2s ease-out, box-shadow 0.2s ease-out, transform 0.15s ease-out',
    selectors: {
      '&:hover': {
        background: vars.color.buttonHoverBg,
        boxShadow: vars.shadow.elevationMd,
        transform: 'translateY(-1px)',
      },
      '&:active': { transform: 'scale(0.95)', boxShadow: vars.shadow.insetSm },
      '&:focus': { outline: `2px solid ${vars.color.primary}`, outlineOffset: '2px' },
      '&:focus:not(:focus-visible)': { outline: 'none' },
    },
    '@media': {
      '(max-width: 480px)': { height: '40px', minWidth: '40px', padding: '0 0.6rem' },
    },
  },
]);

export const selecterHover = style({
  // Consumers can toggle class for hover-like effects if needed
});

export const selecterIcon = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: vars.color.icon,
  height: '20px',
  width: '20px',
  transition: 'transform 0.2s ease-in-out',
  flexShrink: 0,
});

globalStyle(`${selecterIcon} svg`, { width: '20px', height: '20px' });
globalStyle(`@media (max-width: 480px) { ${selecterIcon} svg { width: 22px; height: 22px; } }`, {} as never);

export const selecterIconOpen = style({
  transform: 'rotate(180deg)',
});

export const selecterLabel = style({
  fontSize: '0.9rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  fontWeight: 500,
});

export const header = style({ height: '30px', width: '100%' });

export const content = style({
  height: 'calc(100% - 30px)',
  overflowY: 'auto',
  width: '100%',
});

export const closeButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  border: 'none',
  color: vars.color.primary,
  cursor: 'pointer',
  marginBottom: '0.5rem',
  marginLeft: 'auto',
});


