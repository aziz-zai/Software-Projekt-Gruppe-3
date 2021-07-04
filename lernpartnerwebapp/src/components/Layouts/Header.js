  import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import HeaderLogin from './Header-login'
import ProfileDropDown from '../dialogs/ProfileDropDown';

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

    return (           // scrollable tabs 
      <Paper variant='outlined' >
        <ProfileDropDown user={user} />
        <Typography variant='h3' component='h1' align='center'>
          LearnApp
        </Typography>
        {
          user ?
            <Tabs variant="scrollable" indicatorColor='primary' textColor='primary' align="justify"  value={this.state.tabindex} onChange={this.handleTabChange} >
            <Tab label='My Profile' component={RouterLink} to={`/MyProfile`} />
            <Tab label='Find Groups' component={RouterLink} to={`/AllGroups`} />
            <Tab label='Find Partners' component={RouterLink} to={`/AllPartners`} />
            <Tab label='Your Partners' component={RouterLink} to={`/ChatList`} />
            <Tab label='Partner Match' component={RouterLink} to={`/matchmaking`} />
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