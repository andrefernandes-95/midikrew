import styled from "styled-components";
import { mq } from "common/mediaQueries";

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Margin = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
`;

export const PaddedColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
`;

export const PaddedContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin: 0.5rem;
  width: 100%;

  ${mq("max").tabletWide} {
    p {
      flex-direction: column;
    }
  }
`;
