import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/routes";
import Nav from "./components/Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Nav />
      <RoutesConfig />
    </Router>
  </React.StrictMode>
);
