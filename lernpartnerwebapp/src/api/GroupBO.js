import BusinessObject from './BusinessObject';

/**
 */
export default class GroupBO extends BusinessObject {

  /**
   * Constructs a GroupBO object with a given groupname.
   * 
   * @param {String} aGroupname - the groupname of this GroupBO.
   */
  constructor(aGroupname) {
    super();
    this.group_name = aGroupname;
    this.group_name = aGroupname;
  }

  /**
   * Sets a new groupname.
   * 
   * @param {String} aGroupname - the new groupname of this GroupBO.
   */
  setGroupName(aGroupname) {
    this.group_name = aGroupname;
  }

  /**
   * Gets the groupname.
   */
  getGroupName() {
    return this.group_name;
  }

  /** 
   * Returns an Array of GroupBOs from a given JSON structure.
   */
  static fromJSON(groups) {
    let result = [];

    if (Array.isArray(groups)) {
      groups.forEach((g) => {
        Object.setPrototypeOf(c, GroupBO.prototype);
        result.push(g);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let g = groups;
      Object.setPrototypeOf(c, GroupBO.prototype);
      result.push(g);
    }

    return result;
  }
}