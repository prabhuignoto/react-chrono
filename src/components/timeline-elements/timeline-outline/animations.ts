import { keyframes } from 'styled-components';

export const open = keyframes`
  from {
    width: 30px;
    height: 30px;
    opacity: 0.5;
  }

  to {
    width: 200px;
    height: 50%;
    opacity: 1;
  }
`;

export const close = keyframes`
  from {
    width: 200px;
    height: 50%;
    opacity: 1;
  }

  to {
    width: 30px;
    height: 30px;
    opacity: 0.5;
  }
`;
