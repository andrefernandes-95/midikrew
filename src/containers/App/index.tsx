import React from "react";
import Header from "components/Header";
import GlobalStyle from "global/global-styles";
import Home from "pages/Home";

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Header />
      <Home />
    </React.Fragment>
  );
};

export default App;
