from .MessageMapper import MessageMapper
from .MessageBO import MessageObject
from app.configs.base import db_connector


class MessageAdministration:
    """Message Manager class. For managing database interactions."""

    @staticmethod
    def insert_message(message: MessageObject) -> MessageObject:
        """Insert Message Manager."""
        with db_connector as db:
            cnx = db._cnx
            return MessageMapper.insert(cnx=cnx, object=message)

    @staticmethod
    def get_all_messages_for_thread_person(thread_id: int, is_singlechat: bool):
        with db_connector as db:
            cnx = db._cnx
            return MessageMapper.find_all_messages_in_thread_for_person(
                cnx=cnx, thread_id=thread_id, is_singlechat=is_singlechat
            )
