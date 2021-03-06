
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Paper,Box, TextField, InputAdornment, IconButton, Grid, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileDetail from './ProfileDetail';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

/** Shows all profiles of the app*/
class SingleChats extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      loadingInProgress: false,
      messages: [],
      person: [],
      profile: [],
      content: null,
      loop:true,

    };
  }

  /** handleClose */
  handleClose = () => {              // close chat
    this.props.onClose(null);
    this.setState({
      loop: false,
    })
  }

  textFieldValueChange = (event) => {               // tectfield to wirte your textmessage
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  getPerson = () => {              //get your own persondata
    AppAPI.getAPI().getPersonId().then(person =>
      this.setState({
        person: person[0],
        loadingInProgress: false, // loading indicator 

      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  getProfile = () => {             //get the profile of the person
    AppAPI.getAPI().getProfileForPerson(this.props.person)
    .then((profileBO) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profile: profileBO[0],
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })}
      )
      .catch((e) =>
        this.setState({
          profile: [],
          loadingInProgress: false,
          loadingProfileError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  sendMessage = () => {       //send a message
    AppAPI.getAPI().createMessage(1,this.props.chatroom,this.state.person.id_, this.state.content).then(content =>
      this.setState({
        loadingInProgress: false, // loading indicator 
        content: ""

      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  getMessages = () => {        //get all messages of the chatroom
    AppAPI.getAPI().getMessages(1,this.props.chatroom).then(content =>
      this.setState({
        messages: content,
        loadingInProgress: false,
        loop:true // loading indicator 

      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
        })
      );
  }

handleMessages = () => {     //get messages loop
  (this.props.chatroom) ?
  this.getMessages()
  : clearInterval(this.interval)
}


  componentDidMount() {
    this.getPerson();
    this.getProfile();
    this.interval = setInterval(() => this.handleMessages(), 2000); //get messages loop
  }


  render() {
    const {loadingInProgress, messages, content} = this.state;
    const { showSingleChat, classes} = this.props;


    return (                  // show all messages of the chatroom, show name of other person, show send button

      <div>

    {showSingleChat ?
        <div>
          {console.log('sender',this.state.person, messages, content, this.state.profile, this.props.showChat)}
        <Dialog classes={{ paper: classes.paper}} open={showSingleChat} onClose={this.handleClose}>
         <DialogTitle id='delete-dialog-title'>{this.state.profile.firstname}
           <div align="right"><IconButton  onClick={this.handleClose}>
             <CloseIcon />
           </IconButton></div>
         </DialogTitle>
         <DialogContent>{
           messages.map(message => (message.sender == this.state.person.id_ ) ?
           (<div align="right"><Paper className={classes.root}>{message.content}</Paper><br></br></div>)
            :
            (<div><Paper className={classes.message}>{message.content}</Paper><br></br></div>)
            ) }
           <LoadingProgress show={loadingInProgress} />
         </DialogContent>
         <DialogActions>
          <TextField autoFocus type='text' required fullWidth margin='normal' id='content' value={content} 
                onChange={this.textFieldValueChange} />
           <Button type="submit" variant='contained'  size='small' onClick={this.sendMessage} startIcon={<SendIcon></SendIcon>} color='secondary'>
             Send
           </Button>
         </DialogActions>
       </Dialog>
        </div>
        : null}


     </div>

    );
  }
}

const styles = theme => ({
  root: {
    width: '45%',
    background: "#99cfff",
  },
  message: {
    width: '45%',
    background: "#e0ebeb",
  },
  paper: {
    minWidth: "500px",
    height: '500px'
  }
});

SingleChats.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  location: PropTypes.object,
  showSingleChat: PropTypes.bool,
  onClose: PropTypes.func,
  chatroom: PropTypes.any,
  person: PropTypes.any,
}

export default withStyles(styles)(SingleChats);