import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import { Container } from "@material-ui/core";
// import Playground  from '../../playground'

const Loading = () => <div> Loading ...</div>;

const CreativeManager = Loadable({
  loader: () => import("../pages/creativeManager"),
  loading: Loading
});

const Playground = Loadable({
  loader: () => import("../../playground"),
  loading: Loading
});

const Contents = ({ open, drawWidth }) => (
  <Container maxWidth={false}>
    <Route
      exact
      path="/creativeManager"
      render={props => {
        return <CreativeManager {...props} open={open} drawWidth={drawWidth} />;
      }}
    />
    <Route
      exact
      path="/playground"
      render={props => {
        // console.log(<Playground />);
        return <Playground {...props} open={open} drawWidth={drawWidth} />;
      }}
    />
  </Container>
);

export default Contents;
