from app.apps.core.mapper import Mapper
from .MessageBO import MessageObject
from app.configs.base import db_connector


class MessageMapper(Mapper):
    def find_all():
        pass

    def find_by_key(key):
        pass

    @staticmethod
    def insert(cnx: db_connector, object: MessageObject) -> MessageObject:
        """Create Message Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO message (
                content,
                conversation
            ) VALUES (%s, %s)
        """
        cursor.execute(command, (
            object.content,
            object.conversation
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM message")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
