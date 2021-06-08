import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './components/layout/Header';
import MyProfile from './components/MyProfile';
import About from './components/pages/About';
import Theme from './Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
import ProfileListEntry from '../src/components/ProfileListEntry'
import AllProfileList from './components/AllProfileList';


class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
		};
	}

	render() {
		const { } = this.state;
		return (
			<Router>
				<Switch>
					<Route exact path='/AlleProfile' />
					<MyProfile></MyProfile>
					<Route exact path='/SpezifischesProfil'/>
					<AllProfileList></AllProfileList>
				</Switch>
			</Router>
		);
	}
}

export default App;
