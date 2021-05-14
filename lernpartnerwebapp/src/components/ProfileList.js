import React, {Component} from 'react';


class ProfileList extends Component {

    constructor(props) {
        super(props);

        let expandedID = null;

        if (this.props.location.expandProfile) {
            expandedID = this.props.location.expandProfile.getID();
        }
    }
}