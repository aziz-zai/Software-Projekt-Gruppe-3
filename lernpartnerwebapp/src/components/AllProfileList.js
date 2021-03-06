import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,Grid} from '@material-ui/core';
import { AppAPI } from '../api';
import LoadingProgress from './dialogs/LoadingProgress';
import ProfileDetail from './ProfileDetail';


/** Shows all profiles of the app*/
class AllProfileList extends Component {

  constructor(props) {
    super(props);

    // Init an empty state
    this.state = {
      personList: [],
      error: null,
      loadingInProgress: false,
      loadingError: null,
    };
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.loadPotentialPersons();
  }

  /** gets the profile list of persons that are not in correlation with your own person */
  loadPotentialPersons = () => {
    AppAPI.getAPI().getPotentialChats().then(persons =>
      this.setState({
        personList: persons,
        loadingInProgress: false, // loading indicator 
        loadingError: null,
        error: null
      })).catch(e =>
        this.setState({ // Reset state with error from catch 
          loadingInProgress: false,
          loadingError: false,
          error: e
        })
      );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }


  render() {
    const { classes } = this.props;
    const { personList, loadingInProgress, loadingError, error} = this.state;

    return (

      <div className={classes.root}>
        <Grid className={classes.profileFilter} container spacing={1} justify='flex-start' alignItems='center'>
        <Grid item>
          {console.log('sadsaallprofiles', personList)}
        </Grid>
      </Grid>
      {
            personList.map(person =>
              <ProfileDetail key={person.id_} person={person.id_} personList={personList}/>) //send eacg profile of ProfileList to ProfileDetail
          }
          <LoadingProgress show={loadingInProgress} />
      </div>

    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
  }
});

AllProfileList.propTypes = {
  /** @ignore */
  classes: PropTypes.object,
  location: PropTypes.object,
}

export default withStyles(styles)(AllProfileList);