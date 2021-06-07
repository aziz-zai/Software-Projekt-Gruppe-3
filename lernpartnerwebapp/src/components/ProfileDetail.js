import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { AppAPI, ProfileBO } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileBO from '../api/ProfileBO';

class ProfileDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      profile: new ProfileBO(),
      loadingInProgress: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    AppAPI.getAPI().getProfile(this.props.profileID).then(person =>
      this.setState({
        profile: profile,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          profile: null,
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

  render() {
    const { classes, profileID } = this.props;
    const { profile, loadingInProgress, loadingError } = this.state;
  
    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Profile
        </Typography>
        <Typography className={classes.profileEntry}>
          ID: {profileID} 
        </Typography>
        {
          profile ?
            <Typography>
              Profile: {profile.getFirstName()} {profile.getLastName()}
            </Typography>
            : null
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of profile id ${profileID} could not be loaded.`} onReload={this.getProfile} />
      </Paper>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  accountEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

ProfileDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  personID: PropTypes.string.isRequired,
  profileID: PropTypes.string.isRequired,
}

export default withStyles(styles)(ProfileDetail);