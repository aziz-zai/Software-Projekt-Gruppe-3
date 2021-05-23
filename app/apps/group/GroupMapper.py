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
        """Create Group Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO Group (
                id_, groupname
            ) VALUES (%s,%s)
        """
        cursor.execute(command, (
            object.id_,
            object.groupname,
         
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM Group")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
