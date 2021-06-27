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
        show2: true,
        groupinfo: '',
        groupname: '',
        group: []
    };
    // save this state for canceling
    this.baseState = this.state;
  }

 
 
    
  /** Updates the profile */
  createGroup = () => {
    AppAPI.getAPI().createGroup(this.state.groupname, this.state.groupinfo).then(newGroup=>
      this.setState({
        show2: false,
        group: newGroup
      })
      ).catch(e=>
        this.setState({
          group: [],
        }));
        this.setState({
          loadingInProgress: true,
          error: null
        })
  }
  textFieldValueChange = (event) => {
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
  }
  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }


  componentDidMount() {
   
  }
  /** Renders the component */
  render() {
    const { classes, group, show} = this.props;
    const { memberList, groupname, groupinfo, show2} = this.state;
  
    return (
      show2 ?
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>Create A New Group <br /><br />
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
            <form className={classes.root} noValidate autoComplete='off'>
            <TextField autoFocus type='text' required fullWidth margin='normal' id='groupname' label='Groupname:' value={groupname} 
                onChange={this.textFieldValueChange}  />
            <TextField autoFocus type='text' required fullWidth margin='normal' id='groupinfo' label='Groupinfo:' value={groupinfo} 
                onChange={this.textFieldValueChange}  />
                </form>
            </DialogContent>
          </DialogTitle>
          <DialogActions>
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small'>
            Partner hinzufügen
          </Button>
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small' onClick={this.createGroup}>
            Create Group
          </Button>
          
        </DialogActions>
        </Dialog>
        : null
        :null
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
CreateGroupForm.propTypes = {
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

export default withStyles(styles)(CreateGroupForm);