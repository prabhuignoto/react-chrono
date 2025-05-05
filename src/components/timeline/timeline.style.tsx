export const Wrapper = styled.div<{
  cardPositionHorizontal?: string;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Roboto Condensed', sans-serif;
  position: relative;

  // Enhanced focus styles for keyboard navigation
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme?.primary || '#0066cc'};
    outline-offset: 2px;
  }

  // Make keyboard focus indicators more visible
  button:focus-visible,
  a:focus-visible,
  input:focus-visible {
    outline: 2px solid ${(p) => p.theme?.primary || '#0066cc'};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.2);
  }
`;

export const SearchWrapper = styled.div<{
  theme?: Theme;
}>`
  display: flex;
  align-items: center;
  padding: 0 0.25rem;
  margin: 0;

  .timeline-nav-wrapper {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ExtraControls = styled.div<{
  $hide?: boolean;
  $slideShowRunning?: boolean;
}>`
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 1rem;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')};
  opacity: ${(p) => (p.$slideShowRunning ? 0.3 : 1)};

  .control-wrapper {
    padding: 0;
    margin: 0 0.5rem;
    display: flex;
    align-items: center;
  }
`;
