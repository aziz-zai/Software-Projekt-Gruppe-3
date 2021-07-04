from app.apps.core.mapper import Mapper
from .ChatRoomBO import ChatRoomObject
from app.configs.base import db_connector


class ChatRoomMapper(Mapper):

    def insert_chatroom(cnx: db_connector, object: ChatRoomObject) -> ChatRoomObject:
        """Create Chatroom Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO chatroom (
                is_accepted,
                is_open,
                sender,
                receiver,
                timestamp
            ) VALUES (%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.is_accepted,
            object.is_open,
            object.sender,
            object.receiver,
            object.timestamp,
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM chatroom")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def find_open_received_requests(cnx: db_connector, person: int):

        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT * FROM chatroom
            WHERE receiver =%s AND sender !=%s AND is_open=TRUE AND is_accepted=FALSE
        """
        cursor.execute(command, (person, person))
        tuples = cursor.fetchall()

        for (id, is_accepted, is_open, sender, receiver, timestamp) in tuples:
            chatroom = ChatRoomObject
            chatroom.id_ = id
            chatroom.is_accepted = is_accepted
            chatroom.is_open = is_open
            chatroom.sender = sender
            chatroom.receiver = receiver
            chatroom.timestamp = timestamp

            result.append(chatroom)

        cnx.commit()
        cursor.close()

        return result

    def find_open_sent_requests(cnx: db_connector, person: int):

        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT * FROM chatroom
            WHERE sender=%s AND receiver !=%s AND is_open=TRUE AND is_accepted=FALSE
        """
        cursor.execute(command, (person, person))
        tuples = cursor.fetchall()

        for (id, is_accepted, is_open, sender, receiver, timestamp) in tuples:
            chatroom = ChatRoomObject
            chatroom.id_ = id
            chatroom.is_accepted = is_accepted
            chatroom.is_open = is_open
            chatroom.sender = sender
            chatroom.receiver = receiver
            chatroom.timestamp = timestamp

            result.append(chatroom)

        cnx.commit()
        cursor.close()

        return result

    def accept_open_request(cnx: db_connector, chatroom: int, person: int):
        cursor = cnx.cursor(buffered=True)

        command = """UPDATE chatroom
            SET is_accepted=TRUE, is_open=FALSE
            WHERE id=%s AND receiver=%s
            """
        cursor.execute(command, (chatroom, person))

        cnx.commit()
        cursor.close()

    def find_by_chatroom_id(cnx: db_connector, chatroom: int) -> ChatRoomObject:

        result = None
        cursor = cnx.cursor(buffered=True)

        command = """
        SELECT
         id,
         is_accepted,
         sender,
         is_open,
         receiver,
         timestamp

        FROM chatroom WHERE id=%s
        """
        cursor.execute(command, (chatroom, ))
        entity = cursor.fetchone()

        try:
            (id, is_accepted, sender, is_open, receiver, timestamp) = entity
            result = ChatRoomObject(
                id_=id,
                is_accepted=is_accepted,
                sender=sender,
                is_open=is_open,
                receiver=receiver,
                timestamp=timestamp,
            )
        except IndexError:
            result = None

        cnx.commit()
        cursor.close()

        return result

    def find_single_chats(cnx: db_connector, person: int) -> ChatRoomObject:
        result = []

        cursor = cnx.cursor(buffered=True)
        command = "SELECT * FROM chatroom WHERE is_accepted=True AND (sender=%s OR receiver=%s);"
        cursor.execute(command, (person, person))
        tuples = cursor.fetchall()

        for (id, is_accepted, is_open, sender, receiver, timestamp) in tuples:
            chatroom = ChatRoomObject
            chatroom.id_ = id
            chatroom.is_accepted = is_accepted
            chatroom.is_open = is_open
            chatroom.sender = sender
            chatroom.receiver = receiver
            chatroom.timestamp = timestamp

            result.append(chatroom)

        cnx.commit()
        cursor.close()

        return result

    def delete_singlechat(cnx: db_connector, chatroom: int, person: int):

        cursor = cnx.cursor(buffered=True)
        command = """
        DELETE FROM chatroom
        WHERE id=%s AND (receiver=%s OR sender=%s)
        """
        try:
            cursor.execute(command, (chatroom, person, person))
        except Exception:
            print("singlechat does not exist!")

        cnx.commit()
        cursor.close()

    def delete_received_request(cnx: db_connector, chatroom: int, person: int):
        cursor = cnx.cursor(buffered=True)
        command = """DELETE FROM chatroom
        WHERE id=%s AND receiver=%s
            """
        try:
            cursor.execute(command, (chatroom, person))
        except Exception:
            print("Received request does not exist!")

        cnx.commit()
        cursor.close()

    def delete_sent_request(cnx: db_connector, chatroom: int, person: int):
        cursor = cnx.cursor(buffered=True)
        command = """DELETE FROM chatroom
            WHERE id=%s AND sender=%s
            """
        try:
            cursor.execute(command, (chatroom, person,))
        except Exception:
            print("Sent request does not exist!")

        cnx.commit()
        cursor.close()
