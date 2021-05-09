import React, { useState, useEffect } from "react";
import MuiLink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import store from "../redux/store";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Following() {
  const classes = useStyles();
  const [users, setUsers] = useState({});
  useEffect(() => {
    const state = store.getState();
    if(state.user.credentials.following) setUsers(state.user.credentials.following);
  }, []);
  return (
    <List className={classes.root}>
      {Object.entries(users).map(([user,imageUrl]) => (
        <ListItem key={user}>
          <MuiLink
            component={Link}
            to={`/users/${user}`}
            color="primary"
            variant="h5"
          >
            <ListItemText primary={user} />
          </MuiLink>
        </ListItem>
      ))}
    </List>
  );
}
