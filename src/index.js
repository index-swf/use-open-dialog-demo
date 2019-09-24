import React from "react";
import ReactDOM from "react-dom";
import Demo from "./demo";
import { OpenModalProvider } from "./useOpenModal";

ReactDOM.render(
  <>
    <OpenModalProvider>
      <Demo />
    </OpenModalProvider>
  </>,
  document.querySelector("#root")
);
