import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// redux
import { store } from "./store";
import { Provider } from "react-redux";
// styles
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
