from dataclasses import dataclass
from app.utils.models import TableObj, Model


@dataclass
class YourObj(TableObj):
    """Dummy Table descriptor."""

    firstname: str
    surname: str 
    semester: int
    Profile: str


class YourModel(Model, YourObj):
    """Dummy Model."""

    __tablename__ = "person"                                                                                                                                                                                                                                                                                                                                                                                                                
    table_obj = YourObj^

