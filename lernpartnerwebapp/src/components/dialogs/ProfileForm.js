import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle,
MenuItem, Select, InputLabel, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
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

  handleOnlineChange = (event) => {
    this.setState({online: event.target.value });
  }

  handleFrequencyChange = (event) => {
    this.setState({frequency: event.target.value });
  }

  handleTypeChange = (event) => {
    this.setState({type: event.target.value });
  }

  handleExpertiseChange = (event) => {
    this.setState({expertise: event.target.value });
  }

  handleExtroversionChange = (event) => {
    this.setState({extroversion: event.target.value });
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
      header = `Profile ID: ${profile.person}`;
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
              <TextField autoFocus type='text' required fullWidth margin='normal' id='firstName' label='Firstname:' value={firstName} 
                onChange={this.textFieldValueChange} error={firstNameValidationFailed} 
                helperText={firstNameValidationFailed ? 'The firstname must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='lastName' label='Lastname:' value={lastName}
                onChange={this.textFieldValueChange} error={lastNameValidationFailed}
                helperText={lastNameValidationFailed ? 'The lastname must contain at least one character' : ' '} />

              <TextField type='text' required fullWidth margin='normal' id='interests' label='Personal interests:' value={interests}
                onChange={this.textFieldValueChange} error={interestsValidationFailed}
                helperText={interestsValidationFailed ? 'The interests must contain at least one character' : ' '} />
              
              <InputLabel className={classes.label} id='type'>Choose your learning type</InputLabel>
              <Select labelId='type-label' id='type' value={type} onChange={this.handleTypeChange}>
                <MenuItem value='visually'>visually</MenuItem>
                <MenuItem value='auditory'>auditory</MenuItem>
                <MenuItem value='reading/writing'>reading/writing</MenuItem>
              </Select>
              <br /> 
              <br />
              <br /> 
              
              <InputLabel className={classes.label} id='online'>Do you prefer online or offline learning?</InputLabel>
              <Select labelId='online-label' id='online' value={online} onChange={this.handleOnlineChange}>
                <MenuItem value='true'>online</MenuItem>
                <MenuItem value='false'>offline</MenuItem>
              </Select>
              <br /> 
              <br /> 
              <br />

              <InputLabel className={classes.label} id='frequency'>How many times do you want to study per week?</InputLabel>
              <Select labelId='frequency-label' id='frequency' value={frequency} onChange={this.handleFrequencyChange}>
                <MenuItem value='1'>1</MenuItem>
                <MenuItem value='2'>2</MenuItem>
                <MenuItem value='3'>3</MenuItem>
                <MenuItem value='4'>4</MenuItem>
                <MenuItem value='5'>5</MenuItem>
              </Select>
              <br /> 
              <br /> 
              <br />
            
              <InputLabel className={classes.label} id='expertise'>Choose your competency field</InputLabel>
              <Select labelId='expertise-label' id='expertise' value={expertise} onChange={this.handleExpertiseChange}>
                <MenuItem value='Python'>Python</MenuItem>
                <MenuItem value='Webtechnology'>Webtechnology</MenuItem>
                <MenuItem value='Chinese'>Chinese</MenuItem>
                <MenuItem value='Data Science'>Data Science</MenuItem>
                <MenuItem value='Maths'>Maths</MenuItem>
              </Select>
              <br />
              <br />
              <br />
              <InputLabel className={classes.label} id='extroversion'>Choose your personality trait</InputLabel>
              <Select labelId='extroversion-label' id='extroversion' value={extroversion} onChange={this.handleExtroversionChange}>
                <MenuItem value='Conscientiousness'>Conscientiousness</MenuItem>
                <MenuItem value='Extraversion'>Extraversion</MenuItem>
                <MenuItem value='Agreeableness'>Agreeableness</MenuItem>
                <MenuItem value='Openness'>Openness</MenuItem>
              </Select>
              <br /> 
              <br />
              <br />
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
              profile ?
                <Button disabled={firstNameValidationFailed || lastNameValidationFailed  || personValidationFailed || interestsValidationFailed || 
                typeValidationFailed || onlineValidationFailed || frequencyValidationFailed || expertiseValidationFailed || extroversionValidationFailed} 
                variant='contained' onClick={this.updateProfile} color='primary'>
                  Update
                </Button>
                :null
              }
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

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
  classes: PropTypes.object,
  /** The CustomerBO to be edited */
  profile: PropTypes.object,
  /** If true, the form is rendered */
  show: PropTypes.bool,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the edited or created CustomerBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(CustomerBO customer);
   */
  onClose: PropTypes.func,
}

export default withStyles(styles)(ProfileForm);