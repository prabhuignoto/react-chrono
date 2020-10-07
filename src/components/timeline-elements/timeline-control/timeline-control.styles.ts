import styled from "styled-components";

export const TimelineControlWrapper = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: 20px;
  background: #0f52ba;
  /* box-shadow: inset 0 0 8px 6px rgba(0,0,0,0.2), 0 0 2px 2px rgba(0,0,0,0.3); */
`;

export const TimelineControlItem = styled.li<{disable: boolean}>`
  padding: 0.1rem;
  ${(p) => p.disable ? "pointer-events: none; filter: opacity(0.4)" : ""};
`;

export const TimelineControlButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;
  outline: 0;
  width: 2rem;
  height: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TimelineControlContainer = styled.div``;

export const MediaToggle = styled.div`
  width: 3rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

