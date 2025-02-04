import { useRef, useEffect } from "react";
import {
  ModalWrapper,
  ModalContainer,
  ModalHeader,
  ModalContentWrapper,
  ModalContent,
  ModalTitle,
  ModalClose,
} from "./styled.ts";

interface Props {
  children: React.ReactNode;
  title: string;
  close: () => void;
}

const Modal = ({ children, title, close }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <ModalWrapper>
      <ModalContainer ref={modalRef}>
        <ModalHeader>
          <ModalTitle>{title || ""}</ModalTitle>
          <ModalClose onClick={close}>x</ModalClose>
        </ModalHeader>
        <ModalContentWrapper>
          <ModalContent>{children}</ModalContent>
        </ModalContentWrapper>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default Modal;
