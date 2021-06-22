import BusinessObject from './BusinessObject';

export default class MessageBO extends BusinessObject {

  constructor(aContent, aConversationID) {
    super();
    this.content = aContent;
    this.conversation_ID = aConversationID;
  }

  setFirstName(aContent) {
    this.content = aContent;
  }

  getContent() {
    return this.content;
  }

  setLastName(aConversationID) {
    this.conversation_ID = aConversationID;
  }

  getConversationID() {
    return this.conversation_ID;
  }

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