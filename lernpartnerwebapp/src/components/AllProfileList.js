import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileDetail from './ProfileDetail';

/**
 * Shows all profiles of the app.
 * 
 */
class AllProfileList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      profiles: [],
      loadingInProgress: false,
      loadingError: null,
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
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { profiles, loadingInProgress, loadingError } = this.state;

    return (
      <div className={classes.root}>
        {console.log("sadsad")}
          {
            profiles.map(profile => <ProfileDetail key={profile.getPersonID()} 
            profileID={profile.getPersonID().toString()} Name={profile.getFirstName()}/>)
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
}

export default withStyles(styles)(AllProfileList);