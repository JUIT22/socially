import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

class ShareScream extends Component {
    state = {
        title: this.props.title,
        url: this.props.url
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ body: `${this.state.title} - <a>${this.state.url}` })
        alert('Scream Posted');
    };

    render() {
        return  (
            <Button size="small" color="primary" onClick={this.handleSubmit}>
                <ShareIcon />
            </Button>
        )
    }
}

ShareScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};
  
const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
    mapStateToProps,
    { postScream, clearErrors }
)(ShareScream);
