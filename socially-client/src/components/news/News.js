import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ShareScream from "../scream/ShareScream";

const useStyles = makeStyles({
  root: {
    maxWidth: '800px',
    margin: '30px auto',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '5px'
  },
  media: {
    height: 400
  }
});

export default function News(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea href={props.single.url} target="_blank">
        <CardMedia
          className={classes.media}
          image={props.single.urlToImage}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.single.source.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.single.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href='/news' style={{margin: 'auto'}}>
          <ShareScream title={props.single.title} url={props.single.url}/>
        </a>
      </CardActions>
    </Card>
  );
}
