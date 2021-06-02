from .ProfileMapper import ProfileMapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector
from app.apps.person.PersonBO import PersonObject


class ProfileAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_profile(profile: ProfileObject) -> ProfileObject:
        """Insert Profile Manager."""
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.insert(cnx=cnx, object=profile)
