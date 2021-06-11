from flask_restx import Resource
from app.configs.base import api
from .PersonMarshalling import person_marshalling
from .PersonBO import PersonObject
from .PersonAdministration import PersonAdministration
from app.apps.profile.ProfileAdministration import ProfileAdministration
from app.apps.core.SecurityDecorator import secured


namespace = api.namespace(
    "/person",
    description="Namespace for person APIs."
)


@namespace.route("/")
class PersonAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    @secured
    def post(self) -> dict:
        """Create Person Endpoint."""
        person = PersonObject(**api.payload)
        person = PersonAdministration.insert_person(person=person)
        return person

@namespace.route("/<int:google_user_id>")
class PersonAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    @secured
    def get(self, google_user_id) -> dict:
        """Create Person Endpoint."""
        pers = PersonAdministration.get_person_by_google_user_id(google_user_id)
        return pers