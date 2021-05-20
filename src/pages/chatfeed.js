import React, { Component } from "react";
import ChatRoom from "../components/chat/ChatRoom";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

class chatfeed extends Component {
	render() {
		return (
			<div>
				<Paper style={{ height: "100%" }} elevation={3}>
					<Grid container>
						<Grid item sm={8} xs={10}>
							<ChatRoom />
						</Grid>
					</Grid>
				</Paper>
			</div>
		);
	}
}

export default chatfeed;
