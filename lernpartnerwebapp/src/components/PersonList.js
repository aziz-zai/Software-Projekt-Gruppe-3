import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear'
import { withRouter } from 'react-router-dom';
import { AppAPI } from '../api';
import ContextErrorMessage from './dialogs/ContextErrorMessage';
import LoadingProgress from './dialogs/LoadingProgress';
import PersonForm from './dialogs/PersonForm';
import PersonListEntry from './PersonListEntry';

/**
 * Controlls a list of PersonListEntrys to create a accordion for each person.  
 * 
 * @see See [PersonListEntry](#personlistentry)
 * 
 * @author [Christoph Kunz](https://github.com/christophkunz)
 */
class PersonList extends Component {

  constructor(props) {
    super(props);

    // console.log(props);
    let expandedID = null;

    if (this.props.location.expandPerson) {
      expandedID = this.props.location.expandPerson.getID();
    }

    // Init an empty state
    this.state = {
      persons: [],
      error: null,
      loadingInProgress: false,
      expandedPersonID: expandedID
    };
  }

  /** Fetches all PersonBOs from the backend */
  getPersons = () => {
    AppAPI.getAPI().getPersons()
      .then(personBOs =>
        this.setState({               // Set new state when PersonBOs have been fetched
          persons: personBOs,
          // store a copy
          loadingInProgress: false,   // disable loading indicator 
          error: null
        })).catch(e =>
          this.setState({             // Reset state with error from catch 
            persons: [],
            loadingInProgress: false, // disable loading indicator 
            error: e
          })
        );

    // set loading to true
    this.setState({
      loadingInProgress: true,
      error: null
    });
  }

  /** Lifecycle method, which is called when the component gets inserted into the browsers DOM */
  componentDidMount() {
    this.getPersons();
  }

  /** 
   * Handles onExpandedStateChange events from the PersonListEntry component. Toggels the expanded state of 
   * the PersonListEntry of the given PersonBO.
   * 
   * @param {person} PersonsBO of the PersonListEntry to be toggeled
   */
  onExpandedStateChange = person => {
    // console.log(personID);
    // Set expandend person entry to null by default
    let newID = null;

    // If same person entry is clicked, collapse it else expand a new one
    if (person.getID() !== this.state.expandedPersonID) {
      // Expand the person entry with personID
      newID = person.getID();
    }
    // console.log(newID);
    this.setState({
      expandedPersonID: newID,
    });
  }

  /** 
   * Handles onPersonDeleted events from the PersonListEntry component
   * 
   * @param {person} PersonBO of the PersonListEntry to be deleted
   */

  /** Handles the onClick event of the add person button */

  /** Handles the onClose event of the PersonForm */


  /** Handels onChange events of the person filter text field */
  /** Handles the onClose event of the clear filter button */
 
  /** Renders the component */
  render() {
    const { classes} = this.props;
    const { person, expandedPersonID, loadingInProgress, error} = this.state;

    return (
      <div className={classes.root}>
        {
          // Show the list of PersonListEntry components
          // Do not use strict comparison, since expandedPersonID maybe a string if given from the URL parameters
            <PersonListEntry key={person.getID()} person={person} expandedState={expandedPersonID === person.getID()}
              onExpandedStateChange={this.onExpandedStateChange}
            />
        }
        <LoadingProgress show={loadingInProgress} />
        <ContextErrorMessage error={error} contextErrorMsg={`The list of persons could not be loaded.`} onReload={this.getPersons} />
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  },

});

/** PropTypes */
PersonList.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** @ignore */
  location: PropTypes.object.isRequired,
}

export default withRouter(withStyles(styles)(PersonList));