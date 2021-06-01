import React, { Component } from 'react'



export default class PersonListEntry extends Component {

    constructor(props) {
        super(props);


        this.state = {
            person: props.person,
            showPersonForm: false,
        
        }
    }
}