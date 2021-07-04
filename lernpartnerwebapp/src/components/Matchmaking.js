import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, Typography} from "@material-ui/core"
import { AppAPI } from "../api"
import ProfileDetail from "../components/ProfileDetail"
import GroupDetail from './GroupDetail'


class Matchmaking extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
      personList: null,
      groupList: null,
    };
  }
  componentDidMount() {
    this.matchProfiles();
  }


  matchProfiles = () => {               //Get A List of matched Profiles
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
          loadingInProgress: false,
          loadingError: e,
        })
      );
    this.setState({
      loadingInProgress: true,
      loadingError: null,
    })

  }

  matchGroups = () => {  //Get A List of Matched Groups
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
        {(personList?.length) ? (
            <div>
              <Typography className={classes.root} variant='h5' align='center'> Matched Persons:</Typography>
              {
            personList.map(person => 
            <ProfileDetail personList={true} key={person.id_} person={person.id_} //send each macthed person to ProfileDetail
            />)
              }</div>
        ) : null
          }
            {(groupList?.lenght) ?
            <div>
            <Typography className={classes.root} variant='h5' align='center'>Matched Groups:</Typography>
            {groupList.map(group =>
            <GroupDetail showRequestGroup={true} key={group.id_} learngroup={group} //send each matched group tp GroupDetail
            />)}</div>
              :null}
      </div>
    );
  }
}
const styles = (theme) => ({
  root: {
    margin: 15,
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
  classes: PropTypes.object,
  onClose: PropTypes.func,
  currentUser: PropTypes.object,
};

export default withStyles(styles)(Matchmaking);