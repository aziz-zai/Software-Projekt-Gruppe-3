import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppAPI, ProfileBO } from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import AddIcon from '@material-ui/icons/Add';
import ProfileDetail from '../ProfileDetail'
class CreateGroupForm extends Component {
  constructor(props) {
    super(props);

    

    // Init the state
    this.state = {
        error: null,
        groupinfo: '',
        groupname: '',
        group: []
    };
    // save this state for canceling
    this.baseState = this.state;
  }

  /** Adds the profile */

    // set loading to true
 
    
  /** Updates the profile */
  createGroup = () => {
    AppAPI.getAPI().createGroup(this.props.person.id_).then(newGroup=>
      this.setState({
        group: newGroup
      })).catch(e=>
        this.setState({
          group: [],
        }));
        this.setState({
          loadingInProgress: true,
          error: null
        })
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }
  componentDidMount() {
    this.getMembers();
  }
  /** Renders the component */
  render() {
    const { classes, group, show} = this.props;
    const { memberList } = this.state;
  
    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>Create A New Group <br /><br />
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
            <TextField autoFocus type='text' required fullWidth margin='normal' id='Groupname' label='Groupname:' value={groupname} 
                onChange={this.textFieldValueChange}  />
            <TextField autoFocus type='text' required fullWidth margin='normal' id='Groupinfo' label='Groupname:' value={groupinfo} 
                onChange={this.textFieldValueChange}  />
            </DialogContent>
          </DialogTitle>
          <DialogActions>
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small'>
            Partner hinzufügen
          </Button>
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small'>
            Create Group
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
CreateGroupFor.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  person: PropTypes.any.isRequired,
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

export default withStyles(styles)(CreateGroupFor);