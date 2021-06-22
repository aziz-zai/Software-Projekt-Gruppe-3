from .MembershipMapper import MembershipMapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector
from app.apps.profile.ProfileBO import ProfileObject
from app.apps.group.GroupBO import GroupObject



class MembershipAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_membership(learning_group: GroupObject, profile: ProfileObject) -> MembershipObject:
        """Insert Person Manager."""
        with db_connector as db:
            cnx = db._cnx
            membership = MembershipObject
            membership.learning_group = learning_group.id_
            membership.profile= profile.id_
            return MembershipMapper.insert(cnx=cnx, object=membership)
    
    @staticmethod
    def get_membership_by_group(learning_group: int):
        with db_connector as db:
            cnx=db._cnx
            return MembershipMapper.find_by_groupID(cnx=cnx, groupID = learning_group)
    
    @staticmethod
    def get_groups_by_person(profile: int):
        with db_connector as db:
            cnx=db._cnx
            return MembershipMapper.find_by_profile(cnx=cnx, profile = profile)
   
