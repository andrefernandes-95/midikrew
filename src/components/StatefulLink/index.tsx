import { useRef, useEffect, ReactNode } from "react";
import {
  IoIosArrowDown as ArrowDownIcon,
  IoIosArrowUp as ArrowUpIcon,
} from "react-icons/io";
import useOpen from "hooks/useOpen"; // Using the custom hook
import ContextMenu from "components/ContextMenu";
import { Row } from "componentsStyled/Layout";
import { Wrapper } from "./styled";

interface Props {
  component: React.FC;
  children: ReactNode;
  data?: Record<string, unknown>;
}

const StatefulLink = ({ component: C, children, data }: Props) => {
  const { isOpen, toggleOpen, close } = useOpen();
  const myRef = useRef<HTMLDivElement>(null);

  // Close menu if clicking outside of the wrapper
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (myRef.current && !myRef.current.contains(event.target as Node)) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  // Close menu when data prop changes
  useEffect(() => {
    close();
  }, [data, close]);

  return (
    <Wrapper ref={myRef}>
      <Wrapper onClick={toggleOpen}>
        <Row>
          {children} {isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </Row>
      </Wrapper>
      {isOpen && (
        <ContextMenu>
          <C />
        </ContextMenu>
      )}
    </Wrapper>
  );
};

export default StatefulLink;
