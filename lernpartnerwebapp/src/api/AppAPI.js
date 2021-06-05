import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
//import ConversationBO from './ConversationBO';
//import GroupBO from './GroupBO';
//import MessageBO from './MessageBO';



export default class AppAPI {

  static #api = null;

  #AppServerBaseURL = 'http://localhost:5000/api'

  //Person related
  #getPersonsURL = () => `${this.#AppServerBaseURL}/person`;
  #addPersonURL = () => `${this.#AppServerBaseURL}/person`;
  #getPersonURL = (id) => `${this.#AppServerBaseURL}/person/${id}`;
  #updatePersonURL = (id) => `${this.#AppServerBaseURL}/person/${id}`;
  #deletePersonURL = (id) => `${this.#AppServerBaseURL}/person/${id}`;
  #searchPersonURL = (personName) => `${this.#AppServerBaseURL}/person-by-name/${personName}`;

  //Profile related
  #getAllProfilesURL = () => `${this.#AppServerBaseURL}/profile`;
  #getProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/profile/${id}`;
  #addProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/person/${id}/profile`;
  #updateProfileURL = (id) => `${this.#AppServerBaseURL}/person/${id}/profile`;
  #deleteProfileIdURL = (id) => `${this.#AppServerBaseURL}/profile/${id}`;
  #searchProfileURL = (profileBOs) => `${this.#AppServerBaseURL}/profile`


  //Conversation related
  //#getConversationsURL = () => `${this.#AppServerBaseURL}/conversations`;
  //#getConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#updateConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#deleteConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;


  //Group related
  //#getGroupsURL = () => `${this.#AppServerBaseURL}/groups`;
  //#getPersonsFromGroupURL = () => `${this.#AppServerBaseURL}/persons/${id}/groups`;
  //#addPersonToGroupURL = (id) => `${this.#AppServerBaseURL}/persons/${id}/groups`;
  //#updateGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#deleteGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#searchGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;

  //Message related
  //#getMessagesURL = () => `${this.#AppServerBaseURL}/messages`;
  //#addMessageURL = () => `${this.#AppServerBaseURL}/messages`;
  //#getMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`;
  //#updateMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`;
  //#deleteMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`;




   static getAPI() {
    if (this.#api == null) {
      this.#api = new AppAPI();
    }
    return this.#api;
  }

  #fetchAdvanced = (url, init) => fetch(url, init)
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
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          return new Promise(function(resolve){
              resolve(responsePersonBO);
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
  updatePerson(personBO) {
      return this.#updatePersonURL(this.#updatePersonURL(personBO.getID()), {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain',
          'Content-type': 'application/json',
        },
        body: JSON.stringify(personBO)
      }).then((responseJSON) => {
        // We always get an array of PersonBOs.fromJSON
        let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
        // console.info(PersonBOs);
        return new Promise(function (resolve) {
          resolve(responsePersonBO);
        })
      })
  }
  deletePerson(personID) {
    return this.#fetchAdvanced(this.#deletePersonURL(personID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(profileBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }
  searchPerson(personName) {
      return this.#fetchAdvanced(this.#searchPersonURL(personName)).then((responseJSON) => {
        let PersonBOs = PersonBO.fromJSON(responseJSON);
        // console.info(PersonBOs);
        return new Promise(function (resolve) {
          resolve(PersonBOs);
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
    return this.#updateProfileURL(this.#updateProfileURL(profileBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      // We always get an array of ProfileBOs.fromJSON
      let responseProfileBO = ProfileBO.fromJSON(responseJSON)[0];
      // console.info(ProfileBOs);
      return new Promise(function (resolve) {
        resolve(responseProfileBO);
      })
    })
  }
} 