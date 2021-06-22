import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, ListItem, ButtonGroup, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileBO from '../api/ProfileBO';
import ProfileForm from './dialogs/ProfileForm';
import SaveIcon from '@material-ui/icons/Save';

class MyProfile extends Component {

  constructor(props) {
    super(props);
    // Init the state
    this.state = {
      error: null,
      showProfileForm: false,
      person: [],
      profile: new ProfileBO,
      showProfileForm: false
    };
  }
  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.state.person.id_)
    .then((profileBO) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profile: profileBO[0],
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })}
      )
      .catch((e) =>
        this.setState({
          profile: 'test',
          loadingInProgress: false,
          loadingProfileError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  getPersonByGoogleUserID = () => {
    AppAPI.getAPI().getPerson(this.props.currentUser.uid)
    .then((personBO) =>{
     
      this.setState({
        person: personBO
      })
    this.getProfile()
    }, 
      )
      .catch((e) =>
        this.setState({
          person: []
        
        })
      )
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
  
  updateProfileButton = (event) => {
    event.stopPropagation();
    this.setState({
      showProfileForm: true
    });
  }
  
  componentDidMount() {
    this.getPersonByGoogleUserID();
  }

  render() 
  {const { classes} = this.props;
  {const { profile, showProfileForm} = this.state;
    return (
      <div className={classes.root}>
        <Paper variant='outlined' className={classes.root}>
      <Typography align='center' variant='h1' position='static'>
                  {profile.firstname} {profile.lastname}
      </Typography>
      </Paper>
        <ListItem align='center'>
          <Typography align= 'left' variant='body1' color='textSecondary' width= '100%' className={classes.profileEntry}>
                Firstname:                {profile.getFirstName()} <br></br>
                Lastname:                 {profile.getLastName()} <br></br>
                Interests:                {profile.getInterests()} <br></br>
                Learning type:            {profile.getType()} <br></br>
                Online preference:        {profile.getOnline()} <br></br>
                Learning frequency:       {profile.getFrequency()} <br></br>
                Personal competencies:   {profile.getExpertise()} <br></br>
                Personality trait:        {profile.getExtroversion()} <br></br>
                </Typography>
                <ButtonGroup variant='text' size='large'>
                  <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' startIcon={<SaveIcon/>} onClick={this.updateProfileButton}>
                    Click for edit
                  </Button>
                </ButtonGroup>
                </ListItem>
                <ProfileForm show={showProfileForm} profile={profile} onClose={this.profileFormClosed} />
      </div>
    );
  }
}
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  profileList: {
    marginBottom: theme.spacing(2),
  },
  updateProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default (withStyles(styles)(MyProfile));