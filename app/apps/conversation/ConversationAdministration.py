from .ConversationMapper import ConversationMapper
from .ConversationBO import ConversationObject
from app.configs.base import db_connector


class ConversationManager:
    """Conversation Manager class. For managing database interactions."""

    @staticmethod
    def insert_conversation(conversation: ConversationObject) -> ConversationObject:
        """Insert Conversation Manager."""
        with db_connector as db:
            cnx = db._cnx
            return ConversationMapper.insert(cnx=cnx, object=conversation)
