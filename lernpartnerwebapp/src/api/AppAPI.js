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
  #searchProfileURL = (firstname, lastname) => `${this.#AppServerBaseURL}/profile/${firstname || lastname}`;
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
  //#updateGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#deleteGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#searchGroupURL = (id) => `${this.#AppServerBaseURL}/groups/${id}`;
  //#matchGroupURL = (id) => `${this.#AppServerBaseURL}/group/${id}`;


  //Membership related

  #getMembersOfaGroupURL = (group) => `${this.#AppServerBaseURL}/membership/group/${group}`;              //Gibt alle Member einer Gruppe zurück
  #addPersonToGroupURL = (group, person) => `${this.#AppServerBaseURL}/membership/group/${group}/${person}`;                //Fügt eine Person einer Gruppe hinzu
  #leaveAGroupURL = (group) => `${this.#AppServerBaseURL}/membership/Membershiprequest/${group}`;                     //Verlassen einer Gruppe
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

  #fetchAdvanced = (url,init) => fetch(url,{credentials: 'include', ...init})
  .then(res => {
      if (!res.ok){
          throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
  })

  getPersonId() {
       return this.#fetchAdvanced(this.#getPersonIdURL()).then((responseJSON) => {
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

  getPotentialChats(){
    return this.#fetchAdvanced(this.#getPotentialChatsURL()).then((responseJSON) => {
       let personBOs = PersonBO.fromJSON(responseJSON);
       return new Promise(function (resolve) {
         resolve(personBOs);
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

  getGroups(){
    return this.#fetchAdvanced(this.#getGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
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
 
  getGroupsOfaPerson() {
    return this.#fetchAdvanced(this.#getGroupsOfPersonURL()).then((responseJSON) => {
        let groupBOs = GroupBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(groupBOs);
       })
   })
}

	getPotentialPersonsForGroup(id) {
  	return this.#fetchAdvanced(this.#getPotentialPersonForGroupURL(id))
    .then((responseJSON) => {
        let personBOs = PersonBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
          resolve(personBOs);
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

  sendRequest(receiver){
    return this.#fetchAdvanced(this.#sendSingleChatRequestURL(receiver),{
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

  sendRequest(receiver) {
    return this.#fetchAdvanced(this.#sendSingleChatRequestURL(receiver), {
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

  getSingleChat(chatroom) {
    return this.#fetchAdvanced(this.#getSingleChatByIdURL(chatroom))
      .then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function(resolve){
         resolve(chatroomBOs);
        })
      })
    }

  getAllSingleChats(person) {
    return this.#fetchAdvanced(this.#getAllSingleChatsByPersonIdURL(person)).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
        })
      })
    }

  getAllReceivedRequests(person) {
    return this.#fetchAdvanced(this.#getAllReceivedRequestsURL(person)).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
        })
      })
    }

  getAllSentRequests(person) {
    return this.#fetchAdvanced(this.#getAllSentRequestsURL(person)).then((responseJSON) => {
        let chatroomBOs = ChatroomBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(chatroomBOs);
        })
      })
    }

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

  getMembersOfGroup(group) {
    return this.#fetchAdvanced(this.#getMembersOfaGroupURL(group))
     .then((responseJSON) => {
       let groupBOs = GroupBO.fromJSON(responseJSON);
       return new Promise(function(resolve){
         resolve(groupBOs);
       })
    })
  }

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

  leaveGroup(group) {
    return this.#fetchAdvanced(this.#leaveAGroupURL(group), {
      method: 'DELETE'
      }).then((responseJSON) => {
      let responseGroupBO = GroupBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      })
    })
  }

  getAllMembershipGroupRequests(group) {
    return this.#fetchAdvanced(this.#getAllMembershipGroupRequestsURL(group)).then((responseJSON) => {
        let groupBOs = MembershipBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(groupBOs);
        })
      })
    }

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

  acceptMembershipRequest(membership) {
    return this.#fetchAdvanced(this.#acceptMembershipRequestURL(membership), {
      method: 'PUT'
      }).then((responseJSON) => {
      let responseGroupBO = MembershipBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseGroupBO);
      })
    })
  }

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

  getMessages(is_singlechat, thread_id) {
    return this.#fetchAdvanced(this.#getMessagesURL(is_singlechat, thread_id))
     .then((responseJSON) => {
       let messageBOs = MessageBO.fromJSON(responseJSON);
       return new Promise(function(resolve){
         resolve(messageBOs);
       })
    })
  }

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



matchGroups() {
  return this.#fetchAdvanced(this.#matchGroupsURL()).then((responseJSON) => {
      let groupBOs = GroupBO.fromJSON(responseJSON);
    return new Promise(function (resolve) {
      resolve(groupBOs);
    })
  })
}
}

