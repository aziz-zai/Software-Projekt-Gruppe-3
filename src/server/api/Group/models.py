from dataclasses import dataclass
from app.utils.models import TableObj, Model


@dataclass
class GroupObj(TableObj):
    """Dummy Table descriptor."""

    PersonID: int
    GroupID: int


class Group(Model, GroupObj):
    """Dummy Model."""

    __tablename__ = "Group"
    table_obj = GroupObj
