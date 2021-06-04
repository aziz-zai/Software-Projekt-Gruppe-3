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


@namespace.route("/<int:person>")
class ProfileAPI(Resource):
    """Basic API for profile."""
    @namespace.marshal_with(profile_marshalling)
    def get(self,person: int):
        pers = PersonAdministration.get_person_by_id(person)
        profile = ProfileAdministration.get_profile_of_person(pers)
        return profile

