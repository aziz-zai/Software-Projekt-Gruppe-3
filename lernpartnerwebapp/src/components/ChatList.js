import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { AppAPI} from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileDetail from './ProfileDetail';
import Header from '../components/Layouts/Header';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import ProfileBO from '../api/ProfileBO'
import PersonBO from '../api/ProfileBO'
import GroupDetail from './GroupDetail'
import MembershipBO from '../api/MembershipBO'
import TabPanel from './TabPanel'
import RequestBO from '../api/RequestBO'

/**
 * Shows all profiles of the app.
 * 
 */
 class ChatList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
       person: [],
       groups: [],
       memberships: [],
       requests: []
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getPersonByGoogleUserID();
  }

 

  getPersonByGoogleUserID = () => {
    AppAPI.getAPI().getPerson(this.props.currentUser.uid)
    .then((personBO) =>{
     
      this.setState({
        person: personBO
      })
      this.loadGroups()
      this.getRequests()
    },
      )
      .catch((e) =>
        this.setState({
          person: []
        
        })
      )
  }
  getRequests= () => {
    AppAPI.getAPI().getRequestsForPerson(3).then(newRequest =>
      this.setState({
        requests: newRequest,
        
        
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          requests: [],
        })
      );
 
    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }
  loadGroups = () => {
    AppAPI.getAPI().getGroups(this.state.person.id_).then(groups =>
      this.setState({
        groups: groups,
        memberships: groups
        
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          groups: []
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  sendRequestButton = (item) => {
    this.setState({
      person: item,
      sendRequestButton: true
    })
  }


  render() {
    const { classes } = this.props;
    const {memberships } = this.state;

    return (

      <div className={classes.root}>
        <TabPanel value={1} ></TabPanel>
        {console.log('Chatlist', memberships)}
        {
            this.state.groups.map(group => <GroupDetail memberships={memberships} groupID={group.id_}/> )
          }
          <div>
          {
            console.log('sender', this.state.requests)
          }
          </div>
      </div>

    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
ChatList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default withStyles(styles)(ChatList);