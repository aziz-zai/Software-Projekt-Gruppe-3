import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, ListItem } from '@material-ui/core';
import { Button, List } from '@material-ui/core';
import { AppAPI } from '../api';
import ProfileBO from '../api/ProfileBO';
import ProfileListEntry from "./ProfileListEntry";
import LoadingProgress from './dialogs/LoadingProgress';
import ContextErrorMessage from './dialogs/ContextErrorMessage';

class MyProfile extends Component {

  constructor(props) {
    super(props);
   
    // Init the state
    this.state = {
      profiles: new ProfileBO(),
      loadingInProgress: false,
      loadingProfileError: null,
      addingProfileError: null,
    };
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson()
    .then((profileBOs) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profiles: profileBOs[0],
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

  componentDidMount() {
    this.getProfile();
  }


  render() {
    const { classes } = this.props;
    const { profile, loadingInProgress, loadingProfileError} = this.state;
    return (
      <div className={classes.root}>
        <List> className={classes.MyProfile}>
          {
            profile.map(profile => <ProfileListEntry key={profile.getID()} profile={profile}
            show={this.props.show} />)
          }
          <ListItem>
            <LoadingProgress show= {loadingInProgress} />
            <ContextErrorMessage error={loadingProfileError} contextErrorMsg={`List of the profile 
            for person ${profile.getID()} could not be loaded.`} onReload={this.getProfile} />
          </ListItem>
        </List>
        {/*profile  {this.state.profiles.get()}*/}
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
  addProfileButton: {
    position: 'absolute',
    right: theme.spacing(3),
    bottom: theme.spacing(1),
  }
});

/** PropTypes */
MyProfile.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProfile);
