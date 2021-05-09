import React, { Component } from 'react'



class PersonListEntry extends Component {

    constructor(props) {
        super(props);


        this.state = {
            person: props.person,
            showPersonForm: false,
        
        }
    }
}