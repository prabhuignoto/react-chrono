import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 10rem;
  outline: 0;
  width: 100%;
  position: relative;
  `;

export const TimelineMainWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 8rem;
  justify-content: center;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
  width: 100%;
  `;

export const TimelineMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  position: absolute;
  transition: all 0.2s ease;
  `;

export const Outline = styled.div`
  background: #0f52ba;
  height: 3px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  right: 0;
  width: 100%;
  `

export const TimelineCollection = styled.ul<{ dir?: string }>`
  display: flex;
  flex-direction: ${p => p.dir === "vertical" ? "column" : "row"};
  list-style: none;
  width: 100%;
`;

export const TimelineItemWrapper = styled.li<{ width: number }>`
  width: ${p => p.width}px;
`;

export const TimelineControlContainer = styled.div`
  align-items: center;
  display: flex;
  height: 2rem;
  width: 100%;
`;

export const TimelineContentRender = styled.div`
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 3rem;
  position: absolute;
  width: 70%;
`;
