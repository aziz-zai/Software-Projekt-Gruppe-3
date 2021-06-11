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
            return MessageMapper.insert(cnx=cnx, object=message
            )
