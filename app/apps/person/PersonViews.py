from flask_restx import Resource
from app.configs.base import api
from .PersonMarshalling import person_marshalling
from .PersonBO import PersonObject
from .PersonAdministration import PersonAdministration


namespace = api.namespace(
    "/person",
    description="Namespace for person APIs."
)


@namespace.route("/")
class PersonAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    def post(self) -> dict:
        """Create Person Endpoint."""
        person = PersonObject(**api.payload)
        person = PersonAdministration.insert_person(person=person)
        return person
