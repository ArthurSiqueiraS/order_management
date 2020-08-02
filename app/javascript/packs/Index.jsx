import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import Notification from "../components/Notification"
import { Provider } from 'react-redux'
import store from './store/notifications/store'

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <App />
      <Notification />
    </Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});
