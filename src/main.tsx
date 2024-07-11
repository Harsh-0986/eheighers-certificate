import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AdminProvider } from "./contexts/AdminContext.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toaster />
    </AdminProvider>
  </React.StrictMode>
);
