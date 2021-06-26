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
      showGroupForm: false,
      loadingInProgress: false,
      loadingError: null,
      group: null,
      showProfileForm: false,
    };
  }


  getGroup = () => {
    AppAPI.getAPI().getGroupForPerson(this.props.learngroup.learning_group).then(group =>
      this.setState({
        group: group,

        
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
        group: []
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

  componentDidMount() {
    this.getGroup();
  }

  render() {
    const { classes, } = this.props;
    const {loadingInProgress, loadingError, showGroupForm, learngroup, memberList} = this.state;

    return (
      <div>
        {console.log('memberID', this.props.learngroup)}
      <Paper variant='outlined' className={classes.root}>
        <Typography className={classes.profileEntry}>
        <Button  color='primary' startIcon={<AccountCircleIcon/>} onClick={this.GroupInfo} >
        </Button>
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
  classes: PropTypes.object.isRequired,
  learngroup: PropTypes.any.isRequired

}

export default withStyles(styles)(GroupDetail);