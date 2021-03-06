
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Paper, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { AppAPI } from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileDetail from './ProfileDetail';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';

/** Shows all profiles of the app*/
class GroupChatting extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      loadingInProgress: false,
      messages: [],
      person: [],
      profile: [],
      content: null,
      loop: true,
    };
  }

  /** handleClose */
  handleClose = () => {
    this.props.onClose(null);
    this.setState({
      loop: false,
    })
  }

  textFieldValueChange = (event) => {        //chatting textfield
    const value = event.target.value;

    let error = false;
    if (value.trim().length === 0) {
      error = true;
    }

    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  getPerson = () => {
    AppAPI.getAPI().getPersonId().then(person =>        // get own person data
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



  sendMessage = () => {             //send Message
    AppAPI.getAPI().createMessage(0,this.props.group.id_,this.state.person.id_, this.state.content).then(content =>
      this.setState({
        loadingInProgress: false, 
        content:"",// loading indicator 
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

  getMessages = () => {             //Get All Messages
    AppAPI.getAPI().getMessages(0,this.props.group.id_).then(content =>
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

  handleMessages = () => {          //getMessages Interval (Loop)
    (this.props.showChat) ?
    this.getMessages()
    : clearInterval(this.interval)
  }

  componentDidMount() {
    this.getPerson();
    this.interval = setInterval(() => this.handleMessages(), 5000); //getMessages Interval (Loop)
  }


  render() {
    const {loadingInProgress, messages, content} = this.state;
    const { showChat, classes} = this.props;


    return (
                                  //ChatDialog opens and decides if the message is from you or other members. If its from other members. get their profilename
      <div>
    {showChat ?
        <div>
        <Dialog classes={{ paper: classes.paper}} open={showChat} onClose={this.handleClose}>       
         <DialogTitle id='delete-dialog-title'>{this.props.group.groupname}
           <div align="right"><IconButton  onClick={this.handleClose}>
             <CloseIcon />
           </IconButton></div>
         </DialogTitle>
         <DialogContent>{
           messages.map(message => (message.sender == this.state.person.id_ ) ?
           (<div align="right">
           <Paper className={classes.root}>{message.content}</Paper><br></br></div>)
            :
            (<div>
              <ProfileDetail showFirstnameInGroupChat={true} person={message.sender}> </ProfileDetail>
              <Paper className={classes.message}>{message.content}</Paper><br></br></div>)
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

GroupChatting.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  location: PropTypes.object,
  showChat: PropTypes.bool,
  onClose: PropTypes.func,
  group: PropTypes.any,
}

export default withStyles(styles)(GroupChatting
);