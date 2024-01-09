import styled from 'styled-components';

export const TimelinePointWrapper = styled.div<{
  $cardLess?: boolean;
  bg?: string;
  width?: number;
}>`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
  width: ${(p) => (p.$cardLess ? '5%' : '10%')};

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
    left: 50%;
    top: -1rem;
    transform: translateY(-50%) translateX(-50%);
  }

  &::after {
    background: ${(p) => p.bg};
    content: '';
    display: block;
    height: 100%;
    left: 50%;
    position: absolute;
    width: ${(p) => (p.width ? `${p.width}px` : '4px')};
    z-index: 0;
    transform: translateX(-50%);
  }
`;

export const TimelinePointContainer = styled.button<{ $hide?: boolean }>`
  position: relative;
  z-index: 1;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')};
  background: none;
  border: 0;
`;
