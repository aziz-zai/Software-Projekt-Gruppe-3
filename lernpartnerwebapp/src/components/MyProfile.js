import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, ListItem, ButtonGroup, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileBO from '../api/ProfileBO';
import PersonBO from '../api/PersonBO';
import ProfileForm from './dialogs/ProfileForm';
import SaveIcon from '@material-ui/icons/Save';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';

class MyProfile extends Component {

  constructor(props) {
    super(props);


    // Init the state
    this.state = {
      error: null,
      showProfileForm: false,
      person: [],
      profile: new ProfileBO,
      showProfileForm: false,
      showProfileDeleteDialog: false
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

   /** Handles the onClick event of the delete customer button */
   deleteProfileButtonClicked = (event) => {
    event.stopPropagation();
    this.setState({
      showProfileDeleteDialog: true
    });
  }

  /** Handles the onClose event of the CustomerDeleteDialog */
  deleteProfileDialogClosed = (profile) => {
    // if customer is not null, delete it
    if (profile) {
      this.setState({
        profile: profile,
        showProfileDeleteDialog: false
      });
    } else {
      this.setState({
        showProfileDeleteDialog: false
      })
    }
  }
  componentDidMount() {
    this.getPersonByGoogleUserID();
  }

deletePerson = () => {
  AppAPI.getAPI().deletePerson(this.props.currentUser.uid).then(() => {
    this.setState({  // Set new state when PersonBOs have been fetched
      deletingInProgress: false, // loading indicator 
      deletingError: null
    })
    // console.log(person);
  }).catch(e =>
    this.setState({ // Reset state with error from catch 
      deletingInProgress: false,
      deletingError: e
    })
  );
    // set loading to true
    this.setState({
      deletingInProgress: true,
      deletingError: null
    });
  }

  render() 
  {const { classes, currentUser} = this.props;
  {const { profile, loadingInProgress, showDeleteDialog, showProfileForm, deletingInProgress, deletingError, person} = this.state;
    return (
      <div className={classes.root}>
        <Paper variant='outlined' className={classes.root}>
      <Typography align='center' variant='h1' position='static'>
                  {profile.firstname} {profile.lastname}
      </Typography>
      </Paper>
        <ListItem align='center'>
          <Typography align= 'left' variant='body1' color='textSecondary' width= '100%' className={classes.profileEntry}>
                Firstname:      {profile.getFirstName()} <br></br>
                Lastname:       {profile.getLastName()} <br></br>
                Interests:      {profile.getInterests()} <br></br>
                Type:           {profile.getType()} <br></br>
                Online:         {profile.getOnline()} <br></br>
                Frequency:      {profile.getFrequency()} <br></br>
                Expertise:      {profile.getExpertise()} <br></br>
                Extroversion:   {profile.getExtroversion()} <br></br>
                </Typography>
                <ButtonGroup variant='text' size='large'>
                  <Button className={classes.buttonMargin} variant='outlined' color='primary' size='small' startIcon={<SaveIcon/>} onClick={this.updateProfileButton}>
                    Click for edit
                  </Button>
                  <Button color='secondary' size='small' startIcon={<DeleteIcon />} onClick={this.deleteProfileButtonClicked}>
                    Delete
                  </Button>
                </ButtonGroup>
                </ListItem>
                <ListItem>
                  <LoadingProgress show={loadingInProgress || deletingInProgress} />
                </ListItem>
                <ProfileForm show={showProfileForm} profile={profile} onClose={this.profileFormClosed} />
                <PersonDeleteDialog show={showDeleteDialog} person={person} onClose={this.deleteProfileDialogClosed}/>
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