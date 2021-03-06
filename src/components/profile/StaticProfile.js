import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Button from "@material-ui/core/Button";
import store from "../../redux/store";

import axios from "axios";

const styles = (theme) => ({
  ...theme.spreadThis,
  paper: {
    padding: 20,
    marginLeft: 15,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: "#00bcd4",
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

const StaticProfile = (props) => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location },
  } = props;
  const state = store.getState();
  const currentUser = state.user.credentials.handle;
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (
      state.user.credentials.following &&
      currentUser &&
      handle in state.user.credentials.following
    ) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {}, [following]);

  const handleFollow = (e) => {
    e.preventDefault();
    if (currentUser) {
      axios.post(`/user/follow`, { handle, imageUrl });
      setFollowing(true);
    } else {
      window.location.replace("/login");
    }
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    if (currentUser) {
      axios.post(`/user/unfollow`, { handle });
      setFollowing(false);
    }
  };

  return (
    <Paper
      style={{ position: "fixed", minWidth: "300px" }}
      className={classes.paper}
    >
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            color="primary"
            variant="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          {handle === currentUser ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {following ? (
                <Button
                  size="small"
                  onClick={handleUnfollow}
                  variant="contained"
                  color="secondary"
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  size="small"
                  onClick={handleFollow}
                  variant="contained"
                  color="primary"
                >
                  Follow
                </Button>
              )}
            </div>
          )}
          <br />
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StaticProfile);
