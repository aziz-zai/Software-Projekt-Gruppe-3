import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, ListItem, ListItemSecondaryAction, Link, Typography, ButtonGroup } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import { Link as RouterLink } from 'react-router-dom';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import ProfileForm from './dialogs/ProfileForm'
import ProfileBO from '../api/ProfileBO'
class ProfileListEntry extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      profile: props.profile,
      showProfileForm: false,
      loadingError: null,
      deletingError: null,
    };
  }

/** Handles onChange events of the underlying ExpansionPanel */
expansionPanelStateChanged = () => {
  this.props.onExpandedStateChange(this.props.profile);
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
        profile: profile,
        showProfileForm: false
      });
    } else {
      this.setState({
        showProfileForm: false
      })
    }
  }

  /** Renders the component */
  render() {
    const { classes, profile } = this.props;
    const { person, showProfileForm, loadingError, loadingInProgress } = this.state;

    return (
      <div>
        <ListItem>
          <Typography className={classes.profileEntry}>
          </Typography>
                Firstname:      {profile.getFirstName()}, <br></br>
                Lastname:       {profile.getLastName()}, <br></br>
                Interests:      {profile.getInterests()}, <br></br>
                Type:           {profile.getType()}, <br></br>
                Online:         {profile.getOnline()}, <br></br>
                Frequency:      {profile.getFrequency()}, <br></br>
                Expertise:      {profile.getExpertise()}, <br></br>
                Extroversion:   {profile.getExtroversion()}, <br></br>
                <ButtonGroup variant='text' size='small'>
                  <Button color='primary' onClick={this.updateProfileButton}>
                    Click for edit
                  </Button>
                </ButtonGroup>
          <ProfileForm show={showProfileForm} profile={profile} onClose={this.profileFormClosed} />
        </ListItem>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%'
  },
});

ProfileListEntry.propTypes = {

  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileListEntry);
