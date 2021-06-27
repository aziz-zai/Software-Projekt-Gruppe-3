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
        personList: [],
        person: [],
        loadingInProgress: false,
        loadingError: null,
        showPersonList: false,
        memberList: [],
    };
    // save this state for canceling
    this.baseState = this.state;
  }
   

loadPotentialPersons= () => {
    AppAPI.getAPI().getPotentialPersonsForGroup(this.props.group.id_).then(persons =>
    this.setState({
        personList: persons,
        loadingInProgress: false, // loading indicator 
        loadingError: null,
        error: null

      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          personList: [],
          loadingError: false,
          error: e
        })
      );

    this.setState({
        loadingInProgress: true,
        error: null
    });
}
    getMembers = () => {
      AppAPI.getAPI().getMembersOfGroup(this.props.group.id_).then(members =>
        this.setState({
          memberList: members,
          loadingInProgress: false,
          loadingError: null
        },
        )
        ).catch(e =>
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

  showPersonList = () => {
    this.loadPotentialPersons();
    this.setState({
      showPersonList: true
    })
  }

  /** Handles the close / cancel button click event */
  handleClose = () => {
    // Reset the state
    this.setState(this.baseState);
    this.props.onClose(null);
  }

  handleClosePersonList = () => {
    // Reset the state
    this.setState({
      showPersonList: false
    });
  }

  componentDidMount() {
    this.getMembers();
  }
  /** Renders the component */
  render() {
    const { classes, group, show} = this.props;
    const { memberList , showPersonList, loadingInProgress, personList, members} = this.state;
  
    return (
      show ?
        <Dialog onEnter= {this.getMembers} open={show} onClose={this.handleClose} maxWidth='xs'>
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
          <Button className={classes.buttonMargin} startIcon={<AddIcon/>} onClick={this.showPersonList} variant='outlined' color='primary' size='small'>
            Person hinzufügen 
          </Button> 
          {showPersonList ?
              <Dialog open={showPersonList} onClose={this.handleClosePersonList} maxWidth='xs'>
                <DialogTitle id='delete-dialog-title'>Show potential Persons
           <IconButton onClick={this.handleClosePersonList}>
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
             {personList.map(person => <ProfileDetail person = {person.id_}></ProfileDetail>)}
           <LoadingProgress show={loadingInProgress} />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClosePersonList} color='secondary'>
             Cancel
           </Button>
         </DialogActions>
               </Dialog>
          :null
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
GroupPopUp.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  group: PropTypes.any.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default withStyles(styles)(GroupPopUp);
