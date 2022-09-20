import React from "react";
import ReactDOM from "react-dom/client";

import CloneQueryBuild from "./pages/cloneQueryBuild/index";
import CloneReactFilterBox from "./pages/cloneReactFilterBox/index";

import "./index.css";
import "antd/dist/antd.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CloneReactFilterBox />
  </React.StrictMode>
);
