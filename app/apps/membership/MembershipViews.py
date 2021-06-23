from os import name
from flask_restx import Resource
from app.configs.base import api
from .MembershipMarshalling import membership_marshalling, membership_person_marshalling
from .MembershipBO import MembershipObject
from .MembershipAdministration import MembershipAdministration
from app.apps.person.PersonAdministration import PersonAdministration
from app.apps.profile.ProfileAdministration import ProfileAdministration


namespace = api.namespace(
    "/membership",
    description="Namespace for person APIs."
)


@namespace.route("/group/<int:group>")
class MembershipGroupAPI(Resource):
    """Get All Members of a group."""

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_marshalling)
    def get(self, group: int) -> dict:
        """Create Person Endpoint."""
        membership = MembershipAdministration.get_membership_by_group(learning_group=group)
        return membership

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_person_marshalling, validate=True)
    def delete(self, group: int,) -> dict:
        """Create Person Endpoint."""
        membership = MembershipAdministration.delete_membership(
            learning_group=group, person=namespace.payload.get("person")
        )
        return membership

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_person_marshalling, validate=True)
    def post(self, group: int):
        """ Person der Gruppe hinzufügen"""
        membership = MembershipAdministration.invite_membership(group=group, person=namespace.payload.get("person"))
        return membership


@namespace.route("/person/<int:person>")
class MembershipPersonAPI(Resource):
    """Get All Groups of a Person."""

    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def get(self, person: int) -> dict:
        """Create Person Endpoint."""
        membership = MembershipAdministration.get_groups_by_person(person=person)
        return membership

