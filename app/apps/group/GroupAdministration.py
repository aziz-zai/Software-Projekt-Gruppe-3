from .GroupMapper import GroupMapper
from .GroupBO import GroupObject
from app.configs.base import db_connector


class GroupManager:
    """Group Manager class. For managing database interactions."""

    @staticmethod
    def insert_Group(Group: GroupObject) -> GroupObject:
        """Insert Group Manager."""
        with db_connector as db:
            cnx = db._cnx
            return GroupMapper.insert(cnx=cnx, object=Group)
