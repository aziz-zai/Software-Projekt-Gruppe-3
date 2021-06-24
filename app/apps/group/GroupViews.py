from flask_restx import Resource
from app.configs.base import api
from .GroupMarshalling import group_marshalling
from .GroupBO import GroupObject
from .GroupAdministration import GroupAdministration
from app.apps.person.PersonAdministration import PersonAdministration
from app.apps.profile.ProfileAdministration import ProfileAdministration
from app.apps.membership.MembershipAdministration import MembershipAdministration
from app.apps.chatroom.ChatRoomAdministration import ChatRoomAdministration

namespace = api.namespace(
    "/group",
    description="Namespace for group APIs."
)


@namespace.route("/<string:groupname>/<string:groupinfo>/<int:person>")
class CreateGroupAPI(Resource):
    """Basic API for group."""

    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def post(self, person, groupname, groupinfo) -> dict:
        """Create group Endpoint."""
        group = GroupObject(
            groupname=groupname,
            info=groupinfo
        )
        group = GroupAdministration.insert_group(group=group)
        MembershipAdministration.insert_membership(learning_group=group.id_, person=person)
        return group


@namespace.route("/<int:group>")
class GroupAPI(Resource):
    """Get a group."""
    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def get(self, group: int) -> dict:
        """Create Person Endpoint."""
        Group = GroupAdministration.get_by_groupID(learning_group=group)
        return Group

    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def delete(self, group: int) -> dict:
        """Create Person Endpoint."""
        Group = GroupAdministration.delete_group(learning_group=group)
        return Group


@namespace.route("/")
class AllGroupAPI(Resource):
    """Basic API for group."""

    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def get(self) -> dict:
        """Get All Groups"""
        groupList = GroupAdministration.get_all_groups()
        return groupList
