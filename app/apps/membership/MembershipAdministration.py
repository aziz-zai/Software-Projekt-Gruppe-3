from .MembershipMapper import MembershipMapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector
from datetime import datetime


class MembershipAdministration:
    """Membership Manager class. For managing database interactions."""

    @staticmethod
    def insert_membership(learning_group: int, person: int) -> MembershipObject:
        """Insert Groupfounder into Group."""
        with db_connector as db:
            cnx = db._cnx
            membership = MembershipObject(
                learning_group=learning_group,
                person=person,
                is_open=False,
                is_accepted=True,
                timestamp=datetime.now()
            )
            return MembershipMapper.insert(cnx=cnx, object=membership)

    def accept_request(membership: int) -> MembershipObject:
        """Accept a grouprequest."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.update_membership(cnx=cnx, membership=membership)

    @staticmethod
    def invite_membership(learning_group: int, person: int):
        """Add a Person to a Group."""
        with db_connector as db:
            cnx = db._cnx
            membership = MembershipObject(
                learning_group=learning_group,
                person=person,
                timestamp=datetime.now()
            )
            return MembershipMapper.insert(cnx=cnx, object=membership)

    @staticmethod
    def get_membership_by_group(learning_group: int):
        """Gets all memberships by the group id."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.find_by_groupID(cnx=cnx, groupID=learning_group)

    @staticmethod
    def get_groups_by_person(person: int):
        """Gets all groups by id 'person'."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.find_by_person(cnx=cnx, person=person)

    @staticmethod
    def delete_membership(learning_group: int, person: int):
        """Deleting membership of a person in a group."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.delete_membership(cnx=cnx, learning_group=learning_group, person=person)

    @staticmethod
    def delete_own_membership(learning_group: int, person: int):
        """"Deletes own membership."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.delete_own_membership(cnx=cnx, learning_group=learning_group, person=person)

    @staticmethod
    def get_all_requests(learning_group: int):
        """Gets all group requests."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.find_all_requests(cnx=cnx, learning_group=learning_group)
