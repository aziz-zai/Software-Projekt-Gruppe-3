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

/**
 * Shows all profiles of the app.
 * 
 */
class AllProfileList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
       person: [],
       groups: [],
       memberships: [],
       group: [],
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
    },
      )
      .catch((e) =>
        this.setState({
          person: []
        
        })
      )
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

  createGroup = () => {
    AppAPI.getAPI().createGroup(1).then(newGroup=>
      this.setState({
        group: newGroup
      })).catch(e=>
        this.setState({
          group: [],
        }));
        this.setState({
          loadingInProgress: true,
          error: null
        })
  }

  render() {
    const { classes } = this.props;
    const {memberships } = this.state;

    return (

      <div className={classes.root}>
        <TabPanel value={1} ></TabPanel>
        {console.log('person', this.state.person.id_)}
        {
            this.state.groups.map(group => <GroupDetail memberships={memberships} groupID={group.id_}/> )
          }
        <Button variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.createGroup}>
            Neue Gruppe
        </Button>
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
AllProfileList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default withStyles(styles)(AllProfileList);