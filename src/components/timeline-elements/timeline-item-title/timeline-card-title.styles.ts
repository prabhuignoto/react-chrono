import styled from '@emotion/styled';
import { Theme } from '../../../models/Theme';

export const TitleWrapper = styled.div<{
  theme?: Theme;
  hide?: boolean;
  align?: string;
}>`
  border-radius: 0.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  overflow: hidden;
  padding: 0.25rem;
  visibility: ${(p) => (p.hide ? 'hidden' : 'visible')};
  text-align: ${(p) => (p.align ? p.align : '')};

  &.active {
    background: ${(p) => p.theme?.secondary};
    color: ${(p) => p.theme?.primary};
  }
`;
