from os import name
from app.configs.base import api
from .MembershipMarshalling import membership_marshalling, membership_person_marshalling
from app.apps.group.GroupMarshalling import group_marshalling
from .MembershipBO import MembershipObject
from .MembershipAdministration import MembershipAdministration
from app.apps.person.PersonAdministration import PersonAdministration
from app.apps.profile.ProfileAdministration import ProfileAdministration
from app.apps.core.auth import AuthView


namespace = api.namespace(
    "/membership",
    description="Namespace for person APIs."
)


@namespace.route("/group/<int:group>")
class MembershipGroupAPI(AuthView):

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_marshalling)
    def get(self, group: int) -> dict:
        """Get All Members of a group."""
        membership = MembershipAdministration.get_membership_by_group(learning_group=group)
        return membership

@namespace.route("/group/<int:group>/<int:person>")
class MembershipGroupPersonAPI(AuthView):
    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_marshalling)
    def delete(self, group: int, person: int) -> dict:
        """Membership löschen."""
        membership = MembershipAdministration.delete_membership(
            learning_group=group, person=person
        )
        return membership

    @namespace.marshal_with(membership_marshalling, code=201)
    @namespace.expect(membership_marshalling)
    def post(self, group: int, person: int):
        """ Person der Gruppe hinzufügen"""
        membership = MembershipAdministration.insert_membership(
            learning_group=group,
            person=person
        )
        return membership


@namespace.route("/person")
class MembershipPersonAPI(AuthView):
    @api.marshal_with(group_marshalling, code=201)
    @api.expect(group_marshalling)
    def get(self) -> dict:
        """Get All Groups of a Person."""
        membership = MembershipAdministration.get_groups_by_person(person=self.person.id_)
        return membership


@namespace.route("/Membershiprequest")
class MembershipRequestAPI(AuthView):

    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def get(self):
        """ Get All Group/Membership-Requests """
        requestlist = MembershipAdministration.get_all_requests(person=self.person.id_)
        return requestlist


@namespace.route("/Membershiprequest/<int:group>")
class MembershipOperations(AuthView):
    @api.marshal_with(membership_marshalling, code=201)
    @api.expect(membership_marshalling)
    def post(self, group: int):
        """ Eine Anfrage verschicken """
        request = MembershipAdministration.invite_membership(
            person=self.person.id_,
            learning_group=group
        )
        return request

    def delete(self, group: int):
        """ Lehne eine Anfrage ab """
        MembershipAdministration.delete_membership_request(
            person=self.person.id_,
            learning_group=group
            )
