from .ChatRoomMapper import ChatRoomMapper
from app.apps.person.PersonBO import PersonObject
from app.configs.base import db_connector
from app.apps.chatroom.ChatRoomBO import ChatRoomObject
from datetime import datetime
from time import time

class ChatRoomAdministration:
    """Chatroom Manager class. For managing database interactions."""
    @staticmethod
    def insert_chatroom(learning_group: int, sender: int, receiver: int) -> ChatRoomObject:
        """Insert Chatroom Manager."""
        with db_connector as db:
            cnx = db._cnx
            chatroom = ChatRoomObject(
            learning_group = learning_group,
            sender = sender,
            receiver = receiver,
            is_accepted = True,
            is_open = False,
            timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
            return ChatRoomMapper.insert_chatroom(cnx=cnx, object=chatroom)
    
    @staticmethod
    def get_single_chats(person: int) -> ChatRoomObject:
        with db_connector as db:
            cnx = db._cnx
            return ChatRoomMapper.find_single_chats(cnx=cnx, person = person)
    
    @staticmethod
    def reject_received_request(chatroom: int, person: int) -> ChatRoomObject:
        with db_connector as db:
            cnx= db._cnx
            return ChatRoomMapper.delete_received_request(cnx=cnx, chatroom=chatroom, person= person)

    @staticmethod
    def accept_open_request(chatroom: int, person: int) -> ChatRoomObject:
        with db_connector as db:
            cnx= db._cnx
            return ChatRoomMapper.accept_open_request(cnx=cnx, chatroom= chatroom, person = person)

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
    def delete_sent_request(chatroom: int, person: int):
        with db_connector as db:
            cnx= db._cnx
            ChatRoomMapper.delete_sent_request(cnx=cnx,chatroom=chatroom,person=person)
    
    @staticmethod
    def delete_singlechat(chatroom: int, person: int):
        with db_connector as db:
            cnx= db._cnx
            ChatRoomMapper.delete_singlechat(cnx=cnx, chatroom= chatroom, person=person)
    
   
   