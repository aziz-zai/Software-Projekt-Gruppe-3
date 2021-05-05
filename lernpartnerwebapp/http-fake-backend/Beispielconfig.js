'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/lernpartner"

module.exports = SetupEndpoint({
    name: 'lernpartner',
    urls: [{
        params: '/group',
        requests: [{
            method: 'GET',
            response: '/response-files/lernpartner/group.json'
        },
        {
            method: ['POST'],
            response: '/response-files/lernpartner/group.json'
        }]
    }, {
        params: '/group/{id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/lernpartner/group.json'
        }, {
            method: ['PUT'],
            response: '/response-files/lernpartner/group.json'
        }, {
            method: 'DELETE',
            response: '/response-files/lernpartner/group.json'
        }]
    }]
});