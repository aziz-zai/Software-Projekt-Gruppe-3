import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, ListItem, ButtonGroup, Typography, 
IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, 
Grid, Card, Accordion, AccordionSummary, AccordionDetails, DialogActions} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileBO from '../api/ProfileBO';
import ProfileForm from './dialogs/ProfileForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import PersonBO from '../api/PersonBO'
import firebase from 'firebase/app';

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
    AppAPI.getAPI().getPerson(this.props.currentUser.uid)  //get your own persondata
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
    AppAPI.getAPI().getProfileForPerson(this.state.person.id_)    //get Profile of Person
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

  profileFormClosed = (profile) => {      //Close the porfile edit form
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
  
  updateProfileButton = (event) => {    //show the profile Form
    event.stopPropagation();
    this.setState({
      showProfileForm: true
    });
  }


   /** Handles the onClick event of the delete person button */
   deleteProfileButtonClicked = (event) => {  
    event.stopPropagation();
    this.setState({
      showProfileDeleteDialog: true
    });
  }

  /** Handles the delete dialog closed */
  deleteProfileDialogClosed = (profile) => {
    // if profile is not null, delete it
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
    AppAPI.getAPI().deletePerson(this.state.person.id_).then(() => {         //delete Person
      this.setState({
        deletingInProgress: false,              // disable loading indicator  
        deletingError: null                     // no error message
      });
      firebase.auth().signOut();
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
  {const { classes} = this.props;
  {const { profile, loadingInProgress, showProfileDeleteDialog, showProfileForm, 
            deletingInProgress, deletingError} = this.state;

    return (                                                    //show your own ProfileData and edit/delete button. show Deletes dialog
      <div className={classes.root}>
      
      <div align="center"> 
      <AccountCircleIcon className={classes.AccountCircle} align='center'/> &nbsp;
      </div>
        <div align= "center" className={classes.fname}> {profile.firstname} {profile.lastname}</div>
  
        <Paper align='left'> 
        {profile ? 
      <Grid align= 'left' variant='body1' color='default' width= '50%' className={classes.profileEntry}>
                <div className={classes.attribute}> 
                Firstname:      {profile.firstname} <br></br>
                </div>
                <div className={classes.attribute}> 
                Lastname:       {profile.lastname} <br></br>
                </div>
        <Accordion>
          <AccordionSummary align="center" className={classes.accordion}
          aria-controls="panel1a-content"
          id="panel1a-header">
            <Typography className={classes.heading}> 
            <div className={classes.attribute}>  Profile Details 
            <ExpandMoreIcon className={classes.ExpandIcon} >
            </ExpandMoreIcon> </div>
            </Typography>
          </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <Grid>
                <div className={classes.attribute}> 
                Personal Interests:      {profile.interests} <br></br>
                </div>
                <div className={classes.attribute}> 
                Learning Type:           {profile.type_} <br></br>
                </div>
                <div className={classes.attribute}> 
                Learning preference:         {(profile.online) ? "Prefers online" : "Prefers offline"} <br></br>
                </div>
                <div className={classes.attribute}> 
                Learning frequency per week:      {profile.frequency} <br></br>
                </div>
                <div className={classes.attribute}> 
                Competency Fields:      {profile.expertise} <br></br>
                </div>
                <div className={classes.attribute}> 
                Personality traits:   {profile.extroversion} <br></br>
                </div>
                </Grid>
                </AccordionDetails>
        </Accordion>
      </Grid>
                : null
              } 
                <Card >
                <ButtonGroup variant='text' size='large' >
                  <Button className={classes.buttonMargin} color= "secondary" variant='outlined' color='primary' size='small' startIcon={<SaveIcon/>} onClick={this.updateProfileButton}>
                      Edit
                  </Button>
                  <Button color='secondary' size='small' variant= "outlined" startIcon={<DeleteIcon />} onClick={this.deleteProfileButtonClicked}>
                    Delete
                  </Button>
                </ButtonGroup>
                </Card>
        </Paper>
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
    color: "default",
  },
  AccountCircle: {
    color: "#8BC2F8",
    fontSize: "8vw",
  },

  accordion: {
    width: '100%',
  },

  accordionDetails: {
    width: '50%',

  },
  profileList: {
    marginBottom: theme.spacing(2),
  },

  updateProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  },
  attribute: {
    color: "#808080",
    marginBottom: theme.spacing(1),
    fontSize: "1vw"
  },
 
  fname: {
    fontSize: "2.3vw",
  },

});

/** PropTypes */
MyProfile.propTypes = {
  classes: PropTypes.object,
  currentUser: PropTypes.object,
}

export default (withStyles(styles)(MyProfile));