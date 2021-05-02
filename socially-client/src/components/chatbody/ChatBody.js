import React, { Component } from 'react';
import './ChatBody.css';
import ChatList from '../chatlist/ChatList';
import ChatContent from '../chatcontent/ChatContent';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';



export default class ChatBody extends Component {
    render() {
        return (
            <Paper className="main_chatbody" style={{height: '100%'}} elevation={3}>
                    <Grid container spacing={10} >
                            <Grid item sm={4} xs={10}>
                                <ChatList/>
                            </Grid>
                            <Grid item sm={8} xs={10}>
                                <ChatContent/>
                            </Grid>
                        </Grid>
            </Paper>

            
        );
    }
}
