import BusinessObject from './BusinessObject';

/**
 * Represents a person.
 */
export default class RequestBO extends BusinessObject {

  /**
   * Constructs a PersonBO object with a given firstname, lastname, IsAccepted and Is_Open)
   * 
   * @param {Boolean} aIs_Accepted - the IsAccepted of this PersonBO.
   * @param {Boolean} aIs_Open - the Is_Open of this PersonBO.
   * @param {Integer} aSender - the Is_Open of this PersonBO.
   * @param {Integer} aReceiver - the Is_Open of this PersonBO.
   */
  constructor(aIs_Accepted, aIs_Open, aSender, aReceiver) {
    super();
    this.is_accepted = aIs_Accepted;
    this.is_open = aIs_Open;
    this.sender = aSender;
    this.receiver = aReceiver
  }
  /**
   * Sets a new IsAccepted.
   * 
   * @param {String} aIs_Accepted - the new IsAccepted of this PersonBO.
   */
   setIsAccepted(aIsAccepted) {
    this.is_accepted = aIsAccepted;
  }

  /**
   * Gets the IsAccepted.
   */
  getIsAccepted() {
    return this.is_accepted;
  }

  /**
   * Sets a new Is_Open.
   * 
   * @param {Integer} aIs_Open - the new Is_Open of this PersonBO.
   */
   setIs_Open(aIs_Open) {
    this.is_open = aIs_Open;
  }

  /**
   * Gets the Is_Open.
   */
  getIs_Open() {
    return this.is_open;
  }

  setSender(aSender) {
    this.sender = aSender;
  }

  /**
   * Gets the Is_Open.
   */
  getSender() {
    return this.sender;
  }

  setReceiver(aReceiver) {
    this.receiver = aReceiver;
  }

  /**
   * Gets the Is_Open.
   */
  getReceiver() {
    return this.receiver;
  }

  /** 
   * Returns an Array of PersonBOs from a given JSON structure.
   */
   static fromJSON(request) {
    let r = Object.setPrototypeOf(request, RequestBO.prototype);
    return r;
  }
}