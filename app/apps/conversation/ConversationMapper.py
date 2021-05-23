from app.apps.core.mapper import Mapper
from .ConversationBO import ConversationObject
from app.configs.base import db_connector


class ConversationMapper(Mapper):
    def find_all():
        pass

    def find_by_key(key):
        pass

    @staticmethod
    def insert(cnx: db_connector, object: ConversationObject) -> ConversationObject:
        """Create Conversation Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO conversation (
                conversationstatus, groupID, personID
            ) VALUES (%s,%s,%s)
        """
        cursor.execute(command, (
            object.conversationstatus,
            object.groupID,
            object.personID
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM conversation")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
