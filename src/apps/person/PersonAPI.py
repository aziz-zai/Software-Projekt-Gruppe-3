from flask_restx import Resource
from flask_restx import fields
from src.configs.base import api
from .PersonBO import Person
from .PersonMapper import PersonMapper
from .PersonAdmin import PersonAdmin
from src.main import namespace




person_marshalling = api.inherit('Person', {
    'firstname': fields.String(attribute='firstname', description='Firstname of a Person', required=True),
    'lastname': fields.String(attribute='lastname', description='Lastname of a Person', required=True),
})



@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class PersonAPI(Resource):
    """Basic API for person."""
    
    @api.marshal_with(person_marshalling)
    def get(self):
        persons = PersonAdmin.get_all_persons()
        return persons

    @api.marshal_with(person_marshalling, code=200)
    @api.expect(person_marshalling)
    @api.response(500, "Bei Serverseitigen Fehler")
    def post(self) -> dict:
        """Create Person Endpoint."""
        
        #person = PersonMapper.insert(object=person)
        adm = PersonAdmin()
        person = Person(api.payload)

        if person is not None:
            p = adm.create_person(
                person.set_firstname(),
                person.set_lastname(),)

            return p, 200

        else:

            return "", 500