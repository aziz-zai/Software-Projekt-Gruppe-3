import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';

/** 
 * Renders a landing page for users who are not signed in. Provides a sign in button 
 * for using an existing google account to sign in. The component uses firebase to 
 * do redirect based signin process.
 * 
 * @see See Googles [firebase authentication](https://firebase.google.com/docs/web/setup)
 * @see See Googles [firebase API reference](https://firebase.google.com/docs/reference/js)
 * 
 */
class SignIn extends Component {


	/** 
	 * Handles the click event of the sign in button an calls the prop onSignIn handler
	 */
	handleSignInButtonClicked = () => {
		this.props.onSignIn();
	}

	/** Renders the sign in page, if user objext is null */
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Typography className={classes.root} align='center' variant='h6'>Welcome to the LernApp</Typography>
				<Typography className={classes.root} align='center'>It appears, that you are not signed in.</Typography>
				<Typography className={classes.root} align='center'>To use the services of the LernApp please Sign in.</Typography>
				<Grid container justify='center'>
				<Grid item>
				<Button variant='contained' color='white' onClick={this.handleSignInButtonClicked}>
					Name
					<input></input>
					Passwort
					<input></input>
      			</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

/** Component specific styles */
const styles = theme => ({
	root: {
		margin: theme.spacing(2)
	}
});

/** PropTypes */
SignIn.propTypes = {
	/** @ignore */
	classes: PropTypes.object.isRequired,
	/** 
	 * Handler function, which is called if the user wants to sign in.
	 */
	onSignIn: PropTypes.func.isRequired,
}

export default withStyles(styles)(SignIn)