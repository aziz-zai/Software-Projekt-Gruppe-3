import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileListEntry from './ProfileListEntry'

class ProfileDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      profile: null,
      loadingInProgress: false,
      loadingError: null,
      showProfile: false,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.profileID).then(profile =>
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
  goToProfileButton = (event) => {
    event.stopPropagation();
    this.setState({
      showProfile: true
    });
  }

  profileClosed = (profile) => {
    if (profile) {
      this.setState({
        profile: profile,
        showProfile: false
      });
    } else {
      this.setState({
        showProfile: false
      })
    }
  }

  render() {
    const { classes, Firstname, Lastname, profileID} = this.props;
    const {loadingInProgress, loadingError, showProfile, profile, history } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        {Firstname} {Lastname} &nbsp; 
        <Button  color='primary' startIcon={<AccountCircleIcon/>} >
        </Button>
        </Typography>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of  ${Firstname} could not be loaded.`} onReload={this.getProfile} />
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
  profileID: PropTypes.any.isRequired,
  Firstname: PropTypes.string.isRequired,
  Lastname: PropTypes.string.isRequired,
}

export default withStyles(styles)(ProfileDetail);