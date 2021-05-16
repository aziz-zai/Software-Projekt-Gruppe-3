from dataclasses import dataclass
from app.utils.models import TableObj, Model


@dataclass
class YourObj(TableObj):
    """Dummy Table descriptor."""
    personID: str
    ConversationID: str
    Conversationsstatus: float
    GroupID: int



class YourModel(Model, YourObj):
    """Dummy Model."""

    __tablename__ = "person"
    table_obj = YourObj
