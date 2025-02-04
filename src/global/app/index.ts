import { loggedInLinks, loggedOutLinks } from "./helpers";

export type Navlink = {
  name: string;
  component?: React.FC;
  to?: string;
  onClick?: () => void;
  subLinks?: Array<Navlink>;
};

export default {
  applicationName: "Midikrew",
  navLinks: {
    user: loggedInLinks,
    visitor: loggedOutLinks,
  },
};
