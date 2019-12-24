import React, { Component, Fragment } from "react";
// import Footer from './Footer.js'
import Header from "./Header.js";
import SideBar from "./SideBar.js";
import Contents from "./Content.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Container extends Component {
  state = {
    open: false
  };

  drawerWidth = 240;

  handleDrawerOpen = e => {
    this.setState(prev => ({
      open: true
    }));
  };

  handleDrawerClose = e => {
    this.setState(prev => ({
      open: false
    }));
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div style={{ display: "flex" }}>
        <Header
          drawWidth={this.drawerWidth}
          openHandler={this.handleDrawerOpen}
          open={this.state.open}
        />
        <SideBar
          drawWidth={this.drawerWidth}
          closeHandler={this.handleDrawerClose}
          open={this.state.open}
        />
        <Contents drawWidth={this.drawerWidth} open={this.state.open} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Container);
