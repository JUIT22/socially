import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
//MUI stuff(material UI)
import {
  AppBar,
  Toolbar,
  Grid,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
//ICONS
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import ForumIcon from "@material-ui/icons/Forum";
import ExploreIcon from "@material-ui/icons/Explore";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar
          style={{ width: "100%", flexGrow: 1 }}
          className="nav-container"
        >
          <Grid container spacing={3}>
            <Grid style={{ display: "flex" }} item xs>
              <Typography
                style={{
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                }}
                variant="h5"
              >
                <Link to="/" style={{ color: "white" }}>
                  SOCIALLY
                </Link>
              </Typography>
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              item
              xs={6}
            >
              {authenticated ? (
                <TextField
                  id="outlined-basic"
                  label="Search..."
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "#fff" },
                  }}
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              ) : (
                ""
              )}
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "40px",
                alignItems: "center",
              }}
              item
              xs
            >
              {authenticated ? (
                <Fragment>
                  <PostScream />
                  <Link to="/explore">
                    <MyButton tip="Explore">
                      <ExploreIcon />
                    </MyButton>
                  </Link>
                  <Link to="/">
                    <MyButton tip="home">
                      <HomeIcon />
                    </MyButton>
                  </Link>

                  <Link to="/news">
                    <MyButton tip="News">
                      <PublicIcon />
                    </MyButton>
                  </Link>

                  <Notifications />

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
                  <Button color="inherit" component={Link} to="/explore">
                    Explore
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Signup
                  </Button>
                </Fragment>
              )}
            </Grid>
          </Grid>
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
