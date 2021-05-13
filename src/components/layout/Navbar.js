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
  FormControl,
} from "@material-ui/core";
//ICONS
import HomeIcon from "@material-ui/icons/Home";
import PublicIcon from "@material-ui/icons/Public";
import ForumIcon from "@material-ui/icons/Forum";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";

export class Navbar extends Component {
  state = {
    users: [],
    searchContent: "",
  };
  componentDidMount() {
    axios.get("/users").then((res) => {
      this.setState({ users: res.data.users });
    });
  }

  handleChange = (event) => {
    this.setState({ searchContent: event.target.value });
  };

  handleSearch = () => {
    const user = this.state.searchContent;
    if (user === "") return;
    window.location.replace(`/users/${user}`);
  };

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
            >
              {authenticated ? (
                <div
                  style={{
                    width: 300,
                  }}
                >
                  <FormControl style={{ width: "300px" }}>
                    <Autocomplete
                      freeSolo
                      id="free-solo-2-demo"
                      disableClearable
                      options={this.state.users}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="filled-basic"
                          label="Search..."
                          variant="filled"
                          onChange={this.handleChange}
                          InputLabelProps={{
                            style: { color: "#fff" },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                            style: {
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            },
                            endAdornment: (
                              <Button type="submit" onClick={this.handleSearch}>
                                <SearchIcon />
                              </Button>
                            ),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </div>
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
