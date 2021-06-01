import React, {Component} from 'react';


export default class ProfileList extends Component {

    constructor(props) {
        super(props);

        let expandedID = null;

        if (this.props.location.expandProfile) {
            expandedID = this.props.location.expandProfile.getID();
        }
    }
}