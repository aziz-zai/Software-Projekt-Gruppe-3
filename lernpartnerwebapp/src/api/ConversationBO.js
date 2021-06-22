import BusinessObject from './BusinessObject';
export default class ConversationBO extends BusinessObject {

  constructor(aConversationstatus, aGroupID, aPersonID) {
    super();
    this.conversation_status = aConversationstatus;
    this.group_ID = aGroupID;
    this.person_ID = aPersonID;
  }

  setConversationStatus(aConversationstatus) {
    this.conversation_status = aConversationstatus;
  }

  getConversationStatus() {
    return this.conversation_status;
  }

  setGroupID(aGroupID) {
    this.group_ID = aGroupID;
  }

  getGroupID() {
    return this.group_ID;
  }

  setPersonID(aPersonID) {
    this.person_ID = aPersonID;
  }

  getPersonID() {
    return this.person_ID;
  }

  static fromJSON(conversations) {
    let result = [];

    if (Array.isArray(conversations)) {
      conversations.forEach((c) => {
        Object.setPrototypeOf(c, ConversationBO.prototype);
        result.push(c);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let c = conversations;
      Object.setPrototypeOf(c, ConversationBO.prototype);
      result.push(c);
    }
    return result;
  }
}