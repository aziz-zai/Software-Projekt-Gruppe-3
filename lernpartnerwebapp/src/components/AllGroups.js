import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles,Grid} from '@material-ui/core';
import { AppAPI } from '../api';
import GroupDetail from './GroupDetail';
import LoadingProgress from './dialogs/LoadingProgress';


class AllGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupList: [], //List of All Groups
            loadingInProgress: false,  //loading state
            error: null
          };
    }
    loadPotentialGroups = () => {    //API CALL to load all Potential Groups to send a potential request
        AppAPI.getAPI().getGroups().then(groups =>
          this.setState({
            groupList: groups,
            loadingInProgress: false, // loading indicator 
            error: null
          })).catch(e =>
            this.setState({ // Reset state with error from catch 
              loadingInProgress: false,
            })
          );

        // set loading to true
        this.setState({
          loadingInProgress: true,
          error: null
        });
      }


    componentDidMount() {
        this.loadPotentialGroups(); //load this function when component is mount
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
              <GroupDetail showRequestGroup={true} learngroup={group}/>)    //Send every groupObject from the groupList to Component: GroupDetail
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
