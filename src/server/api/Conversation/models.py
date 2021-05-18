from dataclasses import dataclass
from src.server.db import TableObj, Model


@dataclass
class ConversationObj(TableObj):
    """Dummy Table descriptor."""

    person: int
    conversationsstatus: float
    group: int

class Conversation(Model, ConversationObj):
    """Conversation Model."""

    __tablename__ = "Conversation"
    business_obj = ConversationObj

def __str__(self):
    obj = self.instance
    return f"id: {obj.id}, person: {obj.person}, conversationsstatus: {obj.conversationsstatus}, group: {obj.group}"
