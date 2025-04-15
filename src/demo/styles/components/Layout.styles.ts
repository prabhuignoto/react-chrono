import styled from 'styled-components';

export const Wrapper = styled.div`
  justify-items: center;
  margin: 0 auto;
  width: 95vw;
  background: #fff;
  display: grid;
  grid-template-columns: 30% 70%;
`;

export const Header = styled.header`
  margin: 0 auto;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const LogoImage = styled.img``;

export const Github = styled.img`
  margin-left: 1rem;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  flex-wrap: wrap;
`;

export const URL = styled.a`
  margin: 0 1rem;
  text-decoration: none;
`; 