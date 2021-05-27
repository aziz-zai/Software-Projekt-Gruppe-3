from flask_restx import Resource
from app.configs.base import api
from .ProfileMarshalling import profile_marshalling
from .ProfileBO import ProfileObject
from .ProfileAdministration import ProfileManager
from app.apps.person.PersonAdministration import PersonManager


namespace = api.namespace(
    "/profile",
    description="Namespace for profile APIs."
)


@namespace.route("/")
class ProfileAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(profile_marshalling, code=201)
    @api.expect(profile_marshalling)
    def post(self, personID: int) -> dict:
        """Create Profile Endpoint."""
        person = PersonManager.get_person_by_id(personID)
        profile = ProfileObject(**api.payload)
        profile = ProfileManager.insert_profile(profile=profile, person=person)
        return profile
