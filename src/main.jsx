import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ChatProvider from "./context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

// import GlobalProvider from "./context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <GlobalProvider>
  <BrowserRouter>
    <ChatProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatProvider>
  </BrowserRouter>
  // </GlobalProvider>
);
