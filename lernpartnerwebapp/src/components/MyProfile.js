import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { AppAPI } from '../api';
import ProfileListEntry from "./ProfileListEntry";
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileForm from './dialogs/ProfileForm';
import ProfileBO from '../api/ProfileBO'

class ProfileList extends Component {

  constructor(props) {
    super(props);


    // Init the state
    this.state = {
      profiles: new ProfileBO(),
      error: null,
      showProfileForm: false
    };
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(5)
    .then((profileBOs) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profiles: profileBOs[0],
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })}
      
      )
      .catch((e) =>
        this.setState({
          profile: [],
          loadingInProgress: false,
          loadingProfileError: e,
        })
      
      );

    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  componentDidMount() {
    this.getProfile();
  }

  
  /** Handles the onClose event of the ProfileForm */
  profileFormClosed = profile => {
    // profile is not null and therefore created
    if (profile) {
      const newProfileList = [...this.state.profiles, profile];
      this.setState({
        profiles: newProfileList,
        filteredProfiles: [...newProfileList],
        showProfileForm: false
      });
    } else {
      this.setState({
        showProfileForm: false
      });
    }
  }

  /** Handels onChange events of the profile filter text field */
  

  render() {const { classes} = this.props;
    return (
      <div className={classes.root}>
        <ProfileListEntry show={false} profile={this.state.profiles}></ProfileListEntry>
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
  updateProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
ProfileList.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default (withStyles(styles)(ProfileList));