import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppAPI, ProfileBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
class ProfileForm extends Component {
  constructor(props) {
    super(props);

    let fn = '', ln = '', pe ='', i ='', ty ='', 
    on ='', fq ='', exp ='', ext ='';
    if (props.profile) {
      fn = props.profile.getFirstName();
      ln = props.profile.getLastName();
      i  = props.profile.getInterests();
      ty = props.profile.getType();
      on = props.profile.getOnline();
      fq = props.profile.getFrequency();
      exp= props.profile.getExpertise();
      ext= props.profile.getExtroversion();
    }

    // Init the state
    this.state = {
      firstName: fn,
      firstNameValidationFailed: false,
      firstNameEdited: false,
      lastName: ln,
      lastNameValidationFailed: false,
      lastNameEdited: false,
      person: pe,
      personValidationFailed: false,
      personEdited: false,
      interests: i,
      interestsValidationFailed: false,
      interestsEdited: false,
      type: ty,
      typeValidationFailed: false,
      typeEdited: false,
      online: on,
      onlineValidationFailed: false,
      onlineEdited: false,
      frequency: fq,
      frequencyValidationFailed: false,
      frequencyEdited: false,
      expertise: exp,
      expertiseValidationFailed: false,
      expertiseEdited: false,
      extroversion: ext,
      extroversionValidationFailed: false,
      extroversionEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the profile */

    // set loading to true
 

  /** Updates the profile */
  updateProfile = () => {
    // clone the original person, in case the backend call fails
    let updatedProfile = Object.assign(new ProfileBO(), this.props.profile);
    // set the new attributes from our dialog
    updatedProfile.setID(this.props.profile.getID());
    updatedProfile.setFirstName(this.state.firstName);
    updatedProfile.setLastName(this.state.lastName);
    updatedProfile.setPersonID(this.props.profile.getPersonID());
    updatedProfile.setInterests(this.state.interests);
    updatedProfile.setType(this.state.type);
    updatedProfile.setOnline(this.state.online);
    updatedProfile.setFrequency(this.state.frequency);
    updatedProfile.setExpertise(this.state.expertise);
    updatedProfile.setExtroversion(this.state.extroversion);

    AppAPI.getAPI().updateProfile(updatedProfile).then(profile => {
      this.setState({
        updatingInProgress: false,              // disable loading indicator  
        updatingError: null                     // no error message
      });
      // keep the new state as base state
      this.baseState.firstName = this.state.firstName;
      this.baseState.lastName = this.state.lastName;
      this.baseState.person = this.props.profile.getPersonID();
      this.baseState.interests = this.state.interests;
      this.baseState.type = this.state.type;
      this.baseState.online = this.state.online;
      this.baseState.frequency = this.state.frequency;
      this.baseState.expertise = this.state.expertise;
      this.baseState.extroversion = this.state.extroversion;

      this.props.onClose(updatedProfile);      // call the parent with the new customer
    }).catch(e =>
      this.setState({
        updatingInProgress: false,              // disable loading indicator 
        updatingError: e                        // show error message
      })
    );

    // set loading to true
    this.setState({
      updatingInProgress: true,                 // show loading indicator
      updatingError: null                       // disable error message
    });
  }

  /** Handles value changes of the forms textfields and validates them */
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + 'ValidationFailed']: error,
      [event.target.id + 'Edited']: true
    });
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, profile, show } = this.props;
    const { firstName, firstNameValidationFailed, firstNameEdited, lastName, lastNameValidationFailed, lastNameEdited, 
      person, personEdited, personValidationFailed, interests, interestsEdited, interestsValidationFailed,
      type, typeEdited, typeValidationFailed, online, onlineEdited, onlineValidationFailed, frequency, frequencyEdited,
      frequencyValidationFailed, expertise, expertiseEdited, expertiseValidationFailed, extroversion, extroversionEdited, 
      extroversionValidationFailed, addingInProgress, addingError, updatingInProgress, updatingError } = this.state;

    let title = '';
    let header = '';

    if (profile) {
      // profile defindet, so ist an edit dialog
      title = 'Update a profile';
      header = `Profile ID: ${profile.getPersonID()}`;
    } else {
      title = 'Create a new profile';
      header = 'Enter profile data';
    }

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{title}
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {header}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete='off'>
              <TextField autoFocus type='text' required fullWidth margin='normal' id='firstName' label='First name:' value={firstName} 
                onChange={this.textFieldValueChange} error={firstNameValidationFailed} 
                helperText={firstNameValidationFailed ? 'The first name must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='lastName' label='Last name:' value={lastName}
                onChange={this.textFieldValueChange} error={lastNameValidationFailed}
                helperText={lastNameValidationFailed ? 'The last name must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='person' label='Person ID:' value={person}
                onChange={this.textFieldValueChange} error={personValidationFailed}
                helperText={personValidationFailed ? 'The Person ID must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='interests' label='Interest:' value={interests}
                onChange={this.textFieldValueChange} error={interestsValidationFailed}
                helperText={interestsValidationFailed ? 'The interests must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='type' label='Type:' value={type}
                onChange={this.textFieldValueChange} error={typeValidationFailed}
                helperText={typeValidationFailed ? 'The Type must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='online' label='Online:' value={online}
                onChange={this.textFieldValueChange} error={onlineValidationFailed}
                helperText={onlineValidationFailed ? 'Online must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='frequency' label='Frequency:' value={frequency}
                onChange={this.textFieldValueChange} error={frequencyValidationFailed}
                helperText={frequencyValidationFailed ? 'The Frequency must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='expertise' label='Expertise:' value={expertise}
                onChange={this.textFieldValueChange} error={expertiseValidationFailed}
                helperText={expertiseValidationFailed ? 'The Expertise must contain at least one character' : ' '} />
              
              <TextField type='text' required fullWidth margin='normal' id='extroversion' label='Extroversion:' value={extroversion}
                onChange={this.textFieldValueChange} error={extroversionValidationFailed}
                helperText={extroversionValidationFailed ? 'The Extroversion must contain at least one character' : ' '} />
            </form>
            <LoadingProgress show={addingInProgress || updatingInProgress} />
            {
              // Show error message in dependency of customer prop
              profile ?
                <ContextErrorMessage error={updatingError} contextErrorMsg={`The profile ${profile.getID()} could not be updated.`} onReload={this.updateProfile} />
                :
                <ContextErrorMessage error={addingError} contextErrorMsg={`The profile could not be added.`} onReload={this.addProfile} />
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            {
              // If a customer is given, show an update button, else an add button
              profile ?
                <Button disabled={firstNameValidationFailed || lastNameValidationFailed  || personValidationFailed || interestsValidationFailed || 
                typeValidationFailed || onlineValidationFailed || frequencyValidationFailed || expertiseValidationFailed || extroversionValidationFailed} 
                variant='contained' onClick={this.updateProfile} color='primary'>
                  Update
              </Button>
                : <Button disabled={firstNameValidationFailed || !firstNameEdited || lastNameValidationFailed || !lastNameEdited ||
                personValidationFailed || !personEdited || interestsValidationFailed || !interestsEdited || typeValidationFailed || !typeEdited ||
                onlineValidationFailed || !onlineEdited || frequencyValidationFailed || !frequencyEdited || expertiseValidationFailed || !expertiseEdited ||
                extroversionValidationFailed || !extroversionEdited} variant='contained' onClick={this.addProfile} color='primary'>
                  Add
             </Button>
            }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
ProfileForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  profile: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(ProfileForm);