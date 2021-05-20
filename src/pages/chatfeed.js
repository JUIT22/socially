import React, { Component } from "react";
import ChatRoom from "../components/chat/ChatRoom";

//import Grid from "@material-ui/core/Grid";
//import Paper from "@material-ui/core/Paper";

class chatfeed extends Component {
	render() {
		return (
			<div>
				<div style={{
                    
                    textAlign: 'center',
                    margin: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                   <h2>CHATroom</h2>
                </div>
				<ChatRoom />
				
			</div>

		);
	}
}

export default chatfeed;
