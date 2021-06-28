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
class SingleChats extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
        loadingInProgress: false,
    };
  }


  handleClose = () => {
    this.props.onClose(null);
  }
  componentDidMount(){

  }
  /** Renders the component */
  render() {
    const {loadingInProgress} = this.state;
    const { showChat} = this.props;

    return (
      <div>

    {showChat ?
        <div>
        <Dialog open={showChat} onClose={this.handleClose}>
         <DialogTitle id='delete-dialog-title'>Profilname
           <IconButton onClick={this.handleClose}>
             <CloseIcon />
           </IconButton>
         </DialogTitle>
         <DialogContent>
            Test
           <LoadingProgress show={loadingInProgress} />
         </DialogContent>
         <DialogActions>
           <Button onClick={this.handleClose} size='small' color='secondary'>
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


SingleChats.propTypes = {

  showChat: PropTypes.bool,
  onClose: PropTypes.func,
}

export default SingleChats;