import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { store } from "./app/Store";
import { login } from "./features/authSlice";
import "./index.css";
const authData = localStorage.getItem("auth");
if (authData) {
  const { token, token_type } = JSON.parse(authData);
  store.dispatch(login({ access_token: token, token_type }));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
