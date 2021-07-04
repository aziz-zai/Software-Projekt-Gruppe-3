import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';
import MembershipBO from './MembershipBO';
import ChatroomBO from './ChatroomBO';
import GroupBO from './GroupBO';
import MessageBO from './MessageBO';


export default class AppAPI {

  //Singleton instance
  static #api = null;

  //Local Backend
  #AppServerBaseURL = 'http://localhost:5000/api'

  //Person related
  #getPersonIdURL = () => `${this.#AppServerBaseURL}/person`;
  #addPersonURL = () => `${this.#AppServerBaseURL}/person`;
  #getPersonURL = (google_user_id) => `${this.#AppServerBaseURL}/person/${google_user_id}`;
  #deletePersonURL = (person) => `${this.#AppServerBaseURL}/person/personid/${person}`;
  #getPotentialChatsURL = () => `${this.#AppServerBaseURL}/person/potential_singlechat`;
  #getPotentialPersonForGroupURL = (id) => `${this.#AppServerBaseURL}/person/group/${id}`;

  //Profile related
  #getAllProfilesURL = () => `${this.#AppServerBaseURL}/profile`;
  #getProfileForPersonURL = (id) => `${this.#AppServerBaseURL}/profile/person/${id}`;
  #updateProfileURL = (id) => `${this.#AppServerBaseURL}/profile/person/${id}`;
  #matchProfilesURL = () => `${this.#AppServerBaseURL}/profile/match_person`;
  #matchGroupsURL = () => `${this.#AppServerBaseURL}/profile/match_group`;

  //ChatRoom related
  #getSingleChatByIdURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/singlechat/${chatroom}`;          //Gibt einen Singlechat mit ID von chatroom aus
  #getAllSingleChatsByPersonIdURL = (person) => `${this.#AppServerBaseURL}/chatroom/singlechats/${person}`;                   //Gibt alle Singlechats mit ID von person aus
  #sendSingleChatRequestURL = (receiver) => `${this.#AppServerBaseURL}/chatroom/receiver/${receiver}`;           //Sendet einen Singlechatrequest 
  #getAllReceivedRequestsURL = (person) => `${this.#AppServerBaseURL}/chatroom/open_received_requests/${person}`;             //Gibt alle noch offene erhaltene Requests aus
  #getAllSentRequestsURL = (person) => `${this.#AppServerBaseURL}/chatroom/open_sent_requests/${person}`;                     //Gibt alle noch offene gesendete Requests aus     
  #acceptReceivedRequestURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/accept_request/${chatroom}`; //Akzeptieren eines erhaltenen Requests           
  #deleteSingleChatURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/chatroom_to_delete/${chatroom}`;   //Löschen eines Singlechats           
  #deleteSentRequestURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/delete_sent/${chatroom}`;         //Löschen eines gesendeten Requests           
  #deleteReceivedRequestURL = (chatroom) => `${this.#AppServerBaseURL}/chatroom/delete_received/${chatroom}`; //Löschen eines erhaltenen Requests           

  //Group related
  #getGroupsURL = () => `${this.#AppServerBaseURL}/group`;
  #getGroupURL = (id) => `${this.#AppServerBaseURL}/group/${id}`;
  #getMembersOfGroupURL = (id) => `${this.#AppServerBaseURL}/membership/group/${id}`;
  #createGroupURL = (groupname, groupinfo) => `${this.#AppServerBaseURL}/group/${groupname}/${groupinfo}`;

  //Membership related
  #addPersonToGroupURL = (group, person) => `${this.#AppServerBaseURL}/membership/group/${group}/${person}`;                //Fügt eine Person einer Gruppe hinzu
  #leaveAGroupURL = (group) => `${this.#AppServerBaseURL}/membership/Membershiprequest/${group}`;                    //Verlassen einer Gruppe
  #getAllMembershipGroupRequestsURL = (group) => `${this.#AppServerBaseURL}/membership/Membershiprequest/${group}`;     //Gibt alle erhaltenen Membersship/Group Reqeuests zurück
  #sendMembershipRequestURL = (group) => `${this.#AppServerBaseURL}/membership/Membershiprequest/${group}`;             //Senden einer Gruppenanfrage
  #rejectMembershipRequestURL = (group, person) => `${this.#AppServerBaseURL}/membership/group/${group}/${person}`; 
  #acceptMembershipRequestURL = (membership) => `${this.#AppServerBaseURL}/membership/${membership}`;            //Ablehnen eines erhaltenen Requests           
  #getGroupsOfPersonURL = () => `${this.#AppServerBaseURL}/membership/person`;                            //Gibt alle Gruppen einer Person zurück

