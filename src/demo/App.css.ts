import { style, globalStyle } from '@vanilla-extract/css';

const modeWrapper = style({
  width: '90%',
  position: 'relative',
  borderRadius: '10px',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
});

export const horizontal = style([modeWrapper]);

export const vertical = style([modeWrapper]);

export const wrapper = style({
  justifyItems: 'center',
  margin: '0 auto',
  width: '95vw',
  background: '#fff',
  display: 'grid',
  gridTemplateColumns: '30% 70%',
});

export const componentContainer = style({
  borderRadius: '4px',
  margin: '0 auto',
  marginBottom: '1rem',
  padding: '1rem 0',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
  width: '80%',
  '@media': {
    '(max-width: 768px)': {
      width: '100%',
    },
  },
});

export const componentContainerDesktop = style([
  componentContainer,
  {
    width: '80%',
  },
]);

export const componentContainerBigScreen = style([
  componentContainer,
  {
    width: '80%',
  },
]);

export const componentContainerTablet = style([
  componentContainer,
  {
    width: '100%',
  },
]);

export const componentContainerTree = style({
  borderRadius: '4px',
  height: '300px',
  margin: '0 auto',
  width: "100%",
  border: '1px solid #ccc',
});

export const componentContainerTreeDesktop = style([
  componentContainerTree,
  {
    height: '600px',
    width: '75%',
  },
]);

export const componentContainerTreeBigScreen = style([
  componentContainerTree,
  {
    height: '90vh',
    width: '100%',
  },
]);

export const componentContainerTreeTablet = style([
  componentContainerTree,
  {
    height: '650px',
    width: '100%',
  },
]);

export const componentContainerTreeMobile = style([
  componentContainerTree,
  {
    height: '650px',
    width: '100%',
  },
]);

export const header = style({
  margin: '0 auto',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '2rem',
  marginBottom: '2rem',
  flexWrap: 'wrap',
});

export const logoImage = style({});

export const github = style({
  marginLeft: '1rem',
});

export const footer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '8rem',
  flexWrap: 'wrap',
});

export const url = style({
  margin: '0 1rem',
  textDecoration: 'none',
});

export const descriptionContent = style({
  fontFamily: '"Open Sans", monospace',
  fontWeight: 400,
  width: '95%',
  margin: '2rem 0 2rem 2rem',
  fontSize: '0.85rem',
});

export const descriptionHeader = style({
  fontFamily: '"Open Sans", monospace',
  fontWeight: 600,
  width: '95%',
  margin: '0 auto',
  borderBottom: '1px solid #ccc',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '0.75rem',
});

export const description = style({});

export const featureSetHeader = style({
  width: '95%',
  margin: '0 auto',
  fontSize: '1rem',
  fontWeight: 600,
  borderBottom: '1px solid #ccc',
  paddingBottom: '0.75rem',
});

export const featureSet = style({
  listStyle: 'none',
  padding: 0,
  margin: '0 auto',
  width: '95%',
  marginTop: '1.5rem',
});

export const feature = style({
  fontFamily: '"Open Sans", monospace',
  marginBottom: '0.5rem',
  fontSize: '0.85rem',
  fontWeight: 500,
});

globalStyle(`${feature} .icon`, {
  fontSize: '1rem',
  marginRight: '0.25rem',
});

export const githubLogo = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const sandBox = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginLeft: 'auto',
});

export const componentLinks = style({
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '5rem',
  margin: 0,
  padding: 0,
});

globalStyle(`${componentLinks} li`, {
  margin: '1rem 0',
});

export const appArea = style({
  padding: '1rem',
  width: '100%',
});