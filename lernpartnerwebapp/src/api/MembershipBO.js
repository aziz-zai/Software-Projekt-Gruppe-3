import BusinessObject from './BusinessObject';


export default class MembershipBO extends BusinessObject {
     
  constructor(aLearning_group, aPerson, aIs_Open, aIs_Accepted, aTimestamp) {
    super();
    this.learning_group = aLearning_group;
    this.person = aPerson;
    this.is_open = aIs_Open
    this.is_accepted = aIs_Accepted
    this.timestamp = aTimestamp
  }

  setLearning_group(aLearning_group) {
    this.learning_group = aLearning_group;
  }

  getLearning_group() {
    return this.learning_group;
  }

  setPerson(aPerson) {
    this.person = aPerson;
  }

  getPerson() {
    return this.person;
  }

  setIs_Open(aIs_Open) {
    this.is_open = aIs_Open;
  }

  getIs_Open() {
    return this.this.is_open;
  }

  setIs_Accepted(aIs_Accepted) {
    this.is_accepted = aIs_Accepted;
  }

  getIs_Accepted() {
    return this.is_accepted;
  }

  setTimestamp(aTimestamp) {
    this.timestamp = aTimestamp;
  }

  getTimestamp() {
    return this.timestamp;
  }

   static fromJSON(membership) {
    let result = [];

    if (Array.isArray(membership)) {
      membership.forEach((me) => {
        Object.setPrototypeOf(me, MembershipBO.prototype);
        result.push(me);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let me = membership;
      Object.setPrototypeOf(me, MembershipBO.prototype);
      result.push(me);
    }

    return result;
  }
}