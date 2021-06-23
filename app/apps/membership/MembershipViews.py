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

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_marshalling)
    def get(self, group: int) -> dict:
        """Get All Members of a group."""
        membership = MembershipAdministration.get_membership_by_group(learning_group=group)
        return membership

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_person_marshalling, validate=True)
    def delete(self, group: int,) -> dict:
        """Membership löschen."""
        membership = MembershipAdministration.delete_membership(
            learning_group=group, person=namespace.payload.get("person")
        )
        return membership

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_person_marshalling, validate=True)
    def post(self, group: int):
        """ Person der Gruppe hinzufügen"""
        membership = MembershipAdministration.insert_membership(
            learning_group=group,
            person=namespace.payload.get("person")
            )
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


@namespace.route("/Membershiprequest/<int:person>")
class MembershipRequestAPI(Resource):

    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def get(self, person: int):
        """ Get All Group/Membership-Requests """
        requeslist = MembershipAdministration.get_all_requests(person=person)
        return requeslist

    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def post(self, person: int):
        """ Eine Anfrage verschicken """
        request = MembershipAdministration.invite_membership(
            person=person,
            learning_group=namespace.payload.get("learning_group")
        )
        return request

    def delete(self, person):
        """ Lehne eine Anfrage ab """
        MembershipAdministration.delete_membership_request(
            person=person,
            learning_group=namespace.payload.get("learning_group")
            )
