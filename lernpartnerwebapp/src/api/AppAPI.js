import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
import MembershipBO from './MembershipBO';
import ChatroomBO from './ChatroomBO';
import GroupBO from './GroupBO';
import MessageBO from './MessageBO';
//import firebase from './firebase';

import RequestBO from './RequestBO'


export default class AppAPI {

  static #api = null;

  #AppServerBaseURL = 'http://localhost:5000/api'

  //Person related
  #getPersonsURL = () => `${this.#AppServerBaseURL}/person`;
  #addPersonURL = () => `${this.#AppServerBaseURL}/person`;
  #getPersonURL = (google_user_id) => `${this.#AppServerBaseURL}/person/${google_user_id}`;
  #deletePersonURL = (google_user_id) => `${this.#AppServerBaseURL}/person/${google_user_id}`;

  //Profile related
  #getAllProfilesURL = () => `${this.#AppServerBaseURL}/profile`;
  #getProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/profile/${id}`;
  #updateProfileURL = (id) => `${this.#AppServerBaseURL}/profile/${id}`;
  #searchProfileURL = (firstname, lastname) => `${this.#AppServerBaseURL}/profile/${firstname || lastname}`;
  #matchProfilesURL = (id) => `${this.#AppServerBaseURL}/profile/match_person/${id}`;
  
  //ChatRoom related
  #getSingleChatByIdURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/singlechat/${chatroom}`;          //Gibt einen Singlechat mit ID von chatroom aus
  #getAllSingleChatsByPersonIdURL = () => `${this.#AppServerBaseURL}/chatroom/singlechats`;                   //Gibt alle Singlechats mit ID von person aus
  #sendSingleChatRequestURL = (receiver) => `${this.#AppServerBaseURL}/chatroom/receiver/${receiver}`;           //Sendet einen Singlechatrequest 
  #getAllReceivedRequestsURL = () => `${this.#AppServerBaseURL}/chatroom/open_received_requests`;             //Gibt alle noch offene erhaltene Requests aus
  #getAllSentRequestsURL = () => `${this.#AppServerBaseURL}/chatroom/open_sent_requests`;                     //Gibt alle noch offene gesendete Requests aus     
  #acceptReceivedRequestURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/accept_requests/${chatroom}`; //Akzeptieren eines erhaltenen Requests           
  #deleteSingleChatURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/chatroom_to_delete/${chatroom}`;   //Löschen eines Singlechats           
  #deleteSentRequestURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/delete_sent/${chatroom}`;         //Löschen eines gesendeten Requests           
  #deleteReceivedRequestURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/delete_received/${chatroom}`; //Löschen eines erhaltenen Requests           


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

  #fetchAdvanced = (url,init) => fetch(url,{credentials: 'include', ...init} )
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

  deletePerson(google_user_id) {
    return this.#fetchAdvanced(this.#deletePersonURL(google_user_id), {
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

  matchProfiles(id) {
    return this.#fetchAdvanced(this.#matchProfilesURL(id)).then((responseJSON) => {
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

  getGroupForPerson(id) {
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
   .  then((responseJSON) => {
      let memberBOs = MembershipBO.fromJSON(responseJSON);
      return new Promise(function(resolve){
        resolve(memberBOs);
       })
    })
  }

  sendRequest(sender, receiver){
    return this.#fetchAdvanced(this.#sendSingleChatRequestURL(sender, receiver),{
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

  sendRequest(receiver) {
    return this.#fetchAdvanced(this.#sendSingleChatRequestURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(receiver)
    }).then((responseJSON) => {
      let responseChatroomBO = ChatroomBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseChatroomBO);
        })
      })
    }

  getSingleChat(chatroomBOs) {
    return this.#fetchAdvanced(this.#getSingleChatByIdURL(chatroomBOs.chatroom))
      .then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
         resolve(chatroomBOs);
        })
      })
    }

  getAllSingleChats() {
    return this.#fetchAdvanced(this.#getAllSingleChatsByPersonIdURL()).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
        })
      })
    }

  getAllReceivedRequests() {
    return this.#fetchAdvanced(this.#getAllReceivedRequestsURL()).then((responseJSON) => {
        let chatroomBOs = chatroomBOs.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
        })
      })
    }

  getAllSentRequests() {
    return this.#fetchAdvanced(this.#getAllSentRequestsURL()).then((responseJSON) => {
        let chatroomBOs = chatroomBOs.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
        })
      })
    }

  acceptReceivedRequest(chatroomBO) {
    return this.#fetchAdvanced(this.#acceptReceivedRequestURL(chatroomBO.chatroom), {
        method: 'PUT',
        headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
        },
        body: JSON.stringify(chatroomBO)
      }).then((responseJSON) => {
        let responseChatroomBO = ChatroomBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
        resolve(responseChatroomBO);
        })
      })
    }

  deleteSingleChat(chatroom) {
    return this.#fetchAdvanced(this.#deleteSingleChatURL(chatroom), {
      method: 'DELETE'
      }).then((responseJSON) => {
      let responseChatroomBO = ChatroomBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseChatroomBO);
      })
    })
  }

  deleteSentRequest(chatroom) {
    return this.#fetchAdvanced(this.#deleteSentRequestURL(chatroom), {
      method: 'DELETE'
      }).then((responseJSON) => {
      let responseChatroomBO = ChatroomBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseChatroomBO);
      })
    })
  }

  deleteReceivedRequest(chatroom) {
    return this.#fetchAdvanced(this.#deleteReceivedRequestURL(chatroom), {
      method: 'DELETE'
      }).then((responseJSON) => {
      let responseChatroomBO = ChatroomBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseChatroomBO);
      })
    })
  }

  }
  
   // matchGroup(id) {
   //   return this.#fetchAdvanced(this.#MatchGroupsURL(id)).then((responseJSON) => {
   //     let groupList = [];
   //     responseJSON.map(item => {
   //       let group = GroupBO.fromJSON(item);
   //       groupList.push(group);
   //     })
   //     return new Promise(function (resolve) {
   //       resolve(groupList);
   //     })
   //   })
   // }