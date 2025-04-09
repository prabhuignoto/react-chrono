import styled from 'styled-components';

export const ModeWrapper = styled.div`
  width: 90%;
  position: relative;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

export const Horizontal = styled(ModeWrapper)``;

export const Vertical = styled(ModeWrapper)``;

export const ComponentContainer = styled.div<{ type?: string }>`
  border-radius: 4px;
  margin: 0 auto;
  margin-bottom: 1rem;
  padding: 1rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  ${(p) => {
    switch (p.type) {
      case 'desktop':
        return `width: 80%;`;
      case 'big-screen':
        return `width: 80%;`;
      case 'tablet':
        return `width: 100%;`;
      default:
        break;
    }
  }}
`;

export const ComponentContainerTree = styled.div<{ type?: string }>`
  border-radius: 4px;
  height: 300px;
  margin: 0 auto;

  ${(p) => {
    switch (p.type) {
      case 'desktop':
        return `height: 600px; width: 75%;`;
      case 'big-screen':
        return `height: 90vh; width: 100%;`;
      case 'tablet':
        return `height: 650px; width: 100%;`;
      case 'mobile':
        return `height: 650px; width: 100%;`;
      default:
        break;
    }
  }}
`; 