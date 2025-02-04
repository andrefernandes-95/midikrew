import App from "containers/App";
import "assets/fonts/index.css";
import { Provider as ReduxProvider } from "react-redux";

import { createRoot } from "react-dom/client";
import reduxStore from "global/store";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={reduxStore}>
    <App />
  </ReduxProvider>
);
