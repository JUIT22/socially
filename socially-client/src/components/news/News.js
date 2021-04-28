import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ShareIcon from '@material-ui/icons/Share';

const useStyles = makeStyles({
  root: {
    maxWidth: '800px',
    margin: '30px auto'
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
        <a href='/' style={{margin: 'auto'}}>
            <Button size="small" color="primary">
                <ShareIcon />
            </Button>
        </a>
      </CardActions>
    </Card>
  );
}
