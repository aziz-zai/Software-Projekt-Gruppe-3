import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, ListItem, ButtonGroup, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileBO from '../api/ProfileBO';
import ProfileForm from './dialogs/ProfileForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import PersonBO from '../api/PersonBO'

class MyProfile extends Component {

  constructor(props) {
    super(props);
    // Init the state
    this.state = {
      error: null,
      showProfileForm: false,
      person: new PersonBO,
      profile: new ProfileBO,
      showProfileForm: false,
      showProfileDeleteDialog: false,
      deletingInProgress: false,              // disable loading indicator  
      deletingError: null,
    };
  }

  
  getPersonByGoogleUserID = () => {
    AppAPI.getAPI().getPerson(this.props.currentUser.uid)
    .then((personBO) =>{
      this.setState({
        person: personBO[0],
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
  deletePerson = () => {
    AppAPI.getAPI().deletePerson().then(() => {
      this.setState({
        deletingInProgress: false,              // disable loading indicator  
        deletingError: null                     // no error message
      });
      this.deleteProfileDialogClosed();  // call the parent with the deleted person
    }).catch(e =>
      this.setState({
        deletingInProgress: false,              // disable loading indicator 
        deletingError: e                        // show error message
      })
    );
    // set loading to true
    this.setState({
      deletingInProgress: true,                 // show loading indicator
      deletingError: null                       // disable error message
    });
  }

 componentDidMount() {
    this.getPersonByGoogleUserID();
  }

  render() 
  {const { classes, currentUser} = this.props;
  {const { profile, session_id, loadingInProgress, showProfileDeleteDialog, showProfileForm, deletingInProgress, deletingError, person} = this.state;
    return (
      <div className={classes.root}>
        <Paper variant='outlined' className={classes.root}>
      <Typography align='center' variant='h1' position='static'>
                  {profile.firstname} {profile.lastname}
      </Typography>
      </Paper>
        <ListItem align='center'> 
        {profile ? 
        <Typography align= 'left' variant='body1' color='textSecondary' width= '100%' className={classes.profileEntry}>
                Firstname:      {profile.firstname} <br></br>
                Lastname:       {profile.lastname} <br></br>
                Interests:      {profile.interests} <br></br>
                Type:           {profile.type_} <br></br>
                Online:         {profile.online} <br></br>
                Frequency:      {profile.frequency} <br></br>
                Expertise:      {profile.expertise} <br></br>
                Extroversion:   {profile.extroversion} <br></br>
                </Typography>
                : null
              }
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
                {showProfileDeleteDialog ?
         <Dialog open={showProfileDeleteDialog} onClose={this.deleteProfileDialogClosed}>
         <DialogTitle id='delete-dialog-title'>Delete person
           <IconButton className={classes.closeButton} onClick={this.deleteProfileDialogClosed}>
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
           <DialogContentText>
             Are you sure, you want to delete your profile Mr.{profile.lastname}?<br></br>
             You will be gone fore ever...
           </DialogContentText>
           <LoadingProgress show={deletingInProgress} />
           <ContextErrorMessage error={deletingError} contextErrorMsg={`The person '${profile.firstname} ${profile.lastname}' (ID: ${profile.id_}) could not be deleted.`}
             onReload={this.deletePerson} />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.deleteProfileDialogClosed} color='secondary'>
             Cancel
           </Button>
           <Button variant='contained' onClick={this.deletePerson} color='primary'>
             Delete
           </Button>
         </DialogActions>
       </Dialog>
       : null}
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