import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import User from "./User";
import axios from "axios";

//MUI stuff
import { Close, PeopleOutline } from "@material-ui/icons";
import { Button, Dialog, Grid, List, Typography } from "@material-ui/core";
const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getRecommendations();
  }, []);

  const getRecommendations = () => {
    axios.get("/recommend").then((res) => {
      setRecommendations(res.data);
    });
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        style={{ marginLeft: "5px", marginBottom: "7px" }}
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
      >
        <PeopleOutline />
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
              Recommendations
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
          {recommendations.map((user) => (
            <User
              key={user.handle}
              user={user.handle}
              imageUrl={user.imageUrl}
              isBeingFollowed={false}
            />
          ))}
        </List>
      </Dialog>
    </Fragment>
  );
};

export default Recommendations;
