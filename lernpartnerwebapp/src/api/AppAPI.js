import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
//import ConversationBO from './ConversationBO';
//import GroupBO from './GroupBO';
//import MessageBO from './MessageBO';



export default class AppAPI {

  static #api = null;

  #AppServerBaseURL = '/lernpartnerwebapp/http-fake-backend/response-files'

  //Person related
  #getPersonsURL = () => `${this.#AppServerBaseURL}/persons`;
  #addPersonURL = () => `${this.#AppServerBaseURL}/persons`;
  #getPersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
  #updatePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
  #deletePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
  #searchPersonURL = (personName) => `${this.#AppServerBaseURL}/persons-by-name/${personName}`;

  //Profile related
  #getAllProfilesURL = () => `${this.#AppServerBaseURL}/profiles`;
  #getProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}/profiles`;
  #addProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}/profiles`;
  #updateProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}/profiles`;
  #deleteProfileIdURL = (id) => `${this.#AppServerBaseURL}/profiles/${id}`;
  #searchProfileURL = (profileBOs) => `${this.#AppServerBaseURL}/profiles`


  //Conversation related
  //#getConversationsURL = () => `${this.#AppServerBaseURL}/conversations`;
  //#getConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#updateConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#deleteConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;
  //#searchConversationURL = (id) => `${this.#AppServerBaseURL}/conversation/${id}`;

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
  //#searchMessageURL = (id) => `${this.#AppServerBaseURL}/messages/${id}`;


  /** 
   * Get the Singelton instance 
   * 
   * @public
   */
   static getAPI() {
    if (this.#api == null) {
      this.#api = new AppAPI();
    }
    return this.#api;
  }

  #fetchedAdvanced = (url, init) => fetch(url, init)
  .then(res => {
      if (!res.ok){
          throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
  })

  /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   * 
   * @public
   */    
  getPersons() {
       return this.fetchedAdvanced(this.#getPersonsURL()).then((responseJSON) => {
          let personBOs = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(personBOs);
          })
      })
  }

  /**
   * Returns a Promise, which resolves to a PersonBO
   * 
   * @param {Number} personID to be retrieved
   * @public
   */
  getPerson(personID) {
      return this.#fetchedAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          return new Promise(function(resolve){
              resolve(responsePersonBO);
          })
      })
  }

  /**
   * Adds a customer and returns a Promise, which resolves to a new PersonBO object with the 
   * firstname, lastname, email and google_user_id of the parameter customerBO object.
   * 
   * @param {PersonBO} personBO to be added. The ID of the new person is set by the backend
   * @public
   */
  addPerson(personBO) {
      return this.fetchAdvanced(this.#addPersonURL(), {
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
  /**
   * Updates a customer and returns a Promise, which resolves to a PersonBO.
   * 
   * @param {PersonBO} personBO to be updated
   * @public
   */
  updatePersonURL(personBO) {
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
  /**
   * Deletes the given profile and returns a Promise, which resolves to an personBO
   * 
   * @param personID to be deleted
   * @public
   */
  deletePerson(personID) {
    return this.fetchAdvanced(this.#deletePersonURL(personID), {
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
  /**
  * Returns a Promise, which resolves to an Array of BOs
  * 
  * @param {Number} personID to be deleted
  * @public
  */
  searchPerson(personName) {
      return this.fetchAdvanced(this.#searchPersonURL(personName)).then((responseJSON) => {
        let PersonBOs = PersonBO.fromJSON(responseJSON);
        // console.info(PersonBOs);
        return new Promise(function (resolve) {
          resolve(PersonBOs);
        })
      })
    }
  /**
   * Returns a Promise, which resolves to an Array of ProfileBOs
   * 
   * @public
   */    
  getAllProfiles() {
      return this.fetchedAdvanced(this.#getAllProfilesURL()).then((responseJSON) => {
          let profileBOs = ProfileBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(profileBOs);
         })
     })
  }

  /**
  * Returns a Promise, which resolves to a ProfileBO
  * 
  * @param {Number} personID for wich the profiles should be retrieved
  * @public
  */
  getProfileForPerson(personID) {
     return this.fetchedAdvanced(this.#getProfileForPersonURL(personID))
      .then((responseJSON) => {
        let profileBOs = ProfileBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
          resolve(profileBOs);
        })
     })
  }
  


} 
 

