from flask_restx import Resource
from app.configs.base import api
from .MembershipMarshalling import membership_marshalling
from .MembershipBO import MembershipObject
from .MembershipAdministration import MembershipAdministration



namespace = api.namespace(
    "/membership",
    description="Namespace for person APIs."
)


@namespace.route("/<int:group>")
class MembershipAPI(Resource):
    """Get All Members of a group."""

    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def get(self, group: int) -> dict:
        """Create Person Endpoint."""
        membership = MembershipAdministration.get_membership_by_group(learning_group=group)
        return membership

