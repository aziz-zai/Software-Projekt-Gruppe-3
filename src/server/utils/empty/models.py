from dataclasses import dataclass
from app.utils.models import TableObj, Model


@dataclass
class YourObj(TableObj):
    """Dummy Table descriptor."""

    test_1: str
    test_2: float


class YourModel(Model, YourObj):
    """Dummy Model."""

    __tablename__ = "person"
    table_obj = YourObj
