import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core"
import { AppAPI } from "../api"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ProfileBO from "../api/ProfileBO"
import ProfileDetail from "../components/ProfileDetail"
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class Matchmaking extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      personList: [],
      groupList: null,
    };
  }
  componentDidMount() {
    this.matchProfiles();
    //this.matchGroups();
  }

  matchProfiles = () => {
    AppAPI.getAPI()
      .matchProfiles(1)
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

  /** Renders the component */
  render() {
    const { classes } = this.props;
    const { personList } = this.state;

    return (
      <div>
        {personList ? (
          <div>
            <h2>Lernpartner/gruppe finden</h2>
            <div>
              {
            personList.map(profile => 
            <ProfileDetail key={profile.getID()} profileID={profile.getPersonID()} Firstname={profile.getFirstName()} Lastname={profile.getLastName()} //expandedState={expandedProfileID === profile.getID()}
            />)
              }
            </div>
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
};

export default withStyles(styles)(Matchmaking);