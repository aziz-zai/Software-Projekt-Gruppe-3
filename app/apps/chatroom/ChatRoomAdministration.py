from .ChatRoomMapper import ChatRoomMapper
from app.apps.person.PersonBO import PersonObject
from app.configs.base import db_connector
from app.apps.chatroom.ChatRoomBO import ChatRoomObject

class ChatRoomAdministration:
    """Chatroom Manager class. For managing database interactions."""
    @staticmethod
    def create_chatroom(chatroom: ChatRoomObject) -> ChatRoomObject:
        """Insert Chatroom Manager."""
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.create_chatroom(cnx=cnx, object=chatroom)
    
    @staticmethod
    def get_single_chats(person: int) -> ChatRoomObject:
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.find_single_chats(cnx=cnx, person = person)
    
    @staticmethod
    def reject_open_request(chatroom: ChatRoomObject) -> ChatRoomObject:
        with db_connector as db:
            cnx= db._cnx
            return ChatRoomMapper.reject_open_request(cnx=cnx, object=chatroom)

    @staticmethod
    def accept_open_request(chatroom: ChatRoomObject) -> ChatRoomObject:
        with db_connector as db:
            cnx= db._cnx
            return ChatRoomMapper.accept_open_request(cnx=cnx, object=chatroom)

    @staticmethod
    def get_open_received_requests(person: int) -> ChatRoomObject:
        with db_connector as db:
            cnx= db._cnx
            return ChatRoomMapper.find_open_received_requests(cnx=cnx, person=person)
    
    @staticmethod
    def get_open_sent_requests(person: int) -> ChatRoomObject:
        with db_connector as db:
            cnx= db._cnx
            return ChatRoomMapper.find_open_sent_requests(cnx=cnx, person=person)

    @staticmethod
    def delete_open_sent_request(person: int):
        with db_connector as db:
            cnx= db._cnx
            ChatRoomMapper.delete_open_sent_request(cnx=cnx, person=person)
    
