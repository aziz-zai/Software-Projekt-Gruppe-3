import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, ListItem, ButtonGroup, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileBO from '../api/ProfileBO';
import ProfileForm from './dialogs/ProfileForm';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import PersonBO from '../api/PersonBO'
import ProfileDetail from './ProfileDetail'

/**
 * Shows the header with the main navigation Tabs within a Paper.
 * 
 * @see See Material-UIs [Tabs](https://material-ui.com/components/tabs/)
 * @see See Material-UIs [Paper](https://material-ui.com/components/paper/)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class PartnerChats extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        singleChatList: [],
        person: [],
        requestList: [],
        sentList: [],
        showReceived: false,
        showSent: false,
        loadingInProgress: false,
    };
  }

  getPerson = () => {
    AppAPI.getAPI().getPerson().then((person) => {
      this.setState({
        person: person[0],
        loadingInProgress: false,
      });
      this.getSingleChats();
      this.getReceivedRequests();
      this.getSentRequests();
    }).catch(e =>
      this.setState({
        person:[],
        loadingInProgress: false,
      })
    );
    // set loading to true
    this.setState({
        loadingInProgress: true,
    });
  }
  getReceivedRequests = () => {
    AppAPI.getAPI().getAllReceivedRequests().then((requests) => {
      this.setState({
        requestList: requests ,
        loadingInProgress: false,
      });
    }).catch(e =>
      this.setState({
        requestList:[],
        loadingInProgress: false,
      })
    );
    // set loading to true
    this.setState({
        loadingInProgress: true,
    });
  }

  getSentRequests = () => {
    AppAPI.getAPI().getAllSentRequests().then((requests) => {
      this.setState({
        sentList: requests ,
        loadingInProgress: false,
      });
    }).catch(e =>
      this.setState({
        requestList:[],
        loadingInProgress: false,
      })
    );
    // set loading to true
    this.setState({
        loadingInProgress: true,
    });
  }



  getSingleChats = () => {
    AppAPI.getAPI().getAllSingleChats()
    .then((chats) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        singleChatList: chats,
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })}
      )
      .catch((e) =>
        this.setState({
          singleChatList: [],
          loadingInProgress: false,
          loadingProfileError: e,
        })
      );
    this.setState({
      singleChatList: [],
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  showSentRequests = () => {
    this.setState({
        showSent: true,
    })
}

closeSentRequests = () => {
    this.setState({
        showSent: false,
    })
}

  showReceivedRequests = () => {
      this.setState({
          showReceived: true,
      })
  }

  closeReceivedRequests = () => {
      this.setState({
          showReceived: false,
      })
  }
  componentDidMount(){
    this.getPerson();
  }
  /** Renders the component */
  render() {
    const { singleChatList, person, showReceived, showSent, loadingInProgress, requestList, sentList} = this.state;

    return (
      <div>
        <div>
          <br></br>
        <Button variant='contained' color='secondary' size='small' onClick={this.showReceivedRequests}>
                    Show Your Received Requests
        </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant='contained' color='secondary' size='small' onClick={this.showSentRequests}>
                    Show Your Sent Requests
        </Button>
        <br></br>
        </div>
      {singleChatList ?

            singleChatList.map((chat) => (chat.sender == person.id_) ?
            (<ProfileDetail chatID={chat.id_} showChat={true} person= {chat.receiver}></ProfileDetail>) :
            (<ProfileDetail chatID={chat.id_} showChat={true} person= {chat.sender}></ProfileDetail>)
              )

        :null}

        {showReceived ?
        <div>
        <Dialog open={showReceived} onClose={this.closeReceivedRequests}>
         <DialogTitle id='delete-dialog-title'>Received Requests
           <IconButton onClick={this.closeReceivedRequests}>
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
             {requestList.map(request => <ProfileDetail received={request} request = {request} person = {request.sender}></ProfileDetail>)}
           <LoadingProgress show={loadingInProgress} />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.closeReceivedRequests} size='small' color='secondary'>
             Cancel
           </Button>
         </DialogActions>
       </Dialog>
        </div>
        : null}

    {showSent ?
        <div>
        <Dialog open={showSent} onClose={this.closeSentRequests}>
         <DialogTitle id='delete-dialog-title'>Sent Requests
           <IconButton onClick={this.closeSentRequests}>
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
             {sentList.map(request => <ProfileDetail sent={request} request = {request} person = {request.receiver}></ProfileDetail>)}
           <LoadingProgress show={loadingInProgress} />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.closeSentRequests} size='small' color='secondary'>
             Cancel
           </Button>
         </DialogActions>
       </Dialog>
        </div>
        : null}


     </div>
    )
  }
}


PartnerChats.propTypes = {

  user: PropTypes.object,
}

export default PartnerChats;