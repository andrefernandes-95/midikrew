import React from "react";
//import appConfiguration, { type Navlink } from "global/app";
//import StatefulLink from "components/StatefulLink";
import {
  //Link,
  BoldLink,
} from "componentsStyled/Typography";
import { Container, Spacer } from "./styled";

const Header = () => {
  //  const [user, loading, error] = useAuthState(firebase.auth());

  /*  const navLinks = user
    ? appConfiguration.navLinks.user
    : appConfiguration.navLinks.visitor;
*/

  const loading = false;
  const error = false;
  if (loading) {
    return (
      <Container>
        <BoldLink>Loading...</BoldLink>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <BoldLink>Error: {error}</BoldLink>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <Container>
        {/*
        {user !== undefined && (
          <React.Fragment>
            <BoldLink href={"/"}>
              {appConfiguration.applicationName.toUpperCase()}
            </BoldLink>
            {navLinks.map((navLink: Navlink, index: number) =>
              navLink.to || navLink.onClick ? (
                <Link
                  key={index}
                  href={navLink.to || "#"}
                  onClick={navLink.onClick || null}
                >
                  {navLink.name}
                </Link>
              ) : (
                <StatefulLink
                  key={index}
                  component={navLink.component}
                  data={user}
                >
                  <Link>{navLink.name}</Link>
                </StatefulLink>
              )
            )}
          </React.Fragment>
        )}*/}
      </Container>
      <Spacer />
    </React.Fragment>
  );
};

export default Header;
