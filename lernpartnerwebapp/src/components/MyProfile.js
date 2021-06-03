import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import { AppAPI } from '../api';
import ProfileBO from '../api/ProfileBO';

class MyProfile extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      profiles: new ProfileBO(),
      loadingInProgress: false,
      loadingProfileError: null,
      addingProfileError: null,
    };
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson().then(profileBOs =>
      this.setState({  // Set new state when ProfileBOs have been fetched
        profiles: profileBOs[0],
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })).catch(e =>
        this.setState({
          profile
          loadingInProgress: false,
          loadingProfileError: e
        })
      
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProfile();
  }

  render() {
    return (
      <div>
        profile  {this.state.profiles.get()}
      </div>
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
  },
  profileList: {
    marginBottom: theme.spacing(2),
  },
  addProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

export default withStyles(styles)(MyProfile);
