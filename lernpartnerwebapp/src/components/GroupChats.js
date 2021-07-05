import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button} from '@material-ui/core';
import { AppAPI} from '../api';
import AddIcon from '@material-ui/icons/Add';
import GroupDetail from './GroupDetail'
import CreateGroupForm from './dialogs/CreateGroupForm'



 class GroupChats extends Component {


  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
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
    AppAPI.getAPI().getGroupsOfaPerson().then(groups => //load your own groups
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



  groupFormClosed = (group) => {    //close the creategroupDialog
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

  createGroupButton = (event) => {  //open show createGroupDialog
    event.stopPropagation();
    this.setState({
      showCreateGroupForm: true
    });
  }

  

  render() {
    const { classes } = this.props;
    const { groupList} = this.state;

    return (
      <div className={classes.root}> <br></br>  
        <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.createGroupButton}>
            Neue Gruppe
        </Button> &nbsp; &nbsp;
        {
            groupList.map(group =>
              <GroupDetail showChat={true} showLeaveGroup={true} learngroup={group}> </GroupDetail>) //sent each group to GroupDetail component
          }

          <CreateGroupForm show={this.state.showCreateGroupForm}  onClose={this.groupFormClosed}></CreateGroupForm> 
      </div> //CreateGroupForm is shown when createGroupButton is pressed

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