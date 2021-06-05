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

class ProfileList extends Component {

  constructor(props) {
    super(props);

    let expandedID = null;

    if (this.props.location.expandProfile) {
      expandedID = this.props.location.expandProfile.getID();
    }
    // Init the state
    this.state = {
      profiles: [],
      filteredProfiles: [],
      profileFilter: '',
      error: null,
      loadingInProgress: false,
      expandedProfileID: expandedID,
      showProfileForm: false
    };
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson()
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

  onExpandedStateChange = profile => {
    // console.log(profileID);
    // Set expandend profile entry to null by default
    let newID = null;

    // If same profile entry is clicked, collapse it else expand a new one
    if (profile.getID() !== this.state.expandedProfileID) {
      // Expand the profile entry with profileID.
      newID = profile.getID();
    }
    // console.log(newID);
    this.setState({
      expandedProfileID: newID,
    });
  }

  /** 
   * Handles onProfileDeleted events from the ProfileListEntry component
   * 
   * @param {profile} ProfileBO of the ProfileListEntry to be deleted
   */
  profileDeleted = profile => {
    const newProfileList = this.state.profiles.filter(profileFromState => profileFromState.getID() !== profile.getID());
    this.setState({
      profiles: newProfileList,
      filteredProfiles: [...newProfileList],
      showProfileForm: false
    });
  }

  /** Handles the onClick event of the add profile button */
  updateProfileButtonClicked = event => {
    // Do not toggle the expanded state
    event.stopPropagation();
    //Show the ProfileForm
    this.setState({
      showProfileForm: true
    });
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
  filterFieldValueChange = event => {
    const value = event.target.value.toLowerCase();
    this.setState({
      filteredProfiles: this.state.profiles.filter(profile => {
        let firstNameContainsValue = profile.getFirstName().toLowerCase().includes(value);
        let lastNameContainsValue = profile.getLastName().toLowerCase().includes(value);
        return firstNameContainsValue || lastNameContainsValue;
      }),
      profileFilter: value
    });
  }

  /** Handles the onClose event of the clear filter button */
  clearFilterFieldButtonClicked = () => {
    // Reset the filter
    this.setState({
      filteredProfiles: [...this.state.profiles],
      profileFilter: ''
    });
  }

  render() {
    const { classes } = this.props;
    const { filteredProfiles, profileFilter, expandedProfileID, loadingInProgress, error, showProfileForm } = this.state;
    return (
      <div className={classes.root}>
        <Grid className={classes.profileFilter} container spacing={1} justify='flex-start' alignItems='center'>
          <Grid item>
            <Typography>
              Filter profile list by name:
              </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              autoFocus
              fullWidth
              id='profileFilter'
              type='text'
              value={profileFilter}
              onChange={this.filterFieldValueChange}
              InputProps={{
                endAdornment: <InputAdornment position='end'>
                  <IconButton onClick={this.clearFilterFieldButtonClicked}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs />
          <Grid item>
            <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProfileButtonClicked}>
              Add Profile
          </Button>
          </Grid>
        </Grid>
        { 
          // Show the list of ProfileListEntry components
          // Do not use strict comparison, since expandedProfileID maybe a string if given from the URL parameters
          filteredProfiles.map(profile =>
            <ProfileListEntry key={profile.getID()} profile={profile} expandedState={expandedProfileID === profile.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
              onProfileDeleted={this.profileDeleted}
            />)
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of profiles could not be loaded.`} onReload={this.getCustomers} />
        <ProfileForm show={showProfileForm} onClose={this.profileFormClosed} />
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

export default withRouter(withStyles(styles)(ProfileList));