import theme from "global/theme";
import styled, { css } from "styled-components";

export const InstrumentContainer = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  justify-content: space-between;

  ${(p) =>
    p.selected &&
    css`
      background: ${theme.colors.autumn_leaves.orange};
    `}
`;
