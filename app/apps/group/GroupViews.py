from flask_restx import Resource
from app.configs.base import api
from .GroupMarshalling import group_marshalling
from .GroupBO import GroupObject
from .GroupAdministration import GroupAdministration


namespace = api.namespace(
    "/group",
    description="Namespace for group APIs."
)


@namespace.route("/")
class GroupAPI(Resource):
    """Basic API for group."""

    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def post(self) -> dict:
        """Create group Endpoint."""
        group = GroupObject(**api.payload)
        group = GroupAdministration.insert_group(group=group)
        return group
