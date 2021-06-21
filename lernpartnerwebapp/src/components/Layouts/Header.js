  import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import HeaderAfterLogin from './Header-after-login'
import HeaderLogin from './Header-login'
import ProfileDropDown from '../dialogs/ProfileDropDown';

/**
 * Shows the header with the main navigation Tabs within a Paper.
 * 
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class Header extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      tabindex: 0
    };
  }

  /** Handles onChange events of the Tabs component */
  handleTabChange = (e, newIndex) => {
    // console.log(newValue)
    this.setState({
      tabindex: newIndex
    })
  };

  /** Renders the component */
  render() {
    const { user } = this.props;

    return (
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          LernApp
        </Typography>
        {
          user ?
            <Tabs indicatorColor='primary' textColor='primary' centered value={this.state.tabindex} onChange={this.handleTabChange} >
            <Tab label='All Profiles' component={RouterLink} to={`/AllProfiles`} />
            <Tab label='My Profile' component={RouterLink} to={`/MyProfile`} />
            <Tab label='Partner Match' component={RouterLink} to={`/matchmaking`} />
            <Tab label='About' component={RouterLink} to={`/about`} />
            </Tabs>
            : 
              <HeaderLogin/>
        }
      </Paper>
    )
  }
}

/** PropTypes */
Header.propTypes = {
  /** The logged in firesbase user */
  user: PropTypes.object,
}

export default Header;