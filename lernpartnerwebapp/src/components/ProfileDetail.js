import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileBO from '../api/ProfileBO'

/**
 * Renders a AccountBO object within a ListEntry and provides a delete button to delete it.
 * 
 * @see See Material-UIs [Lists](https://material-ui.com/components/lists/)
 * @see See Material-UIs [ListItem](https://material-ui.com/api/list-item/)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class ProfileDetail extends Component {

  constructor(props) {
    super(props);

    // Init state
    this.state = {
      profile: [],
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getProfile();
  }

  /** gets the balance for this account */
  getProfile = () => {
    AppAPI.getAPI().getProfileForPerson(this.props.profileID).then(profile =>
      this.setState({
        profile: profile,
        loadingInProgress: false,
        loadingError: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          profile: null,
          loadingInProgress: false,
          loadingError: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      loadingError: null
    });
  }

  /** Renders the component */
  render() {
    const { classes, Firstname, Lastname} = this.props;
    const { profile, loadingInProgress, loadingError } = this.state;

    return (
      <Paper variant='outlined' className={classes.root}>

        <Typography variant='h6'>
          Profile
        </Typography>
        <Typography className={classes.accountEntry}>
          Name: {Firstname} {Lastname}
        </Typography>
        <LoadingProgress show={loadingInProgress} />

      </Paper>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  accountEntry: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
});

/** PropTypes */
ProfileDetail.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The personID to be rendered */
  Firstname: PropTypes.string.isRequired,
  /** The profileID to be rendered */
  Lastname: PropTypes.string.isRequired
}

export default withStyles(styles)(ProfileDetail);