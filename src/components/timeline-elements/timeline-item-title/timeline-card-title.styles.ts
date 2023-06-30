import { Theme } from '@models/Theme';
import styled from 'styled-components';

export const TitleWrapper = styled.div<{
  $fontSize?: string;
  $hide?: boolean;
  align?: string;
  theme?: Theme;
}>`
  border-radius: 0.2rem;
  font-size: ${(p) => (p.$fontSize ? p.$fontSize : '1rem')};
  font-weight: 600;
  overflow: hidden;
  padding: 0.25rem;
  visibility: ${(p) => (p.$hide ? 'hidden' : 'visible')};
  text-align: ${(p) => (p.align ? p.align : '')};
  color: ${(p) => (p.theme ? p.theme.titleColor : '')};

  &.active {
    background: ${(p) => p.theme?.secondary};
    color: ${(p) =>
      p.theme?.titleColorActive ? p.theme?.titleColorActive : p.theme?.primary};
  }
`;
