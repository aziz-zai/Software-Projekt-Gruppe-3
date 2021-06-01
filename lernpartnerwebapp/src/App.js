import React from 'react';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import Header_after_login from './components/Layouts/Header-after-login';
import Header_login from './components/Layouts/Header-login';
import PersonList from './components/PersonList';
import ProfileList from './components/ProfileList';
import About from './components/pages/About';
import theme from './Theme';
import LogIn from './components/pages/LogIn';
import LoadingProgress from './components/dialogs/LoadingProgress';
import ContextErrorMessage from './components/dialogs/ContextErrorMessage';
import firebaseConfig from './firebaseconfig';
import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    height: "100vh",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
})

class App extends React.Component {

	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {
			currentUser: null,
			appError: null,
			authError: null,
			authLoading: false
		};
	}

	/** 
	 * Create an error boundary for this app and recieve all errors from below the component tree.
	 * 
	 * @See See Reacts [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
 	 */
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { appError: error };
	}

	/** Handles firebase users logged in state changes  */
	handleAuthStateChange = user => {
		if (user) {
			this.setState({
				authLoading: true
			});
			// The user is signed in
			user.getIdToken().then(token => {
				// Add the token to the browser's cookies. The server will then be
				// able to verify the token against the API.
				// SECURITY NOTE: As cookies can easily be modified, only put the
				// token (which is verified server-side) in a cookie; do not add other
				// user information.
				document.cookie = `token=${token};path=/`;

				// Set the user not before the token arrived 
				this.setState({
					currentUser: user,
					authError: null,
					authLoading: false
				});
			}).catch(e => {
				this.setState({
					authError: e,
					authLoading: false
				});
			});
		} else {
			// User has logged out, so clear the id token
			document.cookie = 'token=;path=/';

			// Set the logged out user to null
			this.setState({
				currentUser: null,
				authLoading: false
			});
		}
	}

	handleSignIn = () => {
		this.setState({
			authLoading: true
		});
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}

	componentDidMount() {
		firebase.initializeApp(firebaseConfig);
		firebase.auth().languageCode = 'en';
		firebase.auth().onAuthStateChanged(this.handleAuthStateChange);
	}

	/** Renders the whole app */
	render() {
    const { currentUser, appError, authError, authLoading } = this.state;
    const classes = useStyles();
		return (
			<ThemeProvider theme={theme}>
				{/* Global CSS reset and browser normalization. CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline/>
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<Header user={currentUser} />
						{
							// Is a user signed in?
							currentUser ?
								<>
                  <Header_after_login/>
									<Redirect from='/' to='persons' />
									<Route exact path='/persons'>
										<PersonList />
									</Route>
									<Route path='/profile'>
										<ProfileList />
									</Route>
									<Route path='/about' component={About} />
								</>
								:
								// else show the sign in page
								<> 
                  <Header_login/>
									<Redirect to='/index.html' />
									<LogIn onSignIn={this.handleSignIn} />
								</>
						}
						<LoadingProgress show={authLoading} />
						<ContextErrorMessage error={authError} contextErrorMsg={`Something went wrong during sighn in process.`} onReload={this.handleSignIn} />
						<ContextErrorMessage error={appError} contextErrorMsg={`Something went wrong inside the app. Please reload the page.`} />
					</Container>
				</Router>
			</ThemeProvider>
		);
	}
}

export default App;