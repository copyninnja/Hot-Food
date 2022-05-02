import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import RestaurantsContextProvider from "./context/RestaurantsContext";
import { AuthProvider } from "./context/useAuth";
import "./variables.module.css";
ReactDOM.render(
  <React.StrictMode>
    <RestaurantsContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RestaurantsContextProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
