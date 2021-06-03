import React from 'react';
//import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container} from '@material-ui/core';
//import firebase from 'firebase/app';
//import 'firebase/auth';
//import Header from './components/layout/Header';
import MyProfile from './components/MyProfile';
//import About from './components/pages/About';
//import AllProfileList from './components/AllProfileList';
//import Theme from '/Theme';
//import SignIn from './components/pages/SignIn';
//import LoadingProgress from './components/dialogs/LoadingProgress';
//import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
//import firebaseConfig from './firebaseconfig';


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


		return (
				<MyProfile/>
		);
	}
}

export default App;
