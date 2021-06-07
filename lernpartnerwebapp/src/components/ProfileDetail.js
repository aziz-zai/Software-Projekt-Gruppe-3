import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';

class ProfileDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      profile: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.profileID).then(profile =>
      this.setState({
        profile: profile,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          profile: null,
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

  render() {
    const { classes, Firstname, Lastname} = this.props;
    const {loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>


        <Typography className={classes.profileEntry}>
        Name: {Firstname} {Lastname} 
        </Typography>

        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={loadingError} contextErrorMsg={`The data of profile id ${Firstname} could not be loaded.`} onReload={this.getProfile} />
      </Paper>
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
  personID: PropTypes.string.isRequired,
  profileID: PropTypes.string.isRequired,
  Firstname: PropTypes.string.isRequired,
  Lastname: PropTypes.string.isRequired,
}

export default withStyles(styles)(ProfileDetail);