import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfilePopUp from './dialogs/ProfilePopUp'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';

class ProfileDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      loadingInProgress: false,
      loadingError: null,
      showProfileForm: false,
      request:[],
      requestSent:false,
      profile: [],
      show: true,
    };
  }

  componentDidMount() {
   this.getProfile();
  }
  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.person)
    .then((profileBO) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profile: profileBO[0],
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

  acceptRequest = () => {
    AppAPI.getAPI().acceptReceivedRequest(this.props.request.id_).then(() =>
      this.setState({
        loadingInProgress: false,
        loadingError: null,
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e,
        })
      );
      }
      rejectRequest = () => {
        AppAPI.getAPI().deleteReceivedRequest(this.props.request.id_).then(() =>
          this.setState({
            loadingInProgress: false,
            loadingError: null,
            show: false,
          })).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
              loadingError: e,
            })
          );
          }

  sendRequest = () => {
    AppAPI.getAPI().sendRequest(this.props.person).then(newRequest =>
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
    const { classes} = this.props;
    const {loadingInProgress, loadingError,profile, showProfileForm, show} = this.state;

    return (
      show ?
      <div>
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        {profile.firstname} {profile.lastname} &nbsp;
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.updateProfileButton} >
        </Button>&nbsp; &nbsp;
        {
        this.props.personList ?
        <Button color='primary' startIcon={<AddIcon/>} onClick={this.sendRequest}>
         Request
        </Button>
        : null
        }
        {
        this.state.requestSent ?
        <Button color='primary' startIcon={<CheckCircleIcon></CheckCircleIcon>}>
        </Button> 
        : null
        }
        {
        this.props.request ?
        <div>
        <Paper>
        <Button color='primary' startIcon={<CheckCircleIcon></CheckCircleIcon>} onClick={this.acceptRequest}>
          Accept Request
        </Button>
        <Button color='default' startIcon={<CancelIcon></CancelIcon>}onClick={this.rejectRequest}>
        Reject Request
        </Button>
        </Paper>
        </div>
        : null
        }
        <ProfilePopUp show={showProfileForm} profile={profile} onClose={this.profileFormClosed} />
        </Typography>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of  ${profile.firstname} could not be loaded.`} />
      </Paper>
      </div>
      : null
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
  person: PropTypes.any.isRequired,
  personList: PropTypes.any.isRequired,
  request: PropTypes.any.isRequired,
}

export default withStyles(styles)(ProfileDetail);