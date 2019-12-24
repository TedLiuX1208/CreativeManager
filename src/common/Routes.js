import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Container from "./container";
import Login from "./pages/login";
import Signup from "./pages/signup";
import CreativeManager from "./pages/creativeManager";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Container} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
