import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles} from "@material-ui/core"
import { AppAPI } from "../api"
import ProfileBO from "../api/ProfileBO"
import ProfileDetail from "../components/ProfileDetail"
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class Matchmaking extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      person: null,
      profile: null,
      personList: [],
      groupList: null,
    };
  }
  componentDidMount() {
    this.getPersonByGoogleUserID();
    //this.matchGroups();
  }

  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.state.person.id_)
    .then((profileBO) => {
      this.setState({  // Set new state when ProfileBOs have been fetched
        profile: profileBO[0],
        loadingInProgress: false, // loading indicator 
        loadingProfileError: null
      })
      this.matchProfiles();
    }
      )
      .catch((e) =>
        this.setState({
          profile: 'test',
          loadingInProgress: false,
          loadingProfileError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingProfileError: null
    });
  }

  getPersonByGoogleUserID = () => {
    AppAPI.getAPI().getPerson(this.props.currentUser.uid)
    .then((personBO) =>{
     
      this.setState({
        person: personBO
      })
    this.getProfile()
    }, 
      )
      .catch((e) =>
        this.setState({
          person: []
        })
      )
  }

  matchProfiles = () => {
    AppAPI.getAPI()
      .matchProfiles(this.state.profile.id_)
      .then((profiles) =>
        this.setState({
          personList: profiles,
          loadingInProgress: false,
          loadingError: null,
        })
      )
      .catch((e) =>
        this.setState({
          profile: null,
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };

//  matchGroups = () => {
//    AppAPI.getAPI()
//      .matchGroups(this.props.profile.person())
//      .then((response) =>
//        this.setState({
//          groupList: response,
//          loadingInProgress: false,
//          loadingError: null,
//        })
//      )
//      .catch((e) =>
//        this.setState({
//          profile: null,
//          loadingInProgress: false,
//          loadingError: e,
//        })
//      );
//    this.setState({
//      loadingInProgress: true,
//      loadingError: null,
//    });
//  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes } = this.props;
    const { personList } = this.state;

    return (
      <div>
        {personList ? (
            <div>
              {
            personList.map(profile => 
            <ProfileDetail key={profile.getID()} profileID={profile.getPersonID()} Firstname={profile.getFirstName()} Lastname={profile.getLastName()} //expandedState={expandedProfileID === profile.getID()}
            />)
              }
            </div>
        ) : null
          }
      </div>
    );
  }
}
const styles = (theme) => ({
  root: {
    maxWidth: 200,
  },
  content: {
    fontSize: 14,
    marginTop: 5,
  },
  button_style: {
    marginBottom: 5,
    padding: 5,
  },
});

Matchmaking.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default withStyles(styles)(Matchmaking);