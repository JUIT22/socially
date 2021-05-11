import React, { useState } from "react";
import { Fragment } from "react";

//MUI Stuff
import { Button, Dialog, List } from "@material-ui/core";

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
        <Button tip="Close" onClick={handleClose}>
          <Close />
        </Button>
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
