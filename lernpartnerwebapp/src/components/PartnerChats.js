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
    };
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
          singleChatList: 'test',
          loadingInProgress: false,
          loadingProfileError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  componentDidMount(){
    this.getSingleChats()
  }
  /** Renders the component */
  render() {
    const { singleChatList } = this.state;

    return (
      <Paper variant='outlined' >
        {
            singleChatList.map(chat =>
                console.log('singlechat', chat))
        }
      </Paper>
    )
  }
}


PartnerChats.propTypes = {

  user: PropTypes.object,
}

export default PartnerChats;