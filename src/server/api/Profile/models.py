from dataclasses import dataclass
from src.server.db import TableObj, Model


@dataclass
class ProfileObj(TableObj):
    """Dummy Table descriptor."""
    owner: None
    interests: str
    type: str
    online: bool
    frequency: str
    expertise: bool
    extroversion: str

class Profile(Model, ProfileObj):
    """Profile Model."""

    __tablename__ = "profile"
    business_obj = ProfileObj 


def __str__(self):
    obj = self.instance
    return f"id: {obj.id}, owner: {obj.owner} interests: {obj.interests}, type: {obj.type}, online: {obj.online},\n\
    frequency: {obj.frequency}, expertise: {obj.expertise}, extroversion: {obj.extroversion}"

    