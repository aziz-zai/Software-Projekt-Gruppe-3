import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, ListItem, ListItemSecondaryAction, Paper, Typography, ButtonGroup, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { AiOutlineSave } from "react-icons/ai";
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
      profile: new ProfileBO(),
      showProfileForm: false,
      loadingError: null,
      deletingError: null,
    };
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
      <Paper variant='outlined' className={classes.root}>
      <Typography align='center' variant='h1' position='static'>
                  {profile.getFirstName()} {profile.getLastName()}
      </Typography>
      </Paper>
        <ListItem align='center'>
          <Typography 
          align= 'left' 
          variant='h2' 
          color='primary' 
          width= '100%' 
          className={classes.profileEntry}>
                Firsthand:      {profile.getFirstName()} <br></br>
                Lastname:       {profile.getLastName()} <br></br>
                Interests:      {profile.getInterests()} <br></br>
                Type:           {profile.getType()} <br></br>
                Online:         {profile.getOnline()} <br></br>
                Frequency:      {profile.getFrequency()} <br></br>
                Expertise:      {profile.getExpertise()} <br></br>
                Extroversion:   {profile.getExtroversion()} <br></br>
                </Typography>
                <ButtonGroup variant='text' size='large'>
                  <Button 
                  className={classes.buttonMargin} 
                  variant='outlined' 
                  color='primary'
                  size='small' 
                  padding= '5px, 15px'
                  background-color= '#3949ab'
                  positi
                  
                  

                  startIcon={<AiOutlineSave/>} 
                  onClick={this.updateProfileButton}>
                    Click for edit
                  </Button>
                </ButtonGroup>
                </ListItem>
                
          <ProfileForm show={showProfileForm} profile={profile} onClose={this.profileFormClosed} />
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
