import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
import MembershipBO from './MembershipBO';
//import ConversationBO from './ConversationBO';
import GroupBO from './GroupBO';
//import MessageBO from './MessageBO';
//import firebase from './firebase';

import RequestBO from './RequestBO'


export default class AppAPI {

  static #api = null;

  #AppServerBaseURL = 'http://localhost:5000/api'

  //Person related
  #getPersonsURL = () => `${this.#AppServerBaseURL}/person`;
  #addPersonURL = () => `${this.#AppServerBaseURL}/person`;
  #getPersonURL = (google_user_id) => `${this.#AppServerBaseURL}/person/${google_user_id}`;
  #deletePersonURL = () => `${this.#AppServerBaseURL}/person`;

  //Profile related
  #getAllProfilesURL = () => `${this.#AppServerBaseURL}/profile`;
  #getProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/profile/person/${id}`;
  #updateProfileURL = (id) => `${this.#AppServerBaseURL}/profile/person/${id}`;
  #searchProfileURL = (firstname, lastname) => `${this.#AppServerBaseURL}/profile/${firstname || lastname}`;
  #matchProfilesURL = () => `${this.#AppServerBaseURL}/profile/match_person`;
  #matchGroupsURL = () => `${this.#AppServerBaseURL}/profile/match_group`;
  
  //Conversation related
  //#getConversationsURL = () => `${this.#AppServerBaseURL}/conversations`;
  //#getConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#updateConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#deleteConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  #getRequestsForPersonURL = (id) => `${this.#AppServerBaseURL}/request/${id}`;
  #sendRequestURL = (sender,receiver) => `${this.#AppServerBaseURL}/request/${sender}/${receiver}`

  //Group related
  #getGroupsURL = (id) => `${this.#AppServerBaseURL}/membership/person/${id}`;
  #getGroupURL = (id) => `${this.#AppServerBaseURL}/group/${id}`;
  #getMembersOfGroupURL = (id) => `${this.#AppServerBaseURL}/membership/group/${id}`;
  #createGroupURL = (groupname, groupinfo, id) => `${this.#AppServerBaseURL}/group/${groupname}/${groupinfo}/${id}`;
  //#updateGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#deleteGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#searchGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#matchGroupURL = (id) => `${this.#AppServerBaseURL}/group/${id}`;

  //Message related
  //#getMessagesURL = () => `${this.#AppServerBaseURL}/messages`;
  //#addMessageURL = () => `${this.#AppServerBaseURL}/messages`;
  //#getMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`;
  //#updateMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`;
  //#deleteMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`

   static getAPI() {
    if (this.#api == null) {
      this.#api = new AppAPI();
    }
    return this.#api;
  }

  #fetchAdvanced = (url,init) => fetch(url,{credentials: 'include', ...init})
  .then(res => {
      if (!res.ok){
          throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
  })

  getPersons() {
       return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
          let personBOs = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(personBOs);
          })
      })
  }

  getPerson(personID) {
    return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }

  addPerson(personBO) {
      return this.#fetchAdvanced(this.#addPersonURL(), {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(personBO)
      }).then((responseJSON) => {
        // We always get an array of PersonBOs.fromJSON, but only need one object
        let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
        // console.info(profileBOs);
        return new Promise(function (resolve) {
          resolve(responsePersonBO);
          })
      })
  }

  deletePerson() {
    return this.#fetchAdvanced(this.#deletePersonURL(), {
      method: 'DELETE',
      headers:{
        'Access-Control-Allow-Origin':'*',
      }
    }).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(profileBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  searchProfile(firstname, lastname) {
      return this.#fetchAdvanced(this.#searchProfileURL(firstname, lastname)).then((responseJSON) => {
        let ProfileBOs = ProfileBO.fromJSON(responseJSON);
        // console.info(PersonBOs);
        return new Promise(function (resolve) {
          resolve(ProfileBOs);
        })
      })
    }

  getAllProfiles() {
      return this.#fetchAdvanced(this.#getAllProfilesURL()).then((responseJSON) => {
          let profileBOs = ProfileBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(profileBOs);
         })
     })
  }

  getProfileForPerson(id) {
     return this.#fetchAdvanced(this.#getProfileForPersonURL(id))
      .then((responseJSON) => {
        let profileBOs = ProfileBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
          resolve(profileBOs);
        })
     })
  }

  updateProfile(profileBO) {
    return this.#fetchAdvanced(this.#updateProfileURL(profileBO.getPersonID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(profileBO)
    }).then((responseJSON) => {
      // We always get an array of ProfileBOs.fromJSON
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(ProfileBOs);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }

  matchProfiles() {
    return this.#fetchAdvanced(this.#matchProfilesURL()).then((responseJSON) => {
        let profileBOs = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(profileBOs);
      })
    })
  }

  getGroups(id){
    return this.#fetchAdvanced(this.#getGroupsURL(id)).then((responseJSON) => {
      let groupBOs = MembershipBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(groupBOs);
     })
 })
  }
  getGroup(id) {
    return this.#fetchAdvanced(this.#getGroupURL(id))
     .then((responseJSON) => {
       let groupBOs = GroupBO.fromJSON(responseJSON);
       return new Promise(function(resolve){
         resolve(groupBOs);
       })
    })
 }

 getMembersOfGroup(id) {
  return this.#fetchAdvanced(this.#getMembersOfGroupURL(id))
   .then((responseJSON) => {
     let memberBOs = MembershipBO.fromJSON(responseJSON);
     return new Promise(function(resolve){
       resolve(memberBOs);
     })
  })
}

sendRequest(sender, receiver){
  return this.#fetchAdvanced(this.#sendRequestURL(sender, receiver),{
    method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
  },
  }).then((responseJSON) => {
    let requestBOs = RequestBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(requestBOs);
    })
  })
}
getRequestsForPerson(id){
  return this.#fetchAdvanced(this.#getRequestsForPersonURL(id))
   .then((responseJSON) => {
     let requestBOs = RequestBO.fromJSON(responseJSON);
     return new Promise(function(resolve){
       resolve(requestBOs);
     })
  })
}

createGroup(groupname, groupinfo, id) {
  return this.#fetchAdvanced(this.#createGroupURL(groupname, groupinfo, id), {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(groupname, groupinfo, id)
  }).then((responseJSON) => {
    // We always get an array of GroupBOs.fromJSON, but only need one object
    let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
    // console.info(groupBOs);
    return new Promise(function (resolve) {
      resolve(responseGroupBO);
      })
  })
}

matchGroups() {
  return this.#fetchAdvanced(this.#matchGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(groupBOs);
    })
  })
}
}
