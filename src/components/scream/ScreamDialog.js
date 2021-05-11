import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) => ({
	...theme.spreadThis,
	profileImage: {
		maxWidth: "max-content",
		height: 200,
		borderRadius: "50%",
		objectFit: "cover",
	},
	dialogContent: {
		padding: 20,
	},
	closeButton: {
		position: "absolute",
		left: "90%",
	},
	expandButton: {
		position: "absolute",
		left: "90%",
	},
	spinnerDiv: {
		textAlign: "center",
		marginTop: 50,
		marginBottom: 50,
	},
});

class ScreamDialog extends Component {
	state = {
		open: false,
		oldPath: "",
		newPath: "",
	};

	componentDidMount() {
		if (this.props.openDialog) {
			this.handleOpen();
		}
	}

	handleOpen = () => {
		let oldPath = window.location.pathname;

		const { userHandle, screamId } = this.props;
		const newPath = `/users/${userHandle}/scream/${screamId}`;

		if (oldPath === newPath) oldPath = `/users/${userHandle}`;

		window.history.pushState(null, null, newPath);

		this.setState({ open: true, oldPath, newPath });
		this.props.getScream(this.props.screamId);
	};

	handleClose = () => {
		window.history.pushState(null, null, this.state.oldPath);
		this.setState({ open: false });
		this.props.clearErrors();
	};

	render() {
		const {
			classes,
			scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
			UI: { loading },
		} = this.props;

		let prv = 0,
			parsedBody = [],
			match;
		let regex = /http[s]?:\/\/[^\s]+/gi;
		if (body) {
			while ((match = regex.exec(body))) {
				parsedBody.push({ text: body.substring(prv, match.index), url: false, news: false });
				if (body.substring(regex.lastIndex - 5, regex.lastIndex) === ".news")
					parsedBody.push({
						text: body.substring(match.index, regex.lastIndex - 5),
						url: true,
						news: true,
					});
				else
					parsedBody.push({
						text: body.substring(match.index, regex.lastIndex),
						url: true,
						news: false,
					});
				prv = regex.lastIndex;
			}
			if (prv < body.length) parsedBody.push({ text: body.substring(prv, body.length), url: false, news: false });
		}
		const dialogMarkup = loading ? (
			<div className={classes.spinnerDiv}>
				<CircularProgress size={200} thickness={2} />
			</div>
		) : (
			<Grid container spacing={10}>
				<Grid item sm={5} style={{ backgroundColor: "lightgrey" }}>
					<img src={userImage} alt="Profile" className={classes.profileImage} />
				</Grid>
				<Grid item sm={7} style={{ backgroundColor: "lightgrey" }}>
					<Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
						@{userHandle}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
					</Typography>
					<hr className={classes.invisibleSeparator} />
					<Typography variant="body1">
						{parsedBody.map((obj) =>
							obj.url ? (
								<a target="_blank" rel="noreferrer" href={obj.text} style={{ color: "#0069c0" }}>
									{obj.news ? "Read Article Here" : obj.text}
								</a>
							) : (
								obj.text
							)
						)}
					</Typography>
					<LikeButton screamId={screamId} />
					<span>{likeCount} likes</span>
					<MyButton tip="comments">
						<ChatIcon color="primary" />
					</MyButton>
					<span>{commentCount} comments</span>
				</Grid>
				<hr className={classes.visibleSeparator} />
				<CommentForm screamId={screamId} />
				<Comments comments={comments} />
			</Grid>
		);
		return (
			<Fragment>
				<MyButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
					<UnfoldMore color="primary" />
				</MyButton>
				<Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
					<MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
						<CloseIcon />
					</MyButton>
					<DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

ScreamDialog.propTypes = {
	clearErrors: PropTypes.func.isRequired,
	getScream: PropTypes.func.isRequired,
	screamId: PropTypes.string.isRequired,
	userHandle: PropTypes.string.isRequired,
	scream: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	scream: state.data.scream,
	UI: state.UI,
});

const mapActionsToProps = {
	getScream,
	clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));
