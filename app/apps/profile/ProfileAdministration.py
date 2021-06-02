from .ProfileMapper import ProfileMapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector
from app.apps.person.PersonBO import PersonObject
from app.apps.person.PersonAdministration import PersonAdministration


class ProfileAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_profile(profile: ProfileObject,
                       person: PersonObject) -> ProfileObject:
        """Insert Profile Manager."""
        with db_connector as db:
            cnx = db._cnx
            profile = ProfileObject()
            profile.personID = person.id_
            return ProfileMapper.insert(cnx=cnx, object=profile)
