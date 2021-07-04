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

    this.state = {
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  render() {
    const { classes, profile, show } = this.props;
  
    return (                //show profiledata of a person
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
                   Learning type: {profile.type_}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                  Online preference:  {(profile.online) ? "Prefers online" : "Prefers offline"}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                  Learning frequency:  {profile.frequency}/Week
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                  Personal competencies:  {profile.expertise}
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <DialogContentText>
                 Personality trait: {profile.extroversion}
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
  classes: PropTypes.object,
  /** The CustomerBO to be edited */
  profile: PropTypes.any,
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

export default withStyles(styles)(ProfilePopUp);