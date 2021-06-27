import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppAPI} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import AddIcon from '@material-ui/icons/Add';
import ProfileDetail from '../ProfileDetail'
class GroupPopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
        error: null,
        person: [],
        memberList: [],
    };
    // save this state for canceling
    this.baseState = this.state;
  }
   
    getMembers = () => {
      AppAPI.getAPI().getMembersOfGroup(this.props.group.id_).then(members =>
        this.setState({
          memberList: members,
          loadingInProgress: false,
          loadingError: null
        })).catch(e =>
          this.setState({ // Reset state with error from catch 
            memberList: [],
            loadingInProgress: false,
            loadingError: e
          })
        );
  
      // set loading to true
      this.setState({
        loadingInProgress: true,
        loadingError: null
      });
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
    const { memberList , members} = this.state;
  
    return (
      show ?
        <Dialog open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{group.info} <br /><br />
            <IconButton className={classes.closeButton} onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
            <DialogContent>
                <DialogContentText>
                Groupname: {group.groupname}
                </DialogContentText>
            </DialogContent>
                <DialogContentText>
                Groupinfo: {group.info}
                </DialogContentText>
            <DialogContent>
                <DialogContentText>
                Members: 
                {
            memberList.map(member => <ProfileDetail person = {member.person}></ProfileDetail>)
          }
                </DialogContentText>
            </DialogContent>
          </DialogTitle>
          <DialogActions>
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small'>
            Person hinzufügen
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
GroupPopUp.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The CustomerBO to be edited */
  group: PropTypes.any.isRequired,
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

export default withStyles(styles)(GroupPopUp);