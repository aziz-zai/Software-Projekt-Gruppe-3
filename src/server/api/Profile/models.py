from dataclasses import dataclass
from src.server.db import TableObj, Model


@dataclass
class ProfileObj(TableObj):
    """Dummy Table descriptor."""

    interests: str
    type: str
    online: bool
    frequency: str
    expertise: bool
    extroversion: str
    profile_id: int

class Profile(Model, ProfileObj):
    """Profile Model."""

    __tablename__ = "Profile"
    business_obj = ProfileObj


def __str__(self):
    obj = self.instance
    return f"id: {obj.id}, interests: {obj.interests}, type: {obj.type}, online: {obj.online},\n\
    frequency: {obj.frequency}, expertise: {obj.expertise}, extroversion: {obj.extroversion}"

    