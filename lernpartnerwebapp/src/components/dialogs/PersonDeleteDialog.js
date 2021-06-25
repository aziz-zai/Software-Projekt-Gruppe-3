import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppAPI } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';

class PersonDeleteDialog extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      deletingInProgress: false,
      deletingError: null
    };
  }

  /** Delete the person */
  deletePerson = () => {
    AppAPI.getAPI().deletePerson().then(() => {
      this.setState({
        deletingInProgress: false,              // disable loading indicator  
        deletingError: null                     // no error message
      });
      this.props.onClose(this.props.person);  // call the parent with the deleted person
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
  /** Handles the close / cancel button click event */
  handleClose = () => {
    // console.log(event);
    this.props.onClose(null);
  }

  render() {
    const { classes, person, show } = this.props;
    const { deletingInProgress, deletingError } = this.state;

    return (
      show ?
        <Dialog open={show} onClose={this.handleClose}>
          <DialogTitle id='delete-dialog-title'>Delete person
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Really delete person '{person.getFirstName()} {person.getLastName()}' (ID: {person.getID()})?
            </DialogContentText>
            <LoadingProgress show={deletingInProgress} />
            <ContextErrorMessage error={deletingError} contextErrorMsg={`The person '${person.getFirstName()} ${person.getLastName()}' (ID: ${person.getID()}) could not be deleted.`}
              onReload={this.deletePerson} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button variant='contained' onClick={this.deletePerson} color='primary'>
              Delete
            </Button> 
          </DialogActions>
        </Dialog>
        : null
    );
  }
}

const styles = theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/** PropTypes */
PersonDeleteDialog.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The PersonBO to be deleted */
  person: PropTypes.object.isRequired,
  /** If true, the dialog is rendered */
  show: PropTypes.bool.isRequired,
  /**  
   * Handler function which is called, when the dialog is closed.
   * Sends the deleted PersonBO as parameter or null, if cancel was pressed.
   *  
   * Signature: onClose(PersonBO person);
   */
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(PersonDeleteDialog);
