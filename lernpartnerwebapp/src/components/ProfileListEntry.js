import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, ListItem, ListItemSecondaryAction, Paper, Typography, ButtonGroup, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { Link as RouterLink } from 'react-router-dom';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProfileForm from './dialogs/ProfileForm'
import ProfileBO from '../api/ProfileBO'
class ProfileListEntry extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      profile: new ProfileBO,
      showProfileForm: false,
      loadingError: null,
      deletingError: null,
    };
  }


  
  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.person.id_)
    .then((profileBOs) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profile: profileBOs,
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

  profileFormClosed = (profile) => {
    if (profile) {
      this.setState({
        profile: profile,
        showProfileForm: false
      });
    } else {
      this.setState({
        showProfileForm: false
      })
    }
  }
  
  updateProfileButton = (event) => {
    event.stopPropagation();
    this.setState({
      showProfileForm: true
    });
  }
  
  
  componentDidMount() {
    this.getProfile();
  }

  /** Renders the component */
  render() {
    const { classes, person, show } = this.props;
    const { profile, showProfileForm, loadingError, loadingInProgress } = this.state;

    return (
      <div>
      {console.log('person' + person.id_)}
      {console.log('profile' + profile)}
      Firstname {profile.id_}
  
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%'
  },
});

ProfileListEntry.propTypes = {

  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ProfileListEntry);
