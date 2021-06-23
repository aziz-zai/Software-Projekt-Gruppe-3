from .MembershipMapper import MembershipMapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector
from app.apps.profile.ProfileBO import ProfileObject
from app.apps.group.GroupBO import GroupObject


class MembershipAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_membership(learning_group: GroupObject, person: int) -> MembershipObject:
        """Insert Gruppengründer."""
        with db_connector as db:
            cnx = db._cnx
            membership = MembershipObject(
                learning_group=learning_group.id_,
                person=person,
                is_open=False,
                is_accepted=True
            )
            return MembershipMapper.insert(cnx=cnx, object=membership)

    @staticmethod
    def invite_membership(learning_group: int, person: int):
        with db_connector as db:
            cnx = db._cnx
            membership = MembershipObject(
                learning_group=learning_group.id_,
                person=person,
            )
            return MembershipMapper.insert(cnx=cnx, object=membership)

    @staticmethod
    def get_membership_by_group(learning_group: int):
        with db_connector as db:
            cnx=db._cnx
            return MembershipMapper.find_by_groupID(cnx=cnx, groupID = learning_group)

    @staticmethod
    def get_groups_by_person(person: int):
        with db_connector as db:
            cnx=db._cnx
            return MembershipMapper.find_by_person(cnx=cnx, person = person)

    @staticmethod
    def delete_membership(learning_group: int, person: int):
        with db_connector as db:
            cnx=db._cnx
            return MembershipMapper.delete(cnx=cnx, learning_group= learning_group, person = person)
