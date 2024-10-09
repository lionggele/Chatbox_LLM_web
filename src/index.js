import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";  // Global styles
import App from "./App";  // The main app component
import { ProSidebarProvider } from "react-pro-sidebar";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div>
      <ProSidebarProvider>
        <App />  // Renders your main App component within the sidebar provider
      </ProSidebarProvider>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

