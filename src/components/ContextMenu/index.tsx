import React from "react";
import { RelativeWrapper, AbsoluteWrapper } from "./styled";

interface Props {
  children: React.ReactNode;
}

export const ContextMenu = ({ children }: Props) => {
  return (
    <React.Fragment>
      <RelativeWrapper>
        <AbsoluteWrapper>{children}</AbsoluteWrapper>
      </RelativeWrapper>
    </React.Fragment>
  );
};

export default ContextMenu;
