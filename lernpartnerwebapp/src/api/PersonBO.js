import BusinessObject from './BusinessObject';


export default class CustomerBO extends BusinessObject{

    constructor(aFirstname, aSurname, aSemester){
        super();
        this.firstname = aFirstname;
        this.surname = aSurname;
        this.semester = aSemester;
    }

    setFirstname(aFirstname){
        this.firstname = aFirstname;
    }

    getFirstname(){
        return this.firstname;
    }

    setSurname(aSurname) {
        this.surname = aSurname;
    }

    getSurname() {
        return this.surname;
    }
    static fromJSON(persons) {
        let result = [];
    
        if (Array.isArray(persons)) {
          persons.forEach((c) => {
            Object.setPrototypeOf(c, PersonBO.prototype);
            result.push(c);
          })
        } else {
          // Es handelt sich offenbar um ein singuläres Objekt
          let p = persons;
          Object.setPrototypeOf(p, PersonBO.prototype);
          result.push(p);
        }
    
        return result;
      }
}