import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper, Button } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProfileForm from './dialogs/ProfileForm'
import GroupPopUp from './dialogs/GroupPopUp'


class GroupDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      group: [],
      showGroupForm: false,
      loadingInProgress: false,
      loadingError: null,
      showProfileForm: false,
      memberList:[]
    };
  }

  componentDidMount() {
    this.getGroup();
  }

  getGroup = () => {
    AppAPI.getAPI().getGroupForPerson(this.props.groupID).then(group =>
      this.setState({
        group: group[0],
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          group: [],
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

  render() {
    const { classes, } = this.props;
    const {loadingInProgress, loadingError, showGroupForm, group, memberList} = this.state;

    return (
      <div>
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        {group.groupname} 
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.GroupInfo} >
        </Button>
        <GroupPopUp show={showGroupForm} group={group} onClose={this.GroupPopUpClosed}></GroupPopUp>
        </Typography>
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of  ${group} could not be loaded.`} onReload={this.getGroup} />
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
  classes: PropTypes.object.isRequired,
  groupID: PropTypes.any.isRequired,
  memberships: PropTypes.any.isRequired

}

export default withStyles(styles)(GroupDetail);