import React, { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography
} from "@material-ui/core";
import { Fingerprint, Mail } from "@material-ui/icons";
import PersonIcon from "@material-ui/icons/Person";
import { signUp } from "../../../client/store/actions/authActions";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: 0,
    [theme.breakpoints.up("sm")]: {
      marginTop: 100
    }
  },
  papper: {
    width: "100vw",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: theme.spacing(20),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 400,
      height: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      paddingTop: theme.spacing(5),
      paddingRight: theme.spacing(5),
      paddingLeft: theme.spacing(5),
      paddingBottom: theme.spacing(3),
      boxSizing: "border-box"
    }
  },

  margin: {
    boxSizing: "border-box",
    marginTop: theme.spacing(0.1)
  },
  button: {
    textTransform: "none",
    width: "120px",
    margin: "15px 18px 0",
    [theme.breakpoints.up("sm")]: {
      width: "120px",
      margin: "40px 18px 0"
    }
  },

  rem: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      position: "relative",
      display: "block",
      marginBottom: "3px",
      left: "-6px"
    }
  }
}));

const SignUpTab = ({ signUp, authError, auth }) => {
  const [ownerState, setOwnerState] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const handleOwnerChange = e => {
    setOwnerState({
      ...ownerState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.persist();
    e.preventDefault();
    signUp(ownerState);
  };

  const classes = useStyles();
  if (auth.uid) return <Redirect to="/creativeManager" />;
  return (
    <div className={classes.root}>
      <Paper className={classes.papper}>
        <Grid container direction="row" justify="center">
          <Typography variant="h4">Login</Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            className={classes.margin}
            spacing={3}
            direction="row"
            alignItems="flex-end"
            justify="center"
          >
            <Grid item>
              <PersonIcon />
            </Grid>
            <Grid item md={8} sm={8} xs={8}>
              <TextField
                id="firstName"
                label="firstName"
                type="firstName"
                fullWidth
                autoFocus
                required
                name="firstName"
                value={ownerState["firstName"]}
                onChange={handleOwnerChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.margin}
            spacing={3}
            direction="row"
            alignItems="flex-end"
            justify="center"
          >
            <Grid item style={{ opacity: 0 }}>
              <PersonIcon />
            </Grid>
            <Grid item md={8} sm={8} xs={8}>
              <TextField
                id="lastName"
                label="lastName"
                type="lastName"
                fullWidth
                autoFocus
                required
                name="lastName"
                value={ownerState["lastName"]}
                onChange={handleOwnerChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.margin}
            spacing={3}
            direction="row"
            alignItems="flex-end"
            justify="center"
          >
            <Grid item>
              <Mail />
            </Grid>
            <Grid item md={8} sm={8} xs={8}>
              <TextField
                id="username"
                label="email"
                type="email"
                fullWidth
                autoFocus
                required
                name="email"
                value={ownerState["email"]}
                onChange={handleOwnerChange}
              />
            </Grid>
          </Grid>
          <Grid
            container
            className={classes.margin}
            spacing={3}
            alignItems="flex-end"
            justify="center"
          >
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={8} sm={8} xs={8}>
              {!authError ? (
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                  name="password"
                  value={ownerState["password"]}
                  onChange={handleOwnerChange}
                />
              ) : (
                <TextField
                  id="password"
                  label=""
                  error
                  type="password"
                  fullWidth
                  required
                  name="password"
                  helperText={authError}
                  value={ownerState["password"]}
                  onChange={handleOwnerChange}
                  style={{
                    alignItems: "flex-start",
                    position: "relative",
                    top: "10px"
                  }}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            container
            style={{ margin: "10px 0 0 0px" }}
            alignItems="center"
            justify="flex-end"
          >
            <Grid item className={classes.rem}>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Button
                disableFocusRipple
                disableRipple
                style={{ textTransform: "none" }}
                variant="text"
                color="primary"
              >
                Forgot password ?
              </Button>
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: "10px" }}>
            <Button
              className={classes.button}
              type="submit"
              variant="outlined"
              color="primary"
            >
              SignUp
            </Button>
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <Button
                className={classes.button}
                variant="outlined"
                color="primary"
              >
                SigIn
              </Button>
            </Link>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: creds => dispatch(signUp(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpTab);
