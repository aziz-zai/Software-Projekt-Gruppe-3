from flask_restx import Resource
from app.configs.base import api
from .GroupMarshalling import group_marshalling
from .GroupBO import GroupObject
from .GroupAdministration import GroupAdministration
from app.apps.person.PersonAdministration import PersonAdministration
from app.apps.profile.ProfileAdministration import ProfileAdministration
from app.apps.membership.MembershipAdministration import MembershipAdministration
namespace = api.namespace(
    "/group",
    description="Namespace for group APIs."
)


@namespace.route("/<int:person>")
class GroupAPI(Resource):
    """Basic API for group."""

    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def post(self, person) -> dict:
        """Create group Endpoint."""
        group = GroupObject(**api.payload)
        pers = PersonAdministration.get_person_by_id(person)
        profile = ProfileAdministration.get_profile_of_person(pers)
        group = GroupAdministration.insert_group(group=group) 
        MembershipAdministration.insert_membership(learning_group=group, profile=profile)
        return group
