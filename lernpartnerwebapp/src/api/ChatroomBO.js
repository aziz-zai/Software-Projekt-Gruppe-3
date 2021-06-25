import BusinessObject from './BusinessObject';

export default class ChatroomBO extends BusinessObject {

  constructor(aIs_Accepted, aIs_Open, aSender, aReceiver, aTimestamp) {
    super();
    this.is_accepted = aIs_Accepted;
    this.is_open = aIs_Open;
    this.sender = aSender;
    this.receiver = aReceiver;
    this.timestamp = aTimestamp;
  }

  setIs_Accepted(aIs_Accepted) {
    this.is_accepted = aIs_Accepted;
  }

  getIs_Accepted() {
    return this.is_accepted;
  }

  setIs_Open(aIs_Open) {
    this.is_open = aIs_Open;
  }

  getIs_Open() {
    return this.is_open;
  }

  setSender(aSender) {
    this.sender = aSender;
  }

  getSender() {
    return this.sender;
  }

  setReceiver(aReceiver) {
    this.receiver = aReceiver;
  }

  getReceiver() {
    return this.receiver;
  }

  setTimestamp(aTimestamp) {
    this.timestamp = aTimestamp;
  }

  getTimestamp() {
    return this.timestamp;
  }
  

  static fromJSON(chatroom) {
    let result = [];

    if (Array.isArray(chatroom)) {
        chatroom.forEach((ch) => {
        Object.setPrototypeOf(ch, ChatroomBO.prototype);
        result.push(ch);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let ch = chatroom;
      Object.setPrototypeOf(ch, ChatroomBO.prototype);
      result.push(ch);
    }
    return result;
  }
}