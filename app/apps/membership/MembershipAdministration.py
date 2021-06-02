from .MembershipMapper import MembershipMapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector


class MembershipAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_membership(membership: MembershipObject) -> MembershipObject:
        """Insert Person Manager."""
        with db_connector as db:
            cnx = db._cnx
            return MembershipMapper.insert(cnx=cnx, object=membership)
            
   
