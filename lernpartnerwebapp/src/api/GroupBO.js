import BusinessObject from './BusinessObject';

export default class GroupBO extends BusinessObject {

  constructor(aGroupname) {
    super();
    this.group_name = aGroupname;
  }

  setGroupName(aGroupname) {
    this.group_name = aGroupname;
  }

  getGroupName() {
    return this.group_name;
  }

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