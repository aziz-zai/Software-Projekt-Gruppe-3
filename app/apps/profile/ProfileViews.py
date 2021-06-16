from app.apps.core.SecurityDecorator import secured
from flask_restx import Resource
from app.configs.base import api
from .ProfileMarshalling import profile_marshalling
from .ProfileBO import ProfileObject
from .ProfileAdministration import ProfileAdministration
from app.apps.person.PersonAdministration import PersonAdministration
from app.apps.core.SecurityDecorator import secured

namespace = api.namespace(
    "/profile",
    description="Namespace for profile APIs."
)


@namespace.route("/")
class AllProfilesOperation(Resource):
    @namespace.marshal_with(profile_marshalling)
    @secured
    def get(self):
        profile_list = ProfileAdministration.get_all_profiles()
        return profile_list

@namespace.route("/<int:person>")
class ProfileAPI(Resource):
    """Basic API for profile."""
    @namespace.marshal_with(profile_marshalling)
    @secured
    def get(self,person: int):
        pers = PersonAdministration.get_person_by_id(person)
        profile = ProfileAdministration.get_profile_of_person(pers)
        return profile
    
    @namespace.marshal_with(profile_marshalling)
    @secured
    def put(self, person: int) -> dict:
        profile = ProfileObject(**api.payload)
        profile.person = person
        profile.id_=person
        profile = ProfileAdministration.update_profile(profile=profile)
        return profile

