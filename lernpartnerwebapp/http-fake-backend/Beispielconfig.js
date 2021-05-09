'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/response-files"

module.exports = SetupEndpoint({
    name: 'App',
    urls: [{
        params: '/persons',
        requests: [{
            method: 'GET',
            response: '/response-files/persons.json'
        },
        {
            method: ['POST'],
            response: '/response-files/persons.json'
        }]
    }, {
        params: '/persons/{id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/persons.json'
        }, {
            method: ['PUT'],
            response: '/response-files/persons.json'
        }, {
            method: 'DELETE',
            response: '/response-files/persons.json'
        }]
    }]
});