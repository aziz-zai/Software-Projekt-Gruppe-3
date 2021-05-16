from dataclasses import dataclass
from src.server.db import TableObj, Model


@dataclass
class ConversationTableObj(TableObj):
    """Dummy Table descriptor."""

    personID: str
    Conversationsstatus: float
    GroupID: int

class Conversation(Model, ConversationTableObj):
    """Conversation Model."""

    __tablename__ = "Conversation"
    business_obj = ConversationTableObj

def __str__(self):
    obj = self.instance
    return f"id: {obj.id}, personID: {obj.person}, Conversationsstatus: {obj.Conversationsstatus}, GroupID: {obj.GroupID}"
