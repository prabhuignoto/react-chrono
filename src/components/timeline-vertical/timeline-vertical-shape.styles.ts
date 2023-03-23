import styled from 'styled-components';

export const TimelinePointWrapper = styled.div<{
  alternateCards?: boolean;
  bg?: string;
  cardLess?: boolean;
  width?: number;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: ${(p) => (p.cardLess ? '5%' : '10%')};

  &.left {
    order: 2;
  }

  &.right {
    order: 1;
  }

  &::before {
    background: ${(p) => p.bg};
    width: ${(p) => (p.width ? `${p.width}px` : '4px')};
    height: 2rem;
    position: absolute;
    content: '';
    display: block;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    top: -1rem;
    right: 0;
    transform: translateY(-50%);
  }

  &::after {
    background: ${(p) => p.bg};
    content: '';
    display: block;
    height: 100%;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    right: 0;
    width: ${(p) => (p.width ? `${p.width}px` : '4px')};
    z-index: 0;
  }
`;

export const TimelinePointContainer = styled.div`
  position: relative;
  z-index: 1;
`;
