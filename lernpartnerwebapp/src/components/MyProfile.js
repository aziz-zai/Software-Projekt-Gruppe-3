import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { Button} from '@material-ui/core';
import { AppAPI} from '../api';
import ProfileListEntry from "./ProfileListEntry";
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import ProfileBO from '../api/ProfileBO'
import PersonBO from '../api/PersonBO'

class MyProfile extends Component {

  constructor(props) {
    super(props);


    // Init the state
    this.state = {
      error: null,
      showProfileForm: false,
      person: []
    };
  }

  getPersonByGoogleUserID = () => {
    AppAPI.getAPI().getPerson(this.props.currentUser.uid)
    .then((personBO) =>{
      this.setState({
        person: personBO
      })},
      )
      .catch((e) =>
        this.setState({
          person: null
        
        })
      )
  }

  

  componentDidMount() {
    this.getPersonByGoogleUserID();
  }

  

  render() {const { classes, currentUser} = this.props;
    return (
      <div className={classes.root}>
        <ProfileListEntry show={false} person={this.state.person}></ProfileListEntry>
        {console.log('Teswwwt'+ this.state.person.id_)}
      </div>
    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
  },
  profileList: {
    marginBottom: theme.spacing(2),
  },
  updateProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default (withStyles(styles)(MyProfile));