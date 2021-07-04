import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@material-ui/core';
import { AppAPI } from '../api';
import GroupDetail from './GroupDetail';
import LoadingProgress from './dialogs/LoadingProgress';


class AllGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: [],
            loadingInProgress: false,
            loadingError: null,
            error: null
          };

        this.state = {
            groupList: [],
            error: null,
            loadingInProgress: false,
            loadingError: null
        };
    }
    loadPotentialGroups = () => {
        AppAPI.getAPI().getGroups().then(groups =>
          this.setState({
            groupList: groups,
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


    componentDidMount() {
        this.loadPotentialGroups();
    }
    render() {
        const{groupList, loadingInProgress} =this.state;
        return (
            <div>
        <Grid  container spacing={1} justify='flex-start' alignItems='center'>
        <Grid item>
        </Grid>
      </Grid>
      {
            groupList.map(group =>
              <GroupDetail showRequestGroup={true} learngroup={group}/>)
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

AllGroups.propTypes = {
    classes: PropTypes.object,

}

export default withStyles(styles)(AllGroups);
