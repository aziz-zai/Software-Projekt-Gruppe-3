import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppAPI, ProfileBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import AddIcon from '@material-ui/icons/Add';
class ProfilePopUp extends Component {
  constructor(props) {
    super(props);

    

    // Init the state
    this.state = {
      
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the profile */

    // set loading to true
 

  /** Updates the profile */


  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  /** Renders the component */
  render() {
    const { classes, profile, show } = this.props;
  
    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{profile.firstname} {profile.lastname}<br /><br />
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
                <DialogContentText>
                   Interests: {profile.interests}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                   Type: {profile.type_}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                  Online:  {profile.online}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                  Frequency:  {profile.frequency}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                  Expertise:  {profile.expertise}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                 Extroversion: {profile.extroversion}
                </DialogContentText>
            </DialogContent>
          </DialogTitle>
          <DialogActions>
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small'>
            Chat
          </Button>
          
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
ProfilePopUp.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  profile: PropTypes.any.isRequired,
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

export default withStyles(styles)(ProfilePopUp);