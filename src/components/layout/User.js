import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import store from "../../redux/store";
import {
  ListItemText,
  Avatar,
  Link as MuiLink,
  Button,
  ListItem,
} from "@material-ui/core";

import axios from "axios";

export default function User({ user, imageUrl, isBeingFollowed }) {
  const state = store.getState();
  const currentUser = state.user.credentials.handle;
  const [following, setFollowing] = useState(isBeingFollowed);

  useEffect(() => {}, [following]);

  const handleFollow = (e) => {
    e.preventDefault();
    if (currentUser) {
      axios.post(`/user/follow`, { user, imageUrl });
      setFollowing(true);
    } else {
      window.location.replace("/login");
    }
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    if (currentUser) {
      axios.post(`/user/unfollow`, { user });
      setFollowing(false);
    }
  };

  return (
    <ListItem style={{ display: "flex", justifyContent: "space-around" }}>
      <Avatar alt="User Image" src={imageUrl} />
      <MuiLink
        component={Link}
        to={`/users/${user}`}
        color="primary"
        variant="h5"
      >
        <ListItemText primary={user} />
      </MuiLink>
      {currentUser ? (
        following ? (
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
        )
      ) : (
        ""
      )}
    </ListItem>
  );
}
