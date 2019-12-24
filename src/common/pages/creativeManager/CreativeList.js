import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container } from "@material-ui/core";
import CreativeSummary from "./CreativeSummary";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import uuid from "uuid";
const useStyles = makeStyles(theme => ({
  box: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      width: "100%"
    }
  }
}));

const CreactList = ({ creatives, auth }) => {
  const classes = useStyles();
  return (
    <Container maxWidth={false}>
      <Box component="div" className={classes.box}>
        {creatives &&
          creatives.map(item => (
            <CreativeSummary creative={item} id={item.id} key={uuid()} />
          ))}
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  // console.log(state)
  return {
    creatives: state.firestore.ordered.creatives,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    { collection: "creatives", where: [["_authorId", "==", props.auth.uid]] }
  ])
)(CreactList);
