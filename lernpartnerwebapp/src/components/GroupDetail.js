import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileForm from './dialogs/ProfileForm'
import GroupPopUp from './dialogs/GroupPopUp'
import GroupBO from '../api/GroupBO'
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChatIcon from '@material-ui/icons/Chat';
import GroupChatting from './GroupChatting'

class GroupDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      showGroupForm: false,
      loadingInProgress: false,
      loadingError: null,
      group: null,
      showProfileForm: false,
      leftGroup: false,
      showChatComponent: false,
    };
  }


  leaveGroup = () => {
    AppAPI.getAPI().leaveGroup(this.props.learngroup.id_).then(groups =>
      this.setState({
        leftGroup: true,
        loadingInProgress: false,
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          error: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  GroupInfo = (event) => {
    event.stopPropagation();
    this.setState({
      showGroupForm: true
    });
  }

  GroupPopUpClosed = (profile) => {
    if (profile) {
      this.setState({
        profile: profile[0],
        showGroupForm: false
      });
    } else {
      this.setState({
        showGroupForm: false
      })
    }
  }

  showChatComponent = () => {
    this.setState({
      showChatComponent: true,
    })
  }

  closeChatComponent = () => {
    this.setState({
      showChatComponent: false,
    })
  }
 
  render() {
    const { classes, } = this.props;
    const {loadingInProgress, loadingError, showGroupForm, learngroup, memberList} = this.state;

    return (
      <div>
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
          {this.props.learngroup.groupname}
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.GroupInfo} >
        </Button>
        {this.props.showLeaveGroup ?
          <Button   color='primary' startIcon={<CancelIcon/>} onClick={this.leaveGroup} >
            Leave Group
          </Button>
          : null
        }
        {
          this.state.leftGroup ?
          <Button color='primary' startIcon={<CheckCircleIcon/>}>
          </Button>
          :null
        }

        {
          this.props.showChat?
          <Button color='primary' onClick={this.showChatComponent}startIcon={<ChatIcon/>}>
          </Button>
          :null
        }
        <GroupChatting showChat={this.state.showChatComponent} onClose={this.closeChatComponent} group={this.props.learngroup}></GroupChatting>

        <GroupPopUp showRequestGroup={this.props.showRequestGroup} group={this.props.learngroup} show={showGroupForm} onClose={this.GroupPopUpClosed}></GroupPopUp>
        </Typography>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of  ${learngroup} could not be loaded.`} onReload={this.getGroup} />
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

GroupDetail.propTypes = {
  classes: PropTypes.object,
  learngroup: PropTypes.any,
  showRequestGroup: PropTypes.any,
  showChat: PropTypes.bool,

}

export default withStyles(styles)(GroupDetail);