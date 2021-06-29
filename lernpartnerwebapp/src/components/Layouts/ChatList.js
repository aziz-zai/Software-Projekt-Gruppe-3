import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, ThemeProvider, CssBaseline } from '@material-ui/core';
import ChatsHeader from './ChatsHeader'
import AllProfileList from '../AllProfileList'
import PropTypes from 'prop-types';
import GroupChats from '../GroupChats'
import PartnerChats from '../PartnerChats'
class ChatList extends React.Component {
	/** Constructor of the app, which initializes firebase  */
	constructor(props) {
		super(props);

		// Init an empty state
		this.state = {

		};
	}


	/** Renders the whole app */
	render() {
    const { appError, authError, authLoading } = this.state;
		return (
				<Router basename={process.env.PUBLIC_URL}>
					<Container maxWidth='md'>
						<ChatsHeader user={this.props.currentUser} />
                  					<Redirect from='/ChatList' to='groups' />
									<Route exact path='/groups'>
										<GroupChats/>
									</Route>
                                    <Route path='/partners' component={() => <PartnerChats/>}/>
					</Container>
				</Router>
		);
	}
}

ChatList.propTypes = {
    /** @ignore */
    currentUser: PropTypes.object.isRequired,
  }

export default ChatList;