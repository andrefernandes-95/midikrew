import StatefulModal from "components/StatefulModal";
import { Li } from "./styled";

type Props = {
  options: Array<{
    icon?: React.FC;
    name: string;
    onClick?: () => void;
    component: React.FC;
  }>;
};

const Menu = ({ options }: Props) => {
  return (
    <ul>
      {options.map((option, index) =>
        option.onClick ? (
          <Li key={index} onClick={option.onClick}>
            {option.icon && <option.icon />} {option.name}
          </Li>
        ) : (
          <Li key={index}>
            <StatefulModal title={option.name} component={option.component}>
              {option.icon && <option.icon />} {option.name}
            </StatefulModal>
          </Li>
        )
      )}
    </ul>
  );
};

export default Menu;
