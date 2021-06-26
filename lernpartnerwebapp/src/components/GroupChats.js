import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
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


/**
 * Shows all profiles of the app.
 * 
 */

 class ChatList extends Component {


  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
       person: [],
       groupList: [],
       memberships: [],
       showCreateGroupForm: false

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
    const {memberships, groupList} = this.state;

    return (

      <div className={classes.root}>
          <div>
          {
            console.log('GroupChat', this.state.groupList)
          }
          </div>
        <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.createGroupButton}>
            Neue Gruppe
        </Button>
        {
            groupList.map(group =>
              <GroupDetail learngroup = {group}> </GroupDetail>)
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
ChatList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatList);