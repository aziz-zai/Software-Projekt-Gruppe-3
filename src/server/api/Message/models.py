from dataclasses import dataclass
from src.server.db import TableObj, Model


@dataclass
class MessageObj(TableObj):
    """Dummy Table descriptor."""

    content: str


class Message(Model, MessageObj):
    """Dummy Model."""

    __tablename__ = "Message"
    business_obj = MessageObj
