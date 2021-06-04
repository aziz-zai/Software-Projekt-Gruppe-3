import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AppApi from "../../api/AppApi";
import ProfileBO from "../../api/ProfileBO";
import ContextErrorMessage from "./ContextErrorMessage";
import LoadingProgress from "./LoadingProgress";

class ProfileForm extends Component {
  constructor(props) {
    super(props);

    let n = "",
      a = "",
      d = "",
      s = "",
      c = "",
      p = "",
      r = "";
    if (props.profile) {
      n = props.profile.getName();
      a = props.profile.getAge();
      //d = props.adress.getAdress();
      s = props.profile.getSemester();
      c = props.profile.getDegreeCourse();
      p = props.profile.getPreferences();
      r = props.profile.getPersonId();
    }

    // Init the state
    this.state = {
      name: n,
      nameValidationFailed: false,
      nameEdited: false,
      age: a,
      ageValidationFailed: false,
      ageEdited: false,
      adress: c,
      adressValidationFailed: false,
      adressEdited: false,
      semester: s,
      semesterValidationFailed: false,
      semesterEdited: false,
      degreeCourse: c,
      degreeCourseValidationFailed: false,
      degreeCourseEdited: false,
      preference: p,
      preferenceValidationFailed: false,
      preferenceEdited: false,
      personId: r,
      personIdValidationFailed: false,
      personIdEdited: false,
      addingInProgress: false,
      updatingInProgress: false,
      addingError: null,
      updatingError: null,
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  addProfile = () => {
    let newProfile = new ProfileBO();
    newProfile.setName(this.state.name);
    newProfile.setAge(this.state.age);
    newProfile.setAdress(this.state.adress);
    newProfile.setSemester(this.state.semester);
    newProfile.setDegreeCourse(this.state.degreeCourse);
    newProfile.setPreferences(this.state.preferences);
    newProfile.setPersonId(this.state.personId);

    AppApi.getApi()
      .addProfile(newProfile)
      .then((profile) => {
        this.setState(this.baseState);
        this.props.onClose(profile);
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false,
          updatingError: e,
        })
      );

    this.setState({
      updatingInProgress: true,
      updatingError: null,
    });
  };

  updateProfile = () => {
    let updatedProfile = Object.assign(new ProfileBO(), this.props.profile);
    updatedProfile.setName(this.state.name);
    updatedProfile.setAge(this.state.age);
    updatedProfile.setAdress(this.state.adress);
    updatedProfile.setSemester(this.state.semester);
    updatedProfile.setDegreeCourse(this.state.degreeCourse);
    updatedProfile.setPreferences(this.state.preferences);
    updatedProfile.setPersonId(this.state.personId);

    AppApi.getApi()
      .updateProfile(updatedProfile)
      .then((profile) => {
        this.setState({
          updatingInProgress: false,
          updatingError: null,
        });
        this.baseState.name = this.state.name;
        this.baseState.age = this.state.age;
        this.baseState.adress = this.state.adress;
        this.baseState.semester = this.state.semester;
        this.baseState.degreeCourse = this.state.degreeCourse;
        this.baseState.preferences = this.state.preferences;
        this.baseState.personId = this.state.personId;

        this.props.onClose(updatedProfile);
      })
      .catch((e) =>
        this.setState({
          updatingInProgress: false,
          updatingError: e,
        })
      );

    this.setState({
      updatingInProgress: true,
      updatingError: null,
    });
  };

  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
      [event.target.id + "ValidationFailed"]: error,
      [event.target.id + "Edited"]: true,
    });
  };

  handleClose = () => {
    this.setState(this.baseState);
    this.props.onClose(null);
  };

  render() {
    const { classes, profile, show } = this.props;
    const {
      name,
      nameValidationFailed,
      nameEdited,
      age,
      ageValidationFailed,
      ageEdited,
      adress,
      adressValidationFailed,
      adressEdited,
      semester,
      semesterValidationFailed,
      semesterEdited,
      degreeCourse,
      degreeCourseValidationFailed,
      degreeCourseEdited,
      preferences,
      preferencesValidationFailed,
      preferencesEdited,
      personId,
      personIdValidationFailed,
      personIdEdited,
      addingInProgress,
      addingError,
      updatingInProgress,
      updatingError,
    } = this.state;
    let title = "";
    let header = "";

    if (profile) {
      title = "Update a profile";
      header = `Profile ID: ${profile.getID()}`;
    } else {
      title = "Create a new profile";
      header = "Enter profile data";
    }
    return show ? (
      <Dialog open={show} onClose={this.handleClose} maxWidth="xs">
        <DialogTitle id="form-dialog-title">
          {title}
          <IconButton
            className={classes.closeButton}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{header}</DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              autoFocus
              type="text"
              required
              fullWidth
              margin="normal"
              id="name"
              label="Name:"
              value={name}
              onChange={this.textFieldValueChange}
              error={nameValidationFailed}
              helperText={
                nameValidationFailed
                  ? "The name must contain at least one character"
                  : " "
              }
            />
            <TextField
              type="text"
              required
              fullWidth
              margin="normal"
              id="age"
              label="Age:"
              value={age}
              onChange={this.textFieldValueChange}
              error={ageValidationFailed}
              helperText={
                ageValidationFailed
                  ? "The Age must contain at least one character"
                  : " "
              }
            />
            <TextField
              autoFocus
              type="text"
              required
              fullWidth
              margin="normal"
              id="adress"
              label="Adress:"
              value={adress}
              onChange={this.textFieldValueChange}
              error={adressValidationFailed}
              helperText={
                adressValidationFailed
                  ? "The adress must contain at least one character"
                  : " "
              }
            />
            <TextField
              type="text"
              required
              fullWidth
              margin="normal"
              id="semester"
              label="Semester:"
              value={semester}
              onChange={this.textFieldValueChange}
              error={semesterValidationFailed}
              helperText={
                semesterValidationFailed
                  ? "The semester must contain at least one character"
                  : " "
              }
            />
            <TextField
              autoFocus
              type="text"
              required
              fullWidth
              margin="normal"
              id="degreeCourse"
              label="DegreeCourse:"
              value={degreeCourse}
              onChange={this.textFieldValueChange}
              error={degreeCourseValidationFailed}
              helperText={
                degreeCourseValidationFailed
                  ? "The degreeCourse must contain at least one character"
                  : " "
              }
            />
            <TextField
              type="text"
              required
              fullWidth
              margin="normal"
              id="preferences"
              label="Preferences:"
              value={preferences}
              onChange={this.textFieldValueChange}
              error={preferencesValidationFailed}
              helperText={
                preferencesValidationFailed
                  ? "The Preferences must contain at least one character"
                  : " "
              }
            />
            <TextField
              type="text"
              required
              fullWidth
              margin="normal"
              id="personId"
              label="PersonId:"
              value={personId}
              onChange={this.textFieldValueChange}
              error={personIdValidationFailed}
              helperText={
                personIdValidationFailed
                  ? "The PersonId must contain at least one character"
                  : " "
              }
            />
          </form>
          <LoadingProgress show={addingInProgress || updatingInProgress} />
          {profile ? (
            <ContextErrorMessage
              error={updatingError}
              contextErrorMsg={`The profile ${profile.getID()} could not be updated.`}
              onReload={this.updateProfile}
            />
          ) : (
            <ContextErrorMessage
              error={addingError}
              contextErrorMsg={`The profile could not be added.`}
              onReload={this.addProfile}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="secondary">
            Cancel
          </Button>
          {profile ? (
            <Button
              disabled={
                nameValidationFailed ||
                ageValidationFailed ||
                adressValidationFailed ||
                semesterValidationFailed ||
                degreeCourseValidationFailed ||
                preferencesValidationFailed ||
                personIdValidationFailed
              }
              variant="contained"
              onClick={this.updateProfile}
              color="primary"
            >
              Update
            </Button>
          ) : (
            <Button
              disabled={
                nameValidationFailed ||
                !nameEdited ||
                ageValidationFailed ||
                !ageEdited ||
                adressValidationFailed ||
                !adressEdited ||
                semesterValidationFailed ||
                !semesterEdited ||
                degreeCourseValidationFailed ||
                !degreeCourseEdited ||
                preferencesValidationFailed ||
                !preferencesEdited ||
                personIdValidationFailed ||
                !personIdEdited
              }
              variant="contained"
              onClick={this.addProfile}
              color="primary"
            >
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>
    ) : null;
  }
}

/** Component specific styles */
const styles = (theme) => ({
  root: {
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

/** PropTypes */
ProfileForm.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,

  profile: PropTypes.object,

  show: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProfileForm);