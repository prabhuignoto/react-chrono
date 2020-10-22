import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';

export const TitleWrapper = styled.div<{ theme: Theme }>`
  border-radius: 0.2rem;
  font-size: 0.8rem;
  font-weight: 600;
  overflow: hidden;
  padding: 0.25rem;
  text-align: center;

  &.active {
    background: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.primary};
  }
`;
