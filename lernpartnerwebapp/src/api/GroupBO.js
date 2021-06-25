import BusinessObject from './BusinessObject';

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

  setGroupName(aGroupname) {
    this.groupname = aGroupname;
  }

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
      groups.forEach((gr) => {
        Object.setPrototypeOf(gr, GroupBO.prototype);
        result.push(gr);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let gr = groups;
      Object.setPrototypeOf(gr, GroupBO.prototype);
      result.push(gr);
    }
    return result;

  }
}