import BusinessObject from './BusinessObject';

/**
 */
export default class GroupBO extends BusinessObject {

  /**
   * Constructs a GroupBO object with a given groupname.
   * 
   * @param {String} aGroupname - the groupname of this GroupBO.
   */
  constructor(aGroupname, aInfo) {
    super();
    this.groupname = aGroupname;
    this.info = aInfo
  }

  /**
   * Sets a new groupname.
   * 
   * @param {String} aGroupname - the new groupname of this GroupBO.
   */
  setGroupName(aGroupname) {
    this.groupname = aGroupname;
  }

  /**
   * Gets the groupname.
   */
  getGroupName() {
    return this.groupname;
  }

  setInfo(aInfo) {
    this.info = aInfo;
  }

  /**
   * Gets the groupname.
   */
  getInfo() {
    return this.info;
  }

  /** 
   * Returns an Array of GroupBOs from a given JSON structure.
   */
  static fromJSON(groups) {
    let result = [];

    if (Array.isArray(groups)) {
      groups.forEach((g) => {
        Object.setPrototypeOf(g, GroupBO.prototype);
        result.push(g);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let g = groups;
      Object.setPrototypeOf(g, GroupBO.prototype);
      result.push(g);
    }

    return result;
  }
}