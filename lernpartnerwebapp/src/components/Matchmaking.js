import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles} from "@material-ui/core"
import { AppAPI } from "../api"
import ProfileBO from "../api/ProfileBO"
import ProfileDetail from "../components/ProfileDetail"
import GroupDetail from './GroupDetail'
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

class Matchmaking extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      personList: [],
      groupList: [],
    };
  }
  componentDidMount() {
    this.matchProfiles();
  }


  matchProfiles = () => {
    AppAPI.getAPI()
      .matchProfiles()
      .then((profiles) =>{
        this.setState({
          personList: profiles,
          loadingInProgress: false,
          loadingError: null,
        })
        this.matchGroups()
      }
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
    })

  }

  matchGroups = () => {
    AppAPI.getAPI()
      .matchGroups()
      .then((response) =>
        this.setState({
          groupList: response,
          loadingInProgress: false,
          loadingError: null,
        })
      )
     .catch((e) =>
        this.setState({
          groupList: [],
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    });
  };


  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes } = this.props;
    const { personList, groupList } = this.state;

    return (
      <div>
        {personList ? (
            <div>
              {
            personList.map(person => 
            <ProfileDetail key={person.id_} person={person.id_} //expandedState={expandedProfileID === profile.getID()}
            />)

              }


            {
            groupList.map(group =>
            <GroupDetail key={group.id_} learngroup={group} //expandedState={expandedProfileID === profile.getID()}
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