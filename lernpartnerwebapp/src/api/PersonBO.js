import BusinessObject from './BusinessObject';

export default class PersonBO extends BusinessObject {

  constructor(aEmail, aGoogle_user_id) {
    super();
    this.email = aEmail;
    this.google_user_id = aGoogle_user_id;
  }

  setEmail(aEmail) {
    this.email = aEmail;
  }

  getEmail() {
    return this.email;
  }

  setGoogle_user_id(aGoogle_user_id) {
    this.google_user_id = aGoogle_user_id;
  }

  getGoogle_user_id() {
    return this.google_user_id;
  }

  static fromJSON(person) {
    let result = [];

    if (Array.isArray(person)) {
      person.forEach((p) => {
        Object.setPrototypeOf(p, PersonBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = person;
      Object.setPrototypeOf(p, PersonBO.prototype);
      result.push(p);
    }
    return result;
  }
}