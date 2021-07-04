import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AppAPI} from '../../api';
import ContextErrorMessage from './ContextErrorMessage';
import LoadingProgress from './LoadingProgress';
import AddIcon from '@material-ui/icons/Add';
import ProfileDetail from '../ProfileDetail'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
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
        requestSent: false,
        showReceived: false,
        groupRequestList: [],
        showRequestListButton: false,
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



sendMembershipRequest = () => {
  AppAPI.getAPI().sendMembershipRequest(this.props.group.id_).then(request =>
    this.setState({
      loadingInProgress: false,
      loadingError: null,
      requestSent: true,
    },
    )
    ).catch(e =>
      this.setState({ // Reset state with error from catch 
        loadingInProgress: false,
        loadingError: e
      })
    );
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

  showGroupRequests = () => {
    AppAPI.getAPI().getAllMembershipGroupRequests(this.props.group.id_).then(requests =>
      this.setState({
        groupRequestList: requests,
        loadingInProgress: false,
        showRequestListButton: true,
        
      })).catch(e =>
        this.setState({  
          loadingInProgress: false,
          error: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  showReceived = () => {
    this.setState({
      showReceived: true,
    })
    this.showGroupRequests();
  }

  handleCloseGroupList = () => {
    this.setState({
      showReceived: false,
    })
  }


  componentDidMount() {
    this.getMembers();
    this.showGroupRequests();
  }
  /** Renders the component */
  render() {
    const { classes, group, show, showRequestGroup} = this.props;
    const { memberList , showPersonList, loadingInProgress, personList, requestSent, showReceived, groupRequestList, showRequestListButton} = this.state;

    return (
      show ?
        <Dialog onEnter= {this.getMembers} open={show} onClose={this.handleClose} maxWidth='xs'>
          <DialogTitle id='form-dialog-title'>{group.groupname} <br /><br />
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
            memberList.map(member => <ProfileDetail  person = {member.person}></ProfileDetail>)
          }
                </DialogContentText>
            </DialogContent>
          </DialogTitle>
          <DialogActions>
            {showRequestGroup ?
            requestSent ?
           <div>
            <Button color='primary' startIcon={<CheckCircleIcon></CheckCircleIcon>}>
            </Button>
            </div>
            : <div>
            <Button className={classes.buttonMargin} startIcon={<AddIcon/>} onClick={this.sendMembershipRequest} variant='outlined' color='primary' size='small'>
            Request A Membership
            </Button>
            </div>
            :
            <div>
          <Button className={classes.buttonMargin} onClick={this.showPersonList} startIcon={<AddIcon/>} variant='outlined' color='primary' size='small'>
            Person hinzufügen
          </Button>
          </div>
         }
          {showPersonList ?
              <Dialog open={showPersonList} onClose={this.handleClosePersonList} maxWidth='xs'>
                <DialogTitle id='delete-dialog-title'>Show potential Persons
           <IconButton onClick={this.handleClosePersonList}>
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
             {personList.map(person => <ProfileDetail  showGroupDetail={this.props.group.id_} person = {person.id_}></ProfileDetail>)}
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
        {console.log('GL',groupRequestList)}
        {groupRequestList  ?
                <Button variant='outlined' color='primary' onClick={this.showReceived}>
                Show GroupRequests
            </Button>
            : null}
        {showReceived ?
          <Dialog open={showReceived} onClose={this.handleCloseGroupList} maxWidth='xs'>
          <DialogTitle id='delete-dialog-title'>Show Incoming Group-Requests
     <IconButton onClick={this.handleCloseGroupList}>
       <CloseIcon />
     </IconButton>
   </DialogTitle>
   <DialogContent>
       {groupRequestList.map(membership => <ProfileDetail groupRequest={membership} person={membership.person}></ProfileDetail>)}
     <LoadingProgress show={loadingInProgress} />
   </DialogContent>
   <DialogActions>
     <Button onClick={this.handleCloseGroupList} color='secondary'>
       Cancel
     </Button>
   </DialogActions>
         </Dialog>
         : null
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
  classes: PropTypes.object,
  group: PropTypes.any,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  showRequestGroup: PropTypes.any,
}

export default withStyles(styles)(GroupPopUp);
