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


class GroupDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      group: new GroupBO,
      showGroupForm: false,
      loadingInProgress: false,
      loadingError: null,
      showProfileForm: false,
    };
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
        {console.log('memberID', this.props.learngroup.id_)}
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        {this.props.learngroup.groupname}
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.GroupInfo} >
        </Button>
        <GroupPopUp></GroupPopUp>
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
  learngroup: PropTypes.any.isRequired

}

export default withStyles(styles)(GroupDetail);