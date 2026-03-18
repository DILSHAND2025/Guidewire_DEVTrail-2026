import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./app.css";

console.log("main.jsx loaded");
console.log("React version:", React.version);

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (rootElement) {
  // Help verify JS is running by writing immediately to the root before React.
  rootElement.textContent = "(JS running) Mounting React…";

  const root = ReactDOM.createRoot(rootElement);
  console.log("React root created");

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App rendered");
} else {
  console.error("Root element not found!");
}