from flask_restx import Resource
from app.configs.base import api
from .PersonMarshalling import person_marshalling
from .PersonBO import PersonObject
from .PersonAdministration import PersonManager


namespace = api.namespace(
    "/person",
    description="Namespace for person APIs."
)


@namespace.route("/")
class ProfileAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    def post(self) -> dict:
        """Create Person Endpoint."""
        person = PersonObject(**api.payload)
        person = PersonManager.insert_profile(person=person)
        return person
