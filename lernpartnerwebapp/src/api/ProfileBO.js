import BusinessObject from './BusinessObject';

/**
 * Represents a profile.
 */
export default class ProfileBO extends BusinessObject {

  /**
   * Constructs a ProfileBO object with given personID, interests, type_, online, frequency, expertise, extroversion)
   * 
   * @param {Integer} aPersonID - the personID of this ProfileBO.
   * @param {String} aInterests - the interests of this ProfileBO.
   * @param {String} aType_ - the type_ of this ProfileBO.
   * @param {Boolean} aOnline - the online/offline type of this ProfileBO.
   * @param {Integer} aFrequency - the frequency of this ProfileBO.
   * @param {String} aExpertise - the expertise of this ProfileBO.
   * @param {String} aExtroversion - the extroversion of this ProfileBO.


   */
  constructor(aPersonID, aInterests, aType_, aOnline, aFrequency, aExpertise, aExtroversion) {
    super();
    this.person = aPersonID;
    this.interests = aInterests;
    this.type_ = aType_;
    this.online = aOnline;
    this.frequency = aFrequency;
    this.expertise = aExpertise;
    this.extroversion = aExtroversion;
  }

  /**
   * Sets a new personID.
   * 
   * @param {Integer} aPersonID - the new personID of this ProfileBO.
   */
  setPersonID(aPersonID) {
    this.person = aPersonID;
  }

  /**
   * Gets the personID.
   */
  getPersonID() {
    return this.person;
  }

  /**
   * Sets new interests.
   * 
   * @param {*} aInterests - the new interests of this ProfileBO.
   */
  setInterests(aInterests) {
    this.interests = aInterests;
  }

  /**
   * Gets the interests.
   */
  getInterests() {
    return this.interests;
  }

  /**
   * Sets a new type.
   * 
   * @param {String} aType_ - the new type of this ProfileBO.
   */
   setType(aType_) {
    this.type_ = aType_;
  }

  /**
   * Gets the type.
   */
  getType() {
    return this.type_;
  }

  /**
   * Sets a new online.
   * 
   * @param {Boolean} aOnline - the new online of this ProfileBO.
   */
   setOnline(aOnline) {
    this.online = aOnline;
  }

  /**
   * Gets the online.
   */
  getOnline() {
    return this.online;
  }

  /**
   * Sets a new frequency.
   * 
   * @param {Integer} aFrequency - the new frequency of this ProfileBO.
   */
   setFrequency(aFrequency) {
    this.frequency = aFrequency;
  }

  /**
   * Gets the frequency.
   */
  getFrequency() {
    return this.frequency;
  }

  /**
   * Sets a new expertise.
   * 
   * @param {String} aExpertise - the new expertise of this ProfileBO.
   */
   setExpertise(aExpertise) {
    this.expertise = aExpertise;
  }

  /**
   * Gets the expertise.
   */
  getExpertise() {
    return this.expertise;
  } 

  /**
   * Sets a new extroversion.
   * 
   * @param {String} aExtroversion - the new type of this ProfileBO.
   */
   setExtroversion(aExtroversion) {
    this.extroversion = aExtroversion;
  }

  /**
   * Gets the extroversion.
   */
  getExtroversion() {
    return this.extroversion;
  }

  /** 
   * Returns an Array of ProfileBOs from a given JSON structure.
   */
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