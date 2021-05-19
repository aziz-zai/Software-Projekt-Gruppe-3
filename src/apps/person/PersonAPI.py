from flask_restx import Resource
from src.configs.base import api
from .marshalling import person_marshalling
from .business_object import Person
from .mapper import PersonMapper
from .administration import Administration


namespace = api.namespace(
    "/person",
    description="Namespace for person APIs."
)

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class PersonAPI(Resource):
    """Basic API for person."""
    
    @api.marshal_with(person_marshalling)
    def get(self):
        persons = Administration.get_all_persons()
        return persons

    @api.marshal_with(person_marshalling, code=200)
    @api.expect(person_marshalling)
    @api.re
    def post(self) -> dict:
        """Create Person Endpoint."""
        
        #person = PersonMapper.insert(object=person)
        adm = Administration()
        person = Person(api.payload)

        if person is not None:
            p = adm.create_person(
                person.set_firstname(),
                person.set_lastname(),
                person.set_semester()),
            return p, 200

        else:

            return "", 500