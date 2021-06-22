import BusinessObject from './BusinessObject';

export default class ProfileBO extends BusinessObject {

  constructor(aFirstname, aLastname, aPersonID, aInterests, aType_, aOnline, aFrequency, aExpertise, aExtroversion) {
    super();
    this.firstname = aFirstname;
    this.lastname=aLastname;
    this.person = aPersonID;
    this.interests = aInterests;
    this.type_ = aType_;
    this.online = aOnline;
    this.frequency = aFrequency;
    this.expertise = aExpertise;
    this.extroversion = aExtroversion;
  }

  setFirstName(aFirstname) {
    this.firstname = aFirstname;
  }

  getFirstName() {
    return this.firstname;
  }

  setLastName(aLastname) {
    this.lastname = aLastname;
  }

  getLastName() {
    return this.lastname;
  }

  setPersonID(aPersonID) {
    this.person = aPersonID;
  }

  getPersonID() {
    return this.person;
  }

  setInterests(aInterests) {
    this.interests = aInterests;
  }

  getInterests() {
    return this.interests;
  }

  setType(aType_) {
    this.type_ = aType_;
  }

  getType() {
    return this.type_;
  }

  setOnline(aOnline) {
    this.online = aOnline;
  }

  getOnline() {
    return this.online;
  }

  setFrequency(aFrequency) {
    this.frequency = aFrequency;
  }

  getFrequency() {
    return this.frequency;
  }

  setExpertise(aExpertise) {
    this.expertise = aExpertise;
  }

  getExpertise() {
    return this.expertise;
  } 

  setExtroversion(aExtroversion) {
    this.extroversion = aExtroversion;
  }

  getExtroversion() {
    return this.extroversion;
  }

  static fromJSON(profiles) {
    let result = [];

    if (Array.isArray(profiles)) {
      profiles.forEach((pr) => {
        Object.setPrototypeOf(pr, ProfileBO.prototype);
        result.push(pr);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let pr = profiles;
      Object.setPrototypeOf(pr, ProfileBO.prototype);
      result.push(pr);
    }
    return result;
  }
}