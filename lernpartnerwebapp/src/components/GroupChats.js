import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import { AppAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import Header from '../components/Layouts/Header';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import ProfileBO from '../api/ProfileBO'
import GroupDetail from './GroupDetail'
import MembershipBO from '../api/MembershipBO'
import CreateGroupForm from './dialogs/CreateGroupForm'
import CloseIcon from '@material-ui/icons/Close';


 class GroupChats extends Component {


  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
       person: [],
       groupList: [],
       memberships: [],
       showCreateGroupForm: false,
       loadingInProgress: false,

    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadMyGroups();
  }

  loadMyGroups = () => {
    AppAPI.getAPI().getGroupsOfaPerson().then(groups =>
      this.setState({
        memberships: groups,
        groupList: groups

      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          memberships: [],
          groupList: []
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }



  profileFormClosed = (group) => {
    if (group) {
      this.setState({
        showCreateGroupForm: false
      });
    } else {
      this.setState({
        showCreateGroupForm: false
      })
    }
  }

  createGroupButton = (event) => {
    event.stopPropagation();
    this.setState({
      showCreateGroupForm: true
    });
  }

  

  render() {
    const { classes } = this.props;
    const { groupList,loadingInProgress} = this.state;

    return (
      <div className={classes.root}> <br></br>
        <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.createGroupButton}>
            Neue Gruppe
        </Button> &nbsp; &nbsp;
        {
            groupList.map(group =>
              <GroupDetail showChat={true} showLeaveGroup={true} learngroup={group}> </GroupDetail>)
          }

          <CreateGroupForm show={this.state.showCreateGroupForm} person={this.state.person} onClose={this.profileFormClosed}></CreateGroupForm>
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
GroupChats.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  location: PropTypes.object,
  currentUser: PropTypes.object,
}

export default withStyles(styles)(GroupChats);