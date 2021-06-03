import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileListEntry from './ProfileListEntry';

/**
 * Renders a list of AccountListEntry objects.
 * 
 * @see See [ProfileListEntry](#profilelistentry)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProfileList extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      profiles: [],
      loadingInProgress: false,
      loadingProfileError: null,
      addingProfileError: null,
    };
  }

  /** Fetches ProfileBOs for the current person */
  getSpecificProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.person.getID()).then(profileBOs =>
      this.setState({  // Set new state when ProfileBOs have been fetched
        profiles: profileBOs,
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          profiles: [],
          loadingInProgress: false,
          loadingProfileError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProfiles();
  }

  /** Lifecycle method, which is called when the component was updated */
  componentDidUpdate(prevProps) {
    // reload profiles if shown state changed. Occures if the PersonListEntrys ExpansionPanel was expanded
    // if ((this.props.show !== prevProps.show)) {
    //   this.getProfiles();
    // }
  }

  /** Adds an profile for the current person */
  addProfile = () => {
    AppAPI.getAPI().addProfileForPerson(this.props.person.getID()).then(profileBO => {
      // console.log(profileBO)
      this.setState({  // Set new state when ProfileBOs have been fetched
        profiles: [...this.state.profiles, profileBO],
        loadingInProgress: false, // loading indicator 
        addingProfileError: null
      })
    }).catch(e =>
      this.setState({ // Reset state with error from catch 
        profiles: [],
        loadingInProgress: false,
        addingProfileError: e
      })
    );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      addingProfileError: null
    });
  }

  /** Handles onProfileDelete events from an ProfileListEntry  */
  deleteProfileHandler = (deletedProfile) => {
    // console.log(deletedProfile.getID());
    this.setState({
        profiles: this.state.profiles.filter(profile => profile.getID() !== deletedProfile.getID())
    })
  }

  /** Renders the component */
  render() {
    const { classes, person } = this.props;
    // Use the states person
    const { profiles, loadingInProgress, loadingProfileError, addingProfileError } = this.state;

    // console.log(this.props);
    return (
      <div className={classes.root}>
        <List className={classes.profileList}>
          {
            profiles.map(profile => <ProfileListEntry key={profile.getID()} person={person} profile={profile} onProfileDeleted={this.deleteProfileHandler}
              show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show={loadingInProgress} />
            <ContextErrorMessage error={loadingProfileError} contextErrorMsg={`List of profiles for persons ${person.getID()} could not be loaded.`} onReload={this.getProfiles} />
            <ContextErrorMessage error={addingProfileError} contextErrorMsg={`Profile for person ${person.getID()} could not be added.`} onReload={this.addProfile} />
          </ListItem>
        </List>
        <Button className={classes.addProfileButton} variant='contained' color='primary' startIcon={<AddIcon />} onClick={this.addProfile}>
          Add Profile
        </Button>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },
  profileList: {
    marginBottom: theme.spacing(2),
  },
  addProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
ProfileList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The PersonBO of this ProfileList */
  person: PropTypes.object.isRequired,
  /** If true, profiles are (re)loaded */
  show: PropTypes.bool.isRequired
}

export default withStyles(styles)(ProfileList);
