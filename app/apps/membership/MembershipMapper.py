from app.apps.core.mapper import Mapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector


class MembershipMapper(Mapper):
    def find_all():
        pass

    def find_by_key(cnx: db_connector, key: int) -> MembershipObject:
        pass

    @staticmethod
    def insert(cnx: db_connector, object: MembershipObject) -> MembershipObject:
        """Create Membership Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO membership (
                person, learning_group, profile
            ) VALUES (%s,%s,%s)
        """
        cursor.execute(command, (
            object.person,
            object.learning_group,
            object.profile
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM membership")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
