import BusinessObject from './BusinessObject';

/**
 */
export default class MembershipBO extends BusinessObject {

  /**
   * Constructs a GroupBO object with a given groupname.
   * 
   * @param {String} aGroup
   * @param {String} aProfile - the groupname of this GroupBO.
   */
     
  constructor(aGroup, aProfile) {
    super();
    this.learning_group = aGroup;
    this.profile = aProfile
  }

  /**
   * Sets a new groupname.
   * 
   * @param {Integer} aGroup - the new groupname of this GroupBO.
   */
  setGroup(aGroup) {
    this.learning_group = aGroup;
  }

  /**
   * Gets the groupname.
   */
  getGroup() {
    return this.group;
  }

  /**
   * Sets a new profile.
   * 
   * @param {Integer} aProfile - the new groupname of this GroupBO.
   */
  setProfile(aProfile) {
    this.profile = aProfile;
  }

  /**
   * Gets the groupname.
   */
  getProfile() {
    return this.profile;
  }

  /** 
   * Returns an Array of GroupBOs from a given JSON structure.
   */
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