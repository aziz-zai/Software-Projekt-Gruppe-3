from .ProfileMapper import ProfileMapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector
from app.apps.person.PersonBO import PersonObject


class ProfileAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_profile(profile: ProfileObject,
                       person: PersonObject) -> ProfileObject:
        """Insert Profile Manager."""
        with db_connector as db:
            cnx = db._cnx
            person = PersonObject
            profile = profile.personID(person.id_)
            return ProfileMapper.insert(cnx=cnx, object=profile)

    @staticmethod
    def get_all_profiles():

        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.find_all(cnx=cnx)