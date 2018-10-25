import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from "./reducers";
import App from "./components/App/App";

const store = createStore(rootReducer);

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("hue")
);