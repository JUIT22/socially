import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Paper } from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";

export default function page404() {
  return (
    <Fragment>
      <Paper>
        <Container fixed>
          <Typography variant="h3" gutterBottom>
            ERROR 404: Page Not Found
          </Typography>
          <Typography variant="h5" gutterBottom>
            Click here to go to
            <MuiLink
              component={Link}
              to="/explore"
              style={{ textDecoration: "none" }}
            >
              &nbsp;Explore Page
            </MuiLink>
          </Typography>
        </Container>
      </Paper>
    </Fragment>
  );
}
