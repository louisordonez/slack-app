import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles/styles.scss";
import Toast from "./components/Toast/Toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Toast />
      <App />
    </BrowserRouter>
  </StrictMode>
);
