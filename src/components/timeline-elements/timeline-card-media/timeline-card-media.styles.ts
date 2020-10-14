import styled from "@emotion/styled";
import { TimelineMode } from "../../../models/TimelineModel";
import { Theme } from "../../../models/TimelineTreeModel";

export const MediaWrapper = styled.div<{ theme: Theme, active?: boolean, mode?: TimelineMode, dir?: string, slideShowActive?: boolean }>`
  height: 100%;
  flex-direction: row;
  align-items: center;
  width: 100%;
  align-self: center;
  padding: 0.5rem;
  position: relative;
  background: ${p => p.active ? `rgba(${p.theme.secondary}, 0.35)` : ""};
  border-radius: 4px;
  pointer-events: ${p => !p.active && p.slideShowActive ? "none" : ""};

  ${p => {
    if (p.mode === "HORIZONTAL") {
      return `
        justify-content: flex-start;
      `;
    } else {
      if (p.dir === "left") {
        return `
        justify-content: flex-start;
      `;
      } else {
        return `
        justify-content: flex-end;
      `;
      }
    }
  }}
`;

export const CardImage = styled.img<{ mode?: TimelineMode, visible?: boolean, active?: boolean, dir?: string }>`
  max-width: 100%;
  justify-self: center;
  flex: 4;
  visibility: ${p => p.visible ? "visible" : "hidden"};
  border-radius: 4px;
  margin-right: auto;
  object-fit: contain;
  height: 70%;
  margin-left: auto;
`;

export const CardVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const MediaDetailsWrapper = styled.div<{ mode?: TimelineMode }>`
  /* position: absolute; */
  bottom: -1rem;
  left: 0;
  right: 0;
  /* margin-left: auto; */
  margin-right: auto;
  width: ${p => {
    switch (p.mode) {
      case "HORIZONTAL": return "100%";
      case "VERTICAL": return "100%";
      case "TREE": return "100%";
    }
  }};
  min-height: 100px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 6px;
  padding-bottom: 0.5rem;
`;

export const ErrorMessage = styled.span`
  position:absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  color: #a3a3a3;
  text-align: center;
`;