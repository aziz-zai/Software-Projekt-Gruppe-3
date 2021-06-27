import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button, Grid } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfilePopUp from './dialogs/ProfilePopUp'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveIcon from '@material-ui/icons/Remove';

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
      notAddedStatus: true,
      profile: [],
      show: true,
      newMember: [],
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

 
  addToGroup = () => {
    AppAPI.getAPI().addPersonToGroup(this.props.showGroupDetail, this.props.person).then(newMember =>
      this.setState({
        newMember: newMember,
        loadingInProgress: false,
        loadingError: null,
        requestSent: true,
        notAddedStatus: false,
        
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          newMember: [],
          loadingInProgress: false,
          loadingError: e,
          requestSent: false
        })
      );
    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null,
      requestSent: false,
      notAddedStatus: false,
    });
  }

  acceptGroupRequest = () => {
    AppAPI.getAPI().acceptMembershipRequest(this.props.groupRequest.id_).then(newMember =>
      this.setState({
        loadingInProgress: false,
        loadingError: null,
        requestSent: true,
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e,
        })
      );
    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null,

    });
  }

  rejectGroupRequest = () => {
    AppAPI.getAPI().rejectMembershipRequest(this.props.groupRequest.learning_group, this.props.person).then(newMember =>
      this.setState({
        loadingInProgress: false,
        loadingError: null,
        requestSent: true,
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: e,
        })
      );
    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null,

    });
  }



  render() {
    const { classes} = this.props;
    const {loadingInProgress, loadingError, profile, showProfileForm, show, notAddedStatus} = this.state;

    return (
      show ?
      <div>
        
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        {profile.firstname} {profile.lastname} &nbsp;
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.updateProfileButton} >
        </Button>&nbsp; &nbsp;
        {
        notAddedStatus ?
        this.props.showGroupDetail ?
        <Grid
        justify="left" // Add it here :)
        >
          <Grid item>
        <Button color='primary' startIcon={<AddIcon/>} onClick={this.addToGroup}>
         Add to Group
        </Button>
        </Grid>
        </Grid>
        : null
        : null
        }
        {
          this.props.groupRequest ?
          <div>
          <Button color='primary' startIcon={<AddIcon/>} onClick={this.acceptGroupRequest}>
         Accept
        </Button>
        <Button color='default' startIcon={<RemoveIcon/>} onClick={this.rejectGroupRequest}>
        Reject
       </Button>
       </div>
        :null
        }
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
        this.props.received ?
        <div>
          {
            (Math.abs((new Date() - new Date(this.props.request.timestamp))/86400000)) > 3 ?
            this.rejectRequest()
            :null
          }
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

        {
        this.props.sent ?
        <div>
          {
            (Math.abs((new Date() - new Date(this.props.request.timestamp))/86400000)) > 3 ?
            this.rejectRequest()
            :null
          }
        <Paper>
        <Button color='default' startIcon={<CancelIcon></CancelIcon>}onClick={this.rejectRequest}>
        Cancel Request
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
  received: PropTypes.any.isRequired,
  sent: PropTypes.any.isRequired,
  request: PropTypes.any.isRequired,
  showGroupDetail: PropTypes.any.isRequired,
  groupRequest: PropTypes.any.isRequired,
}

export default withStyles(styles)(ProfileDetail);