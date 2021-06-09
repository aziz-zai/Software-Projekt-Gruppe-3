import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline} from '@material-ui/core';
import MyProfile from './components/MyProfile';
import ProfileListEntry from '../src/components/ProfileListEntry'
import AllProfileList from './components/AllProfileList';


class Routes extends React.Component {

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
					<Route exact path='/AlleProfile' component={AllProfileList} />
					<AllProfileList></AllProfileList>
					<Route exact path='/SpezifischesProfil'/>
					<MyProfile></MyProfile>
				</Switch>
			</Router>
		);
	}
}

export default Routes;
