from app.apps.core.mapper import Mapper
from .MessageBO import MessageObject
from app.configs.base import db_connector


class MessageMapper(Mapper):
    def find_all_messages_in_thread_for_person(cnx: db_connector, thread_id: int, is_singlechat: bool):
        """Returns all messages in a thread for a person."""
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, content, sender, thread_id, is_singlechat, timestamp FROM message
            WHERE thread_id = %s AND is_singlechat = %s
            ORDER BY timestamp ASC
        """
        cursor.execute(command, (thread_id, is_singlechat))
        tuples = cursor.fetchall()

        for(id, content, sender, thread_id, is_singlechat, timestamp) in tuples:
            message = MessageObject(
                id_=id,
                content=content,
                sender=sender,
                thread_id=thread_id,
                is_singlechat=is_singlechat,
                timestamp=timestamp
            )
            result.append(message)

        cnx.commit()
        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: MessageObject) -> MessageObject:
        """Create Message Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO message
            (content, sender, thread_id, is_singlechat, timestamp)
            VALUES(%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.content,
            object.sender,
            object.thread_id,
            object.is_singlechat,
            object.timestamp
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM message")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object
