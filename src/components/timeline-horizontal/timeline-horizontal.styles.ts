import styled from 'styled-components';

export const TimelineHorizontalWrapper = styled.ul<{ $flipLayout?: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  width: 100%;
  direction: ${(p) => (p.$flipLayout ? 'rtl' : 'ltr')};

  &.vertical {
    flex-direction: column;
  }
  &.horizontal {
    flex-direction: row;
  }
  &.show-all-cards-horizontal {
    overflow-x: auto;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

export const TimelineItemWrapper = styled.li<{ width: number }>`
  width: ${(p) => p.width}px;
  visibility: visible; /* Always show timeline points */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;

  &.vertical {
    margin-bottom: 2rem;
    width: 100%;
  }

  &.visible {
    visibility: visible;
  }

  .show-all-cards-horizontal & {
    visibility: visible; /* Force visibility in show-all mode */
    min-width: ${(p) => p.width}px;
    margin: 0 0.5rem;
    flex-shrink: 0;
  }
`;
