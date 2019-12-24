import React, { Fragment } from "react";
import {
  IconButton,
  Badge,
  MenuItem,
  Menu,
  ColorButton,
  Avatar
} from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../client/store/actions/authActions.js";

const menuId = "primary-search-account-menu";
const mobileMenuId = "primary-search-account-menu-mobile";

// const renderMenu = (
//   <Menu
//     anchorEl={anchorEl}
//     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//     id={menuId}
//     keepMounted
//     transformOrigin={{ vertical: "top", horizontal: "right" }}
//     open={isMenuOpen}
//     onClose={handleMenuClose}
//   >
//     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//     <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//   </Menu>
// );

// const renderMobileMenu = (
//   <Menu
//     anchorEl={mobileMoreAnchorEl}
//     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//     id={mobileMenuId}
//     keepMounted
//     transformOrigin={{ vertical: "top", horizontal: "right" }}
//     open={isMobileMenuOpen}
//     onClose={handleMobileMenuClose}
//   >
//     <MenuItem>
//       <IconButton aria-label="show 4 new mails" color="inherit">
//         <Badge badgeContent={4} color="secondary">
//           <MailIcon />
//         </Badge>
//       </IconButton>
//       <p>Messages</p>
//     </MenuItem>
//     <MenuItem>
//       <IconButton aria-label="show 11 new notifications" color="inherit">
//         <Badge badgeContent={11} color="secondary">
//           <NotificationsIcon />
//         </Badge>
//       </IconButton>
//       <p>Notifications</p>
//     </MenuItem>
//     <MenuItem onClick={handleProfileMenuOpen}>
//       <IconButton
//         aria-label="account of current user"
//         aria-controls="primary-search-account-menu"
//         aria-haspopup="true"
//         color="inherit"
//       >
//         <AccountCircle />
//       </IconButton>
//       <p>Profile</p>
//     </MenuItem>

//   </Menu>
// );

const useStyles = makeStyles(theme => ({
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  orange: {
    color: theme.palette.getContrastText(indigo[200]),
    backgroundColor: indigo[200],
    fontSize: "14px",
    fontWeight: "700"
  }
}));

const SignedInLinks = ({ avator, signOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.sectionDesktop}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Avatar className={classes.orange}>{avator}</Avatar>
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMobileMenuOpen}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <a onClick={signOut} style={{ textDecoration: "none" }}>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </a>
      </Menu>
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = state => {
  return {
    avator: state.firebase.profile.avator
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLinks);
