import React, { useState } from "react";
import { Fragment } from "react";

//MUI Stuff
import { Button, Dialog, Grid, List, Typography } from "@material-ui/core";

//ICONS
import { Close, People } from "@material-ui/icons";
//COMPONENTS
import User from "./User";

export default function Following({ following }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Button
        style={{ marginBottom: "7px" }}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        <People />
        &nbsp;
        {Object.entries(following).length}
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <Grid container>
          <Grid sm={2} item>
            <Fragment></Fragment>
          </Grid>
          <Grid sm={8} item>
            <Typography
              variant="h6"
              style={{ textAlign: "center", paddingTop: "7px" }}
            >
              Following
            </Typography>
          </Grid>
          <Grid sm={2} item>
            <Button
              style={{ paddingTop: "7px", position: "absolute", right: "0" }}
              tip="Close"
              onClick={handleClose}
            >
              <Close />
            </Button>
          </Grid>
        </Grid>
        <List>
          {Object.entries(following).map(([user, imageUrl]) => (
            <User
              key={user}
              user={user}
              imageUrl={imageUrl}
              isBeingFollowed={true}
            />
          ))}
        </List>
      </Dialog>
    </Fragment>
  );
}
