from app.apps.core.mapper import Mapper
from .GroupBO import GroupObject
from app.configs.base import db_connector


class GroupMapper(Mapper):
    def find_all():
        pass

    def find_by_key(key):
        pass

    @staticmethod
    def insert(cnx: db_connector, object: GroupObject) -> GroupObject:
        """Create group Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO learning_group (
                 groupname
            ) VALUES (%s)
        """
        cursor.execute(command, [object.groupname])
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM learning_group")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
