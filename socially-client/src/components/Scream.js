import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//MUI Stuff
import {Card} from '@material-ui/core';
import {CardContent} from '@material-ui/core';
import {CardMedia} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles ={
    card: {
        position: 'relative',
        diplay: 'flex',
        marginBottom:20,

    },
    details: {
        flexDirection :'column',
    },
    image:{
        minWidth: 200,
        minHeight: 100,
    },
    content:{
        padding: 25,
        objectFit:'cover',
    },
}; 
class Scream extends Component {
    render() {
        dayjs.extend(relativeTime)
        const {classes,
            scream :{
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            }
        } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                <CardMedia
                    className={classes.image}
                    image={userImage}
                    title="Profile image" 
                />
                <CardContent className={classes.content}>
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to ={`/users/${userHandle}`} 
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="textSecondary"
                    >
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography 
                        variant="body1"
                    >
                        {body}
                    </Typography>
                </CardContent>
                </div>
                
            </Card>
        );
    }
}

export default withStyles(styles)(Scream);