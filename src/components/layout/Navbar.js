import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
//MUI stuff(material UI)
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//ICONS
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import ForumIcon from "@material-ui/icons/Forum";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar style={{ width: "100%" }} className="nav-container">
          <Typography style={{ left: 0 }} variant="h5" noWrap>
            SOCIALLY
          </Typography>
          <div style={{ margin: "0 0 0 auto", padding: "0 35px" }}>
            {authenticated ? (
              <Fragment>
                <PostScream />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon />
                  </MyButton>
                </Link>

                <Notifications />

                <Link to="/news">
                  <MyButton tip="News">
                    <PublicIcon />
                  </MyButton>
                </Link>
                <Link to="/chat">
                  <MyButton tip="Chats">
                    <ForumIcon />
                  </MyButton>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
