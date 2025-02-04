import styled from "styled-components";
import theme from "global/theme";
import { mq } from "common/mediaQueries";

export const TrackStepContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 30px;
  width: auto;
  position: relative;
`;

export const OptionWrapper = styled.div`
  position: absolute;
  right: 0;
  padding-top: 0;

  display: flex;
  width: auto;
  height: 40%;
  flex-direction: column;

  ${mq("max").phoneWide} {
    width: 100%;
  }

  ${mq("min").tabletWide} {
    width: 20%;
    padding-top: 0.2rem;
    height: 100%;
  }
`;

export const StepWrapper = styled.button<{ selected: boolean; index: number }>`
  height: 100%;
  width: 100%;
  background: ${(p) =>
    p.selected
      ? theme.colors.monicastro.blue
      : p.index % 4 === 0
      ? theme.colors.monicastro.darkGreyLight
      : theme.colors.monicastro.grey};

  border-bottom: 1px solid rgba(0, 0, 0, 0.15);

  flex-direction: row;

  ${mq("min").tabletWide} {
    &:hover {
      background: ${theme.colors.monicastro.blue};
      cursor: pointer;
      opacity: 0.5;
    }

    &:active {
      opacity: 1;
    }
  }

  &:focus {
    border: 2px solid ${theme.colors.monicastro.blue};
  }
`;
