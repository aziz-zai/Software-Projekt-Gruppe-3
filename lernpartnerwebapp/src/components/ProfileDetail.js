import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileForm from './dialogs/ProfileForm'
import ProfilePopUp from './dialogs/ProfilePopUp'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';


class ProfileDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      profile: [],
      loadingInProgress: false,
      loadingError: null,
      showProfileForm: false,
      request:[],
      requestSent:false
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.profileID).then(profile =>
      this.setState({
        profile: profile[0],
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          profile: [],
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
  updateProfileButton = (event) => {
    event.stopPropagation();
    this.setState({
      showProfileForm: true
    });
  }

  profileFormClosed = (profile) => {
    if (profile) {
      this.setState({
        profile: profile[0],
        showProfileForm: false
      });
    } else {
      this.setState({
        showProfileForm: false
      })
    }
  }

  sendRequest = () => {
    AppAPI.getAPI().sendRequest(2,3).then(newRequest =>
      this.setState({
        request: newRequest,
        loadingInProgress: false,
        loadingError: null,
        requestSent: true
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          request: [],
          loadingInProgress: false,
          loadingError: e,
          requestSent: false
        })
      );
 
    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null,
      requestSent: false
    });
  }
  render() {
    const { classes, Firstname, Lastname, profileID} = this.props;
    const {loadingInProgress, loadingError, showProfileForm, profile, history } = this.state;

    return (
      <div>
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        {Firstname} {Lastname} &nbsp; 
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.updateProfileButton} >
        </Button>
        <Button color='primary' onClick={this.sendRequestButton}>
        </Button>
        <ProfilePopUp show={showProfileForm} profile={profile} onClose={this.profileFormClosed} />
        </Typography>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of  ${Firstname} could not be loaded.`} onReload={this.getProfile} />
      </Paper>
      
      </div>
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