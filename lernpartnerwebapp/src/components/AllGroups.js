import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GroupDetail from './GroupDetail';
import LoadingProgress from './dialogs/LoadingProgress';
import {withStyles, Grid} from '@material-ui/core'
import {AppAPI} from '../api'

class AllGroups extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupList: [],
            error: null,
            loadingInProgress: false,
            loadingError: null
        };
    }


    render() {

        const {classes} = this.props;
        const {groupList, loadingInProgress} = this.state;

        return (
            <div className={classes.root}>
         {
            groupList.map(group =>
              <GroupDetail learngroup = {group}> </GroupDetail>)
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
    classes: PropTypes.object.isRequired,

}

export default withStyles(styles)(AllGroups);
