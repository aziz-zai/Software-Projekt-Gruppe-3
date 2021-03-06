from .ChatRoomMapper import ChatRoomMapper
from app.configs.base import db_connector
from app.apps.chatroom.ChatRoomBO import ChatRoomObject
from datetime import datetime


class ChatRoomAdministration:
    """Chatroom Manager class. For managing database interactions."""
    @staticmethod
    def insert_chatroom(sender: int, receiver: int) -> ChatRoomObject:
        """Create a Chatroom."""
        with db_connector as db:
            cnx = db._cnx
            chatroom = ChatRoomObject(
                sender=sender,
                receiver=receiver,
                is_accepted=False,
                is_open=True,
                timestamp=datetime.now()
            )
            return ChatRoomMapper.insert_chatroom(cnx=cnx, object=chatroom)

    @staticmethod
    def get_single_chat(chatroom: int) -> ChatRoomObject:
        """Get a singlechat."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.find_by_chatroom_id(cnx=cnx, chatroom=chatroom)

    @staticmethod
    def get_single_chats(person: int) -> ChatRoomObject:
        """Get all singlechats."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.find_single_chats(cnx=cnx, person=person)

    @staticmethod
    def reject_received_request(chatroom: int, person: int) -> ChatRoomObject:
        """Reject a received request."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.delete_received_request(cnx=cnx, chatroom=chatroom, person=person)

    @staticmethod
    def delete_sent_request(chatroom: int, person: int):
        """Delete a sent request."""
        with db_connector as db:
            cnx = db._cnx
            ChatRoomMapper.delete_sent_request(cnx=cnx, chatroom=chatroom, person=person)

    @staticmethod
    def accept_open_request(chatroom: int, person: int) -> ChatRoomObject:
        """Accept an open request."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.accept_open_request(cnx=cnx, chatroom=chatroom, person=person)

    @staticmethod
    def get_open_received_requests(person: int) -> ChatRoomObject:
        """Get all open received requests."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.find_open_received_requests(cnx=cnx, person=person)

    @staticmethod
    def get_open_sent_requests(person: int) -> ChatRoomObject:
        """Get all open sent requests."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.find_open_sent_requests(cnx=cnx, person=person)

    @staticmethod
    def delete_singlechat(chatroom: int, person: int):
        """Delete a singlechat."""
        with db_connector as db:
            cnx = db._cnx
            ChatRoomMapper.delete_singlechat(cnx=cnx, chatroom=chatroom, person=person)