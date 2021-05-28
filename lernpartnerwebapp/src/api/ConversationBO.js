import BusinessObject from './BusinessObject';

/**
 */
export default class ConversationBO extends BusinessObject {

  /**
   * Constructs a ConversationBO object with a given conversationstatus, a groupID and personID
   * 
   * @param {Boolean} aConversationstatus - the conversationstatus of this ConversationBO.
   * @param {Integer} aGroupID - the groupID of this ConversationBO.
   * @param {Integer} aPersonID  - the personID of this ConversationBO.
   */
  constructor(aConversationstatus, aGroupID, aPersonID) {
    super();
    this.conversation_status = aConversationstatus;
    this.group_ID = aGroupID;
    this.person_ID = aPersonID;
  }

  /**
   * Sets a new Conversationstatus.
   * 
   * @param {String} aConversationstatus - the new Conversationstatus of this ConversationBO.
   */
  setConversationStatus(aConversationstatus) {
    this.conversation_status = aConversationstatus;
  }

  /**
   * Gets the Conversationstatus.
   */
  getConversationStatus() {
    return this.conversation_status;
  }

  /**
   * Sets a new GroupID.
   * 
   * @param {*} aGroupID - the new GroupID of this ConversationBO.
   */
  setGroupID(aGroupID) {
    this.group_ID = aGroupID;
  }

  /**
   * Gets the GroupID.
   */
  getGroupID() {
    return this.group_ID;
  }

  /**
   * Sets a new PersonID.
   * 
   * @param {*} aPersonID - the new PersonID of this ConversationBO.
   */
  setPersonID(aPersonID) {
    this.person_ID = aPersonID;
  }

  /**
   * Gets the PersonID.
   */
  getPersonID() {
    return this.person_ID;
  }

  /** 
   * Returns an Array of ConversationBOs from a given JSON structure.
   */
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