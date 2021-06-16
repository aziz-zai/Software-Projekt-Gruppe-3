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
//import ContextErrorMessage from './ContextErrorMessage';
//import LoadingProgress from './LoadingProgress';

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
    //this.matchGroups();
  }

  matchProfiles = () => {
    AppAPI.getAPI()
      .matchProfiles(this.props.profile.getID())
      .then((response) =>
        this.setState({
          personList: response,
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
        {personList && groupList ? (
          <div>
            <h2>Lernpartner finden</h2>
            <div>
              <Button
                className={classes.button_style}
                variant="outlined"
                color="primary"
                onClick={this.handleClose}>
                <ArrowBackIcon />
              </Button>

              {personList.map((profile) => {
                return (
                  <Card className={classes.root} variant="outlined" key={profile.getPersonID()}>
                    <CardContent>
                      <Typography variant="h6" component="h4">
                        {profile.getFirstName()} {profile.getLastName()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                  </Card>
                );
              })}

            </div>
            <div>
              )
            </div>
          </div>
        ) : (
            <div>
              <p>Oops, hier scheint etwas shiefgelaufen zu sein.</p>
              <Button color="secondary" onClick={this.handleClose}>
                <ArrowBackIcon />
              </Button>
            </div>
          )}
      </div>
    );
  }
}
const styles = (theme) => ({
  root: {
    maxWidth: 300,
  },
  content: {
    fontSize: 18,
    marginTop: 7,
  },
  button_style: {
    marginBottom: 5,
    padding: 5,
  },
});

Matchmaking.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(Matchmaking);
//export default Matching;