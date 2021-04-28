import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
//MUI stuff(material UI)
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//ICONS
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';
import PublicIcon from '@material-ui/icons/Public';

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <PostScream/>
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon/>
                                </MyButton>
                            </Link>
                            <MyButton tip="Notifications">
                                <Notifications/>
                            </MyButton>
                            <Link to='/news'>
                                <MyButton tip="News">
                                    <PublicIcon />
                                </MyButton>
                            </Link>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
