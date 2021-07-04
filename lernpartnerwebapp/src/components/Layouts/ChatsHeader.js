import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography, Tabs, Tab } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import HeaderLogin from './Header-login'
import ProfileDropDown from '../dialogs/ProfileDropDown';

class ChatsHeader extends Component {

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
    const { currentUser } = this.props;

    return (
            <Tabs TabIndicatorProps={{
                  style: {
                  backgroundColor: "#D97D54"
                   }
                  }} 
                  indicatorColor='primary' 
                  textColor='primary' 
                  centered value={this.state.tabindex} 
                  onChange={this.handleTabChange} >
            <Tab label='Partners' component={RouterLink} to={`/partners`} />
            <Tab label='Groups' component={RouterLink} to={`/groups`} />
            </Tabs>

    )
  }
}

/** PropTypes */
ChatsHeader.propTypes = {
  /** The logged in firesbase user */
  currentUser: PropTypes.object,
}

export default ChatsHeader;