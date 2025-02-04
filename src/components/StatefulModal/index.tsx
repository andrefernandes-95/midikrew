// @flow
import React, { ReactNode, Component } from "react";
import Modal from "modals/_Modal";
import { Row } from "componentsStyled/Layout";
import { Wrapper } from "./styled";
import useOpen from "hooks/useOpen";

interface Props {
  component: React.FC<{ close: () => void }>;
  children: ReactNode;
  title: string;
}

const StatefulModal = ({ component: Component, children, title }: Props) => {
  const { isOpen, toggleOpen } = useOpen();

  return (
    <React.Fragment>
      <Wrapper>
        <Wrapper onClick={toggleOpen}>
          <Row>{children}</Row>
        </Wrapper>
        {isOpen && (
          <Modal title={title} close={toggleOpen}>
            <Component close={toggleOpen} />
          </Modal>
        )}
      </Wrapper>
    </React.Fragment>
  );
};

export default StatefulModal;
