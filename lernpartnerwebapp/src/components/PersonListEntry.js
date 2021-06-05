import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Grid } from '@material-ui/core';
import { Button, ButtonGroup } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonForm from './dialogs/ProfileForm';
import PersonDeleteDialog from './dialogs/PersonDeleteDialog';
import ProfileList from './ProfileList';


class PersonListEntry extends Component {

  constructor(props) {
    super(props);

    // Init the state
    this.state = {
        person: props.person,
    };
  }

  /** Handles onChange events of the underlying ExpansionPanel */
  expansionPanelStateChanged = () => {
    this.props.onExpandedStateChange(this.props.person);
  }

  /** Handles onProfileDelete events from an ProfileListEntry  */
 

  /** Handles the onClick event of the edit person button */
 

  /** Handles the onClose event of the PersonForm */
 

  /** Handles the onClick event of the delete person button */


  /** Handles the onClose event of the PersonDeleteDialog */
 

  /** Renders the component */
  render() {
    const { classes, expandedState, person } = this.props;
    // Use the states person

    // console.log(this.state);
    return (
      <div>
        <Accordion defaultExpanded={false} expanded={expandedState} onChange={this.expansionPanelStateChanged}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`person${person.getID()}profilepanel-header`}
          >
            <Grid container spacing={1} justify='flex-start' alignItems='center'>
              <Grid item>
                <Typography variant='body1' className={classes.heading}>{person.getLastName()}, {person.getFirstName()}
                </Typography>
              </Grid>
              <Grid item xs />
              <Grid item>
                <Typography variant='body2' color={'textSecondary'}>List of profiles</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <ProfileList show={expandedState} person={person} />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

/** Component specific styles */
const styles = theme => ({
  root: {
    width: '100%',
  }
});

/** PropTypes */
PersonListEntry.propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The PersonBO to be rendered */
  person: PropTypes.object.isRequired,
  /** The state of this PersonListEntry. If true the person is shown with its profiles */
  expandedState: PropTypes.bool.isRequired,
  /** The handler responsible for handle expanded state changes (exanding/collapsing) of this PersonListEntry 
   * 
   * Signature: onExpandedStateChange(PersonBO person)
   */
  onExpandedStateChange: PropTypes.func.isRequired,
  /** 
   *  Event Handler function which is called after a sucessfull delete of this person.
   * 
   * Signature: onPersonDelete(PersonBO person)
   */
  onPersonDeleted: PropTypes.func.isRequired
}

export default withStyles(styles)(PersonListEntry);
