import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header_after_login from './components/Layouts/Header-after-login';
import Header from './components/Layouts/Header'
import Header_login from './components/Layouts/Header-login';
import AllProfileList from './components/AllProfileList'
import About from './components/pages/About';
import theme from './Theme';
import LogIn from './components/pages/LogIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
import MyProfile from './components/MyProfile'


class App extends React.Component {
	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {

		};
	}


	/** Renders the whole app */
	render() {
    const { currentUser, appError, authError, authLoading } = this.state;
		return (
		<MyProfile></MyProfile>
		);
	}
}

export default App;
