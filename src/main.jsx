import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { setAnalyticsUser } from "./helpers/analytics.js";
import secureLocalStorage from "react-secure-storage";

const user = secureLocalStorage.getItem("user");
setAnalyticsUser(user ? JSON.parse(user).id : null);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