  //Message related
  #getMessagesURL = (is_singlechat, thread_id) => `${this.#AppServerBaseURL}/message/${is_singlechat}/${thread_id}`;   //Gibt alle Messages eines Singlechats mit einer Person oder Gruppe zurück
  #createMessageURL = (is_singlechat, thread_id, person, content) => `${this.#AppServerBaseURL}/message/${is_singlechat}/${thread_id}/${person}/${content}`; //Erstellt eine Message


   static getAPI() {
    if (this.#api == null) {
      this.#api = new AppAPI();
    }
    return this.#api;
  }

  /**
   *  Returns a Promise which resolves to a json object. 
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
   *  fetchAdvanced throws an Error also an server status errors
   */
  #fetchAdvanced = (url,init) => fetch(url,{credentials: 'include', ...init})
  .then(res => {
      if (!res.ok){
          throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
  })

  //Returns a promise which resolves to a PersonBO. Gets Personid.
  getPersonId() {
       return this.#fetchAdvanced(this.#getPersonIdURL()).then((responseJSON) => {
          let personBOs = PersonBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(personBOs);
          })
      })
  }

  //Returns a promise which resolves to a PersonBO. Gets Person by id.
  getPerson(personID) {
    return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
      let person = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(person)
      })
    })
  }

  //Returns a promise which resolves to a PersonBO. Gets potential person for chat.
  getPotentialChats(){
    return this.#fetchAdvanced(this.#getPotentialChatsURL()).then((responseJSON) => {
       let personBOs = PersonBO.fromJSON(responseJSON);
       return new Promise(function (resolve) {
         resolve(personBOs);
       })
   })
}

  //Adds a Person and returns a promise which resolves to a new PersonBO with an email and google_user_id. Creates a Person.
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

  //Returns a promise which resolves to an Array of PersonBOs. Deletes a Person.
  deletePerson(person) {
    return this.#fetchAdvanced(this.#deletePersonURL(person), {
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

  //Returns a promise which resolves to an Array of ProfileBOs. Returns all profiles.
  getAllProfiles() {
      return this.#fetchAdvanced(this.#getAllProfilesURL()).then((responseJSON) => {
          let profileBOs = ProfileBO.fromJSON(responseJSON);
          return new Promise(function (resolve) {
            resolve(profileBOs);
         })
     })
  }
  
  //Returns a promises which resolves to an Array of ProfileBOs. Gets the profile of the person by person id.
  getProfileForPerson(id) {
     return this.#fetchAdvanced(this.#getProfileForPersonURL(id))
      .then((responseJSON) => {
        let profileBOs = ProfileBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
          resolve(profileBOs);
        })
     })
  }

  //Updates a profile and returns a promise which resolves to a ProfileBO.
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

  //Returns a promise which resolves to an Array of ProfileBOs. Returns matched profiles.
  matchProfiles() {
    return this.#fetchAdvanced(this.#matchProfilesURL()).then((responseJSON) => {
        let profileBOs = ProfileBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(profileBOs);
      })
    })
  }

  //Returns a promise which resolve to an Array of GroupBOs.
  getGroups(){
    return this.#fetchAdvanced(this.#getGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(groupBOs);
     })
 })
  }

  //Returns a promise which resolves to an Array of GroupBOs. Returns the group of the person by person id.
  getGroupForPerson(id) {
    return this.#fetchAdvanced(this.#getGroupURL(id))
     .then((responseJSON) => {
       let groupBOs = GroupBO.fromJSON(responseJSON);
       return new Promise(function(resolve){
         resolve(groupBOs);
       })
    })
  }
 
  //Returns a promise which resolves to an Array of GroupBOs.Returns all groups of a person.
  getGroupsOfaPerson() {
    return this.#fetchAdvanced(this.#getGroupsOfPersonURL()).then((responseJSON) => {
        let groupBOs = GroupBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(groupBOs);
       })
   })
}

  //Returns a promise which resolves to an Array of personBOs. Returns all potential persons to add to a group.
	getPotentialPersonsForGroup(id) {
  	return this.#fetchAdvanced(this.#getPotentialPersonForGroupURL(id))
    .then((responseJSON) => {
        let personBOs = PersonBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
          resolve(personBOs);
        })
    })
  }
  
  //Returns a promise which resolves to an Array of membershipBOs. Returns members of a group.
  getMembersOfGroup(id) {
    return this.#fetchAdvanced(this.#getMembersOfGroupURL(id))
   .  then((responseJSON) => {
      let memberBOs = MembershipBO.fromJSON(responseJSON);
      return new Promise(function(resolve){
        resolve(memberBOs);
       })
    })
  }

  //Sends a Request and returns a promise which resolves to an Array of chatroomBOs. Sending a request to a person.
  sendRequest(receiver){
    return this.#fetchAdvanced(this.#sendSingleChatRequestURL(receiver),{
      method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
    },
    }).then((responseJSON) => {
      let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(chatroomBOs);
      })
    })
  }

  //Creates a group and returns a promise which resolves to a new GroupBO object with the 
  //parameter groupname and groupinfo. The ID of the group is set by the backend
  createGroup(groupname, groupinfo) {
    return this.#fetchAdvanced(this.#createGroupURL(groupname, groupinfo), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(groupname, groupinfo)
    }).then((responseJSON) => {
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
        })
    })
  }

  //Returns a promise which resolves to an Array of ChatroomBOs. Gets singlechat by chatroom id.
  getSingleChat(chatroom) {
    return this.#fetchAdvanced(this.#getSingleChatByIdURL(chatroom))
      .then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
         resolve(chatroomBOs);
      })
    })
  }

  //Returns a promise which resolves to an Array of chatroomBOs. Gets all singlecahts of a person by person id.
  getAllSingleChats(person) {
    return this.#fetchAdvanced(this.#getAllSingleChatsByPersonIdURL(person)).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
      })
    })
  }

  //Returns a promise which resolves to an array of chatroomBOs. Returns all received requests of a person.
  getAllReceivedRequests(person) {
    return this.#fetchAdvanced(this.#getAllReceivedRequestsURL(person)).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
      })
    })
  }

  //Returns a promise which resolves to an Array of chatroomBOs. Retruns all sent requests of a person.
  getAllSentRequests(person) {
    return this.#fetchAdvanced(this.#getAllSentRequestsURL(person)).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
      })
    })
  }

  //Accepts a received request and returns a promise which resolves.
  acceptReceivedRequest(chatroom) {
    return this.#fetchAdvanced(this.#acceptReceivedRequestURL(chatroom), {
        method: 'PUT',
      }).then((responseJSON) => {
        let responseChatroomBO = ChatroomBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
        resolve(responseChatroomBO);
        })
      })
    }

  //Returns a promise which resolves to an array of a ChatroomBO. Deletes a chatroom by id.
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

  //Returns a promise which resolves to an Array of chatroomBOs. Deletes a sent request.
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

  //Returns a promise which resolves to an Array of chatroomBOs. Deletes a received request.
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

  //Adds a person to a group and returns the promise which resolves to an Array of the updated GroupBO Object.
  addPersonToGroup(group, person) {
    return this.#fetchAdvanced(this.#addPersonToGroupURL(group, person), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(group, person)
    }).then((responseJSON) => {
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
        })
    })
  }

  //Returns a promise which resolves to an Array of MembershipBOs. Deletes the own membership in a group.
  leaveGroup(group) {
    return this.#fetchAdvanced(this.#leaveAGroupURL(group), {
      method: 'DELETE'
      }).then((responseJSON) => {
      let responseGroupBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      })
    })
  }

  //Returns a promise which resolves to an Array of MembershipBOs.
  getAllMembershipGroupRequests(group) {
    return this.#fetchAdvanced(this.#getAllMembershipGroupRequestsURL(group)).then((responseJSON) => {
        let groupBOs = MembershipBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(groupBOs);
        })
      })
    }

  //Returns a promise which resolves to an Array of MembershipBOs. Sends a membership request to a group.
  sendMembershipRequest(group) {
    return this.#fetchAdvanced(this.#sendMembershipRequestURL(group), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify()
    }).then((responseJSON) => {
      let responseGroupBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
        })
    })
  }

  //Returns a promise which resolves to an Array of membershipBOs.Accepts a request to join the group.
  acceptMembershipRequest(membership) {
    return this.#fetchAdvanced(this.#acceptMembershipRequestURL(membership), {
      method: 'PUT'
      }).then((responseJSON) => {
      let responseMembershipBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseMembershipBO);
      })
    })
  }

  //Returns a promise which resolves to an Array of GroupBOs. Reject a membership request of a person.
  rejectMembershipRequest(group, person) {
    return this.#fetchAdvanced(this.#rejectMembershipRequestURL(group, person), {
      method: 'DELETE'
      }).then((responseJSON) => {
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      })
    })
  }

  //Returns a promise which resolves to an Array of MessageBOs. Gets all messages by thread_id.
  getMessages(is_singlechat, thread_id) {
    return this.#fetchAdvanced(this.#getMessagesURL(is_singlechat, thread_id))
     .then((responseJSON) => {
       let messageBOs = MessageBO.fromJSON(responseJSON);
       return new Promise(function(resolve){
         resolve(messageBOs);
       })
    })
  }

  //Creates a message and returns a promise which resolves to an Array of a new MessageBO Object. 
  createMessage(is_singlechat, thread_id, person, content) {
    return this.#fetchAdvanced(this.#createMessageURL(is_singlechat, thread_id, person, content), {
      method: 'POST',
    }).then((responseJSON) => {
      let responseMessageBO = MessageBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responseMessageBO);
        })
    })
  }

  //Returns a promise which resolves to an Array of GroupBOs. Returns all matched groups.
  matchGroups() {
  return this.#fetchAdvanced(this.#matchGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(groupBOs);
    })
  })
}
}

