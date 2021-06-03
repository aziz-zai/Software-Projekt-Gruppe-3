from flask_restx import Resource
from app.configs.base import api
from .ProfileMarshalling import profile_marshalling
from .ProfileBO import ProfileObject
from .ProfileAdministration import ProfileAdministration
from app.apps.person.PersonAdministration import PersonAdministration


namespace = api.namespace(
    "/profile",
    description="Namespace for profile APIs."
)



@namespace.route("/")
class AllProfilesAPI(Resource):
        def get(self) -> dict:
            profiles = ProfileAdministration.get_all_profiles()
            return profiles

@namespace.route("/<int:personID>")
class ProfileAPI(Resource):
    """Basic API for profile."""
    @namespace.marshal_with(profile_marshalling)
    def get(self,personID: int):
        person = PersonAdministration.get_person_by_id(personID)
        profile = ProfileAdministration.get_profile_of_person(person)
        return profile



    @api.marshal_with(profile_marshalling, code=201)
    @api.expect(profile_marshalling)
    def post(self) -> dict:
        """Create Profile Endpoint."""
        profile = ProfileObject(**api.payload)
        profile = ProfileAdministration.insert_profile(profile=profile)
        return profile
