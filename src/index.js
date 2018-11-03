import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers";
import App from "./components/App/App";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    margin: 0;
    padding: 0;
    background-color: #695987;
  }
`;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <App />
      <GlobalStyle />
    </React.Fragment>
  </Provider>,
  document.getElementById("hue")
);