from flask_restx import Resource
from app.configs.base import api
from .PersonMarshalling import person_marshalling
from .PersonBO import PersonObject
from .PersonAdministration import PersonAdministration
from app.apps.profile.ProfileAdministration import ProfileAdministration
from app.apps.core.auth import AuthView


namespace = api.namespace(
    "/person",
    description="Namespace for person APIs."
)


@namespace.route("/")
class PersonOperationAPI(AuthView):
    """Basic API for profile."""
    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    def post(self) -> dict:
        """Create Person Endpoint."""
        person = PersonObject(**api.payload)
        person = PersonAdministration.insert_person(person=self.person.id_)
        return person

    @api.marshal_with(person_marshalling, code=200)
    @api.expect(person_marshalling)
    def delete(self) -> dict:
        """Delete Person Endpoint."""
        PersonAdministration.delete_person(person=self.person.id_)
        return '', 200
@namespace.route("/<string:google_user_id>")
class PersonAPI(AuthView):
    """Basic API for profile."""
    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    def get(self, google_user_id) -> dict:
        """Get a person by google_user_id"""
        pers = PersonAdministration.get_person_by_google_user_id(google_user_id)
        return pers

@namespace.route("/group/<int:group>")
class PotentialGroupAPI(AuthView):
    """Basic API for profile."""
    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    def get(self, group: int) -> dict:
        """Get All Persons that are not requested for a groupmembership"""
        pers = PersonAdministration.get_potential_persons_for_group(learning_group=group)
        return pers


@namespace.route("/potential_singlechat")
class PotentialPersonAPI(AuthView):
    """Basic API for profile."""
    @api.marshal_with(person_marshalling, code=201)
    @api.expect(person_marshalling)
    def get(self) -> dict:
        """Get All Persons that are not already requested for a singlechat."""
        pers = PersonAdministration.get_potential_singlechat(person=self.person.id_)
        return pers
