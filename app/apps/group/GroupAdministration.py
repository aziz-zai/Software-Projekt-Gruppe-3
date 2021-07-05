from .GroupMapper import GroupMapper
from .GroupBO import GroupObject
from app.configs.base import db_connector


class GroupAdministration:
    """Group Manager class. For managing database interactions."""
    @staticmethod
    def insert_group(group: GroupObject) -> GroupObject:
        """Create a Group."""
        with db_connector as db:
            cnx = db._cnx
            return GroupMapper.insert(cnx=cnx, object=group)

    @staticmethod
    def get_by_groupID(learning_group: int):
        """Return group by id."""
        with db_connector as db:
            cnx = db._cnx
            return GroupMapper.find_by_groupID(cnx=cnx, learning_group=learning_group)

    @staticmethod
    def delete_group(learning_group: int):
        """Delete a group."""
        with db_connector as db:
            cnx = db._cnx
            return GroupMapper.delete(cnx=cnx, learning_group=learning_group)

    @staticmethod
    def get_all_groups(person: int):
        """Return all groups."""
        with db_connector as db:
            cnx = db._cnx
            return GroupMapper.find_all(cnx=cnx, person=person)
