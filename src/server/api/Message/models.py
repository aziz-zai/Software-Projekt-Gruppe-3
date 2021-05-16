from dataclasses import dataclass
from app.utils.models import TableObj, Model


@dataclass
class MessageObj(TableObj):
    """Dummy Table descriptor."""

    content: str


class Message(Model, MessageObj):
    """Dummy Model."""

    __tablename__ = "Message"
    table_obj = MessageObj
