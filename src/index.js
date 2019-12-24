import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Routes from "./common/Routes.js";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./client/store/reducers/rootReducer.js";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import {
  reactReduxFirebase,
  getFirebase,
  authIsReady
} from "react-redux-firebase";
import fbConfig from "./config/fbConfig.js";
import "./styles.css";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users"
    })
  )
);

function App() {
  return (
    <Fragment>
      <Routes />
    </Fragment>
  );
}

const rootElement = document.getElementById("root");

// (()=>console.log(authIsReady))()
authIsReady(store, "firebase").then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
});
