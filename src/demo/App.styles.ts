import styled from "styled-components";

export const Horizontal = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 3rem;
  border-radius: 10px;
`;

export const Vertical = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 3rem;
`;

export const Wrapper = styled.div<{show: boolean}>`
  display: ${p => p.show ? "block" : "none"};
  flex-direction: column;
  margin: 0 auto;
  width: 1200px;
`;

export const ComponentContainer = styled.div`
  background: #f2f2f2;
  border-radius: 4px;
  height: 350px;
  margin-top: 1rem;
  padding: 1rem 0;
  display: flex;
`;

export const ComponentContainerTree = styled.div`
  background: #f2f2f2;
  border-radius: 4px;
  height: 800px; 
  margin-top: 1rem;
  padding: 1rem 0;
`;

export const Header = styled.header`
  margin: 2rem 0;
  display: flex;
  width: 100%;
`

export const LogoImage = styled.img``;

export const Github = styled.img`
  margin-left: 1rem;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
`;

export const URL = styled.a``;

export const DescriptionContent = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-weight: 400;
`;

export const DescriptionHeader = styled.h3`
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
  text-transform: uppercase;
  color: rgb(242,98,53);
`;

export const Description = styled.div``;

export const Pre = styled.pre`
  margin-top: 2rem;
  border-radius: 4px;
`;