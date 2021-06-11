import BusinessObject from './BusinessObject';

/**
 */
export default class MessageBO extends BusinessObject {

  /**
   * Constructs a MessageBO object with a given Content and ConversationID.
   * 
   * @param {String} aContent - the content of this MessageBO
   * @param {String} aConversationID - the conversationID of this MessageBO
   */
  constructor(aContent, aConversationID) {
    super();
    this.content = aContent;
    this.conversation_ID = aConversationID;
  }

  /**
   * Sets a new content.
   * 
   * @param {String} aContent - the new content of this MessageBO.
   */
  setFirstName(aContent) {
    this.content = aContent;
  }

  /**
   * Gets the content.
   */
  getContent() {
    return this.content;
  }

  /**
   * Sets a new conversationID.
   * 
   * @param {*} aConversationID - the new conversationID of this MessageBO
   */
  setLastName(aConversationID) {
    this.conversation_ID = aConversationID;
  }

  /**
   * Gets the conversationID.
   */
  getConversationID() {
    return this.conversation_ID;
  }

  /** 
   * Returns an Array of MessageBOs from a given JSON structure.
   */
  static fromJSON(messages) {
    let result = [];

    if (Array.isArray(messages)) {
        messages.forEach((m) => {
        Object.setPrototypeOf(m, MessageBO.prototype);
        result.push(m);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let m = messages;
      Object.setPrototypeOf(m, MessageBO.prototype);
      result.push(m);
    }

    return result;
  }
}