from flask_restx import Resource
from app.configs.base import api
from .MembershipMarshalling import membership_marshalling
from .MembershipBO import MembershipObject
from .MembershipAdministration import MembershipAdministration


namespace = api.namespace(
    "/membership",
    description="Namespace for person APIs."
)


@namespace.route("/")
class MembershipAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def post(self) -> dict:
        """Create Person Endpoint."""
        membership = MembershipObject(**api.payload)
        membership = MembershipAdministration.insert_membership(membership=membership)
        return membership
