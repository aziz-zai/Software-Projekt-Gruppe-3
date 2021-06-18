from .GroupMapper import GroupMapper
from .GroupBO import GroupObject
from app.configs.base import db_connector


class GroupAdministration:
    """Group Manager class. For managing database interactions."""

    @staticmethod
    def insert_group(group: GroupObject) -> GroupObject:
        """Insert Group Manager."""
        with db_connector as db:
            cnx = db._cnx
            return GroupMapper.insert(cnx=cnx, object=group)
    
    @staticmethod
    def get_by_groupID(learning_group: int):
        with db_connector as db:
            cnx=db._cnx
            return GroupMapper.find_by_groupID(cnx=cnx, learning_group = learning_group)