import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import CloseIcon from '@material-ui/icons/Close';
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
    AppAPI.getAPI().getPersonId().then((person) => {    //get your personData
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
    AppAPI.getAPI().getAllReceivedRequests(this.state.person.id_).then((requests) => {            //get all received requestList
      this.setState({
        requestList: requests,
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
    AppAPI.getAPI().getAllSentRequests(this.state.person.id_).then((requests) => {  // get all sent requests in a list
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
    AppAPI.getAPI().getAllSingleChats(this.state.person.id_)            // get all chatroomObjects that are accepted with your personid
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

  showSentRequests = () => {             //show sent Requests dialog 
    this.setState({
        showSent: true,
    })
}

closeSentRequests = () => {                //close dialog of sent requests
    this.setState({
        showSent: false,
    })
}

  showReceivedRequests = () => {              //show received reqests dialog
      this.setState({
          showReceived: true,
      })
  }

  closeReceivedRequests = () => {        //close received requests dialog
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

    return (                         //show all singlechats, show received and sent requests button and dialog
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
           {(requestList) ? 
            ( requestList.map(request => <ProfileDetail received={request} request = {request} person = {request.sender}></ProfileDetail>))
            :null}
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
           {sentList ?
             (sentList.map(request => <ProfileDetail sent={request} request = {request} person = {request.receiver}></ProfileDetail>))
             : null}
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