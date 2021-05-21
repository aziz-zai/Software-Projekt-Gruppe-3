from .PersonMapper import PersonMapper
from .PersonBO import PersonObject
from app.configs.base import db_connector


class PersonManager:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_person(person: PersonObject) -> PersonObject:
        """Insert Person Manager."""
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.insert(cnx=cnx, object=person)
