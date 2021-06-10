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
									<Redirect from='/' to='header-after-login' />
									<Route exact path='/header-after-login'>
										<Header_after_login/>
									</Route>
									<Route path='/accounts' component={AllProfileList} />
									<Route path='/about' component={About} />		
								</>
								:
								// else show the sign in page
								<>
									<Redirect to='/index.html' />
									<LogIn onLogIn={this.handleSignIn} />
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
