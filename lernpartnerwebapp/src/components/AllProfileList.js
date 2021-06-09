import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileDetail from './ProfileDetail';
import Header from '../components/Layouts/Header';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import ProfileListEntry from './ProfileListEntry';
/**
 * Shows all profiles of the app.
 * 
 */
class AllProfileList extends Component {

  constructor(props) {
    super(props);

    /*let expandedID = null;

    if (this.props.location.expandProfile) {
      expandedID = this.props.location.expandProfile.getID();
    }*/

    // Init an empty state
    this.state = {
      profiles: [],
      filteredProfiles: [],
      profileFilter: '',
      error: null,
      loadingInProgress: false,
      loadingError: null,
      //  expandedProfileID: expandedID,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadProfiles();
  }

  /** gets the profile list for this profile */
  loadProfiles = () => {
    AppAPI.getAPI().getAllProfiles().then(profiles =>
      this.setState({
        profiles: profiles,
        loadingInProgress: false, // loading indicator 
        loadingError: null,
        filteredProfiles: [...profiles],
        error: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: false,
          error: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }
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
  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { filteredProfiles, profileFilter, profiles, loadingInProgress, loadingError, error, expandedProfileID } = this.state;

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
            filteredProfiles.map(profile =>
              <ProfileDetail key={profile.getID()} profileID={profile.getPersonID()} Firstname={profile.getFirstName()} Lastname={profile.getLastName()} //expandedState={expandedProfileID === profile.getID()}
              //  onExpandedStateChange={this.onExpandedStateChange}
              />)
          }
          <LoadingProgress show={loadingInProgress} />
          <ContextErrorMessage error={loadingError} contextErrorMsg={`The list of all profiless of the bank could not be loaded.`} onReload={this.loadProfiles} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
AllProfileList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllProfileList);