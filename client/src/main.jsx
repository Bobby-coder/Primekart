import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster position="bottom-right" reverseOrder={true} />
        <DndProvider backend={HTML5Backend}>
          <App />
        </DndProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
