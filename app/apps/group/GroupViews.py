from app.configs.base import api
from .GroupMarshalling import group_marshalling
from .GroupBO import GroupObject
from .GroupAdministration import GroupAdministration
from app.apps.membership.MembershipAdministration import MembershipAdministration
from app.apps.core.auth import AuthView


namespace = api.namespace(
    "/group",
    description="Namespace for group APIs."
)


@namespace.route("/<string:groupname>/<string:groupinfo>")
class CreateGroupAPI(AuthView):
    """API for creating groups."""
    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def post(self, groupname, groupinfo) -> dict:
        """Create group Endpoint."""
        group = GroupObject(
            groupname=groupname,
            info=groupinfo
        )
        group = GroupAdministration.insert_group(group=group)
        MembershipAdministration.insert_membership(learning_group=group.id_, person=self.person.id_)
        return group


@namespace.route("/<int:group>")
class GroupAPI(AuthView):
    """API for returning and deleting a group."""
    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def get(self, group: int) -> dict:
        """Get a group."""
        Group = GroupAdministration.get_by_groupID(learning_group=group)
        return Group

    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def delete(self, group: int) -> dict:
        """Delete Group Endpoint."""
        Group = GroupAdministration.delete_group(learning_group=group)
        return Group


@namespace.route("/")
class AllGroupAPI(AuthView):
    """API getting all groups."""
    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def get(self) -> dict:
        """Get All Groups"""
        groupList = GroupAdministration.get_all_groups(person=self.person.id_)
        return groupList
