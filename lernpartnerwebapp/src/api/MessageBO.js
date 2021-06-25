import BusinessObject from './BusinessObject';

export default class MessageBO extends BusinessObject {

  constructor(aContent, aSender, aThread_id, aIs_Singlechat, aTimestamp) {
    super();
    this.content = aContent;
    this.sender = aSender;
    this.thread_id = aThread_id;
    this.is_singlechat = aIs_Singlechat;
    this.timestamp = aTimestamp;
  }

  setFirstName(aContent) {
    this.content = aContent;
  }

  getContent() {
    return this.content;
  }

  setLastName(aSender) {
    this.sender = aSender;
  }

  getConversationID() {
    return this.sender;
  }

  setThread_id(aThread_id) {
    this.thread_id = aThread_id;
  }

  getThread_id() {
    return this.thread_id;
  }

  setTimestamp() {
    this.timestamp = aTimestamp;
  }

  getTimestamp() {
    return this.timestamp;
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