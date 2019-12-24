import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),

    textDecoration: "none"
  }
}))(Button);

export default () => {
  return (
    <Fragment>
      <NavLink to="/login" style={{ textDecoration: "none" }}>
        <ColorButton>Login</ColorButton>
      </NavLink>
      <NavLink to="/signup" style={{ textDecoration: "none" }}>
        <ColorButton>Signup</ColorButton>
      </NavLink>
    </Fragment>
  );
};
