import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

//MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typorgraphy from '@material-ui/core/Typography';
import Typography from '@material-ui/core/Typography';

const styles ={
    card: {
        diplay: 'flex'
    }
} 
class Scream extends Component {
    render() {
        const {classes,scream :{body,createdAt,userImage,userHandle,screamId,likeCount,commentCount}} = this.props
        return (
            <Card>
                <CardMedia
                image={userImage}
                title='Profile image'/>
                <CardContent>
                    <Typorgraphy varient="h5">{userHandle}</Typorgraphy>
                    <Typography varient="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography varient="body1">{body}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Scream);
