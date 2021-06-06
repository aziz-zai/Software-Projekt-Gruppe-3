import BusinessObject from './BusinessObject';

/**
 * Represents a person.
 */
export default class PersonBO extends BusinessObject {

  /**
   * Constructs a PersonBO object with a given firstname, lastname, email and google_user_id)
   * 
   * @param {String} aEmail - the email of this PersonBO.
   * @param {Integer} aGoogle_user_id - the google_user_id of this PersonBO.
   */
  constructor(aEmail, aGoogle_user_id) {
    super();
    this.email = aEmail;
    this.google_user_id = aGoogle_user_id;
  }
  /**
   * Sets a new email.
   * 
   * @param {String} aFirstname - the new email of this PersonBO.
   */
   setEmail(aEmail) {
    this.email = aEmail;
  }

  /**
   * Gets the email.
   */
  getEmail() {
    return this.email;
  }

  /**
   * Sets a new google_user_id.
   * 
   * @param {Integer} aGoogle_user_id - the new google_user_id of this PersonBO.
   */
   setGoogle_user_id(aGoogle_user_id) {
    this.google_user_id = aGoogle_user_id;
  }

  /**
   * Gets the google_user_id.
   */
  getGoogle_user_id() {
    return this.google_user_id;
  }

  /** 
   * Returns an Array of PersonBOs from a given JSON structure.
   */
  static fromJSON(persons) {
    let result = [];

    if (Array.isArray(persons)) {
      persons.forEach((p) => {
        Object.setPrototypeOf(p, PersonBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = persons;
      Object.setPrototypeOf(p, PersonBO.prototype);
      result.push(p);
    }

    return result;
  }
}