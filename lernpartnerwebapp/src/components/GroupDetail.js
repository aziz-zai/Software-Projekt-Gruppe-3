import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button, Dialog, DialogTitle, IconButton, DialogContent, ButtonGroup, DialogContentText, DialogActions} from '@material-ui/core';
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
import GroupIcon from '@material-ui/icons/Group';
import CloseIcon from '@material-ui/icons/Close';

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
      showGroupChatComponent: false,
      leaveGroup: false,
      showGroup: true,
    };
  }


  leaveGroup = () => {
    AppAPI.getAPI().leaveGroup(this.props.learngroup.id_).then(groups =>
      this.setState({
        leftGroup: true,
        loadingInProgress: false,
        leaveGroup: false,
        showGroup: false,
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
      showGroupChatComponent: true,
    })
  }

  closeChatComponent = () => {
    this.setState({
      showGroupChatComponent: false,
    })
  }

leaveGroupButton = () => {
  this.setState({
    leaveGroup: true,
  })
}

leaveGroupClose = () => {
  this.setState({
    leaveGroup: false,
  })
}
 
  render() {
    const { classes, } = this.props;
    const {loadingInProgress, loadingError, showGroupForm, learngroup, leaveGroup, memberList, showGroup} = this.state;

    return (
      showGroup ?
      <div>
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
          {this.props.learngroup.groupname}
        <Button  color='primary' startIcon={<GroupIcon/>} onClick={this.GroupInfo} >
        </Button>
        {this.props.showLeaveGroup ?
          <Button   color='primary' startIcon={<CancelIcon/>} onClick={this.leaveGroupButton} >
            Leave Group
          </Button>
          : null
        }
          <Dialog open={leaveGroup} onClose={this.leaveGroupClose}>
              <DialogTitle id='delete-dialog-title'>Delete {this.props.learngroup.groupname}
           <IconButton align='right' onClick={this.leaveGroupClose}>
             <CloseIcon align='right'/>
           </IconButton>
         </DialogTitle>
            <DialogContent>
              Do you really want to delete this group?
            </DialogContent>
            <Button variant='contained' color='primary' size='small' onClick={this.leaveGroup}>
              YES
            </Button>
            <Button variant='contained' color='default' size='small' onClick={this.leaveGroupClose}>
              NO
            </Button>
          </Dialog>
        {
          this.props.showChat?
          <Button color='primary' onClick={this.showChatComponent}startIcon={<ChatIcon/>}>
          </Button>
          :null
        }
        <GroupChatting showChat={this.state.showGroupChatComponent} onClose={this.closeChatComponent} group={this.props.learngroup}></GroupChatting>

        <GroupPopUp showRequestGroup={this.props.showRequestGroup} group={this.props.learngroup} show={showGroupForm} onClose={this.GroupPopUpClosed}></GroupPopUp>
        </Typography>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of  ${learngroup} could not be loaded.`} onReload={this.getGroup} />
      </Paper>
      </div>
      :null
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