from dataclasses import dataclass
from src.server.db import TableObj, Model


@dataclass
class PersonObj(TableObj):
    """Dummy Table descriptor."""

    firstname: str
    surname: str 
    semester: int
    profile: str

class Person(Model, PersonObj):
    """Person Model."""

    __tablename__ = "Person"                                                                                                                                                                                                                                                                                                                                                                                                                
    business_obj = PersonObj

def __str__(self):
    obj = self.instance
    return f"id: {obj.id}, firstname : {obj.firstname}, surname : {obj.surname}, semester: {obj.semester}, profile : {obj.profile}"

