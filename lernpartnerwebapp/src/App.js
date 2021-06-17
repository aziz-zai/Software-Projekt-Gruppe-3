import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header_after_login from './components/Layouts/Header-after-login';
import Header from './components/Layouts/Header';
import Header_login from './components/Layouts/Header-login';
import PersonList from './components/PersonList';
import AllProfileList from './components/AllProfileList'
import About from './components/pages/About';
import theme from './Theme';
import LogIn from './components/pages/LogIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
import ProfileDetail from './components/ProfileDetail'
import MyProfile from './components/MyProfile';
import Matchmaking from './components/Matchmaking';

class App extends React.Component {


	/** Renders the whole app */
	render() {
		return (
		<Matchmaking>
			Matching
		</Matchmaking>
		);
	}
}

export default App;
