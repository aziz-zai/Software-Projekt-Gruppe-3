import PersonBO from './PersonBO';
import ProfileBO from './ProfileBO';


export default class AppAPI {

    static #api = null;

    #AppServerBaseURL = '/lernpartnerwebapp/http-fake-backend/response-files'

    #getPersonsURL = () => `${this.#AppServerBaseURL}/persons`;
    #addPersonURL = () => `${this.#AppServerBaseURL}/persons`;
    #getPersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
    #updatePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
    #deletePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
    #searchPersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;

    static getAPI() {
        if (this.#api == null){
            this.#api = new AppAPI();
        }
        return this.#api;
    }

    #fetchedAdvanced = (url, init) =>(url, init)

    .then(res => {
        if (!res.ok){
            throw Error(`${res.status} ${statusText}`);
        }
        return res.json();
    })
    
    getPersons() {
        return this.fetchedAdvanced(this.#getPersonsURL()).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(personBOs);
            })
        })
    }

    getPerson(personID) {
        return this.#fetchedAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            return new Promise(function(resolve){
                resolve(responsePersonBO);
            })
        })
    }
    addPerson(personBO) {
        return this.#fetchAdvanced(this.#addPersonURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(PersonBO)
        }).then((responseJSON) => {
          // We always get an array of CustomerBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }


}