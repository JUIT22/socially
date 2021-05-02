import React, { Component } from 'react';
import  ChatBody from '../components/chatbody/ChatBody';

class chatfeed extends Component {
    constructor(props){
        super(props);
        
    }
    render() {
        return (
            <div className = "__main">
                <ChatBody />
            </div>
        )
    }
}

export default chatfeed;
