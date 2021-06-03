import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container} from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import Header from './components/layout/Header';
import ProfileList from './components/ProfileList';
//import About from './components/pages/About';
import AllProfileList from './components/AllProfileList';
//import Theme from '/Theme';
import SignIn from './components/pages/SignIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';

/**
 * The main bank administration app. It uses Googles firebase to log into the bank end. For routing the 
 * user to the respective pages, react-router-dom ist used.
 * 
 * @see See Google [firebase.auth()](https://firebase.google.com/docs/reference/js/firebase.auth.Auth)
 * @see See Google [firebase.auth().signInWithRedirect](https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithredirect)
 * @see [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
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
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header/>
								<Redirect from='/' to='profiles' />
								<Route exact path='/profiles'>
									<ProfileList/>
								</Route>
					</Container>
				</Router>
		);
	}
}

export default App;
