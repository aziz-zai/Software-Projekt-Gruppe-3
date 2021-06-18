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
  static fromJSON(groups) {
    let result = [];

    if (Array.isArray(groups)) {
      groups.forEach((g) => {
        Object.setPrototypeOf(g, MembershipBO.prototype);
        result.push(g);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let g = groups;
      Object.setPrototypeOf(g, MembershipBO.prototype);
      result.push(g);
    }

    return result;
  }
}