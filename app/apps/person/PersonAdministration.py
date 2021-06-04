from .PersonMapper import PersonMapper
from .PersonBO import PersonObject
from app.configs.base import db_connector


class PersonAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_person(person: PersonObject) -> PersonObject:
        """Insert Person Manager."""
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.insert(cnx=cnx, object=person)
            
    @staticmethod
    def get_person_by_id(person_id: int) -> PersonObject:
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_by_key(cnx=cnx, key=person_id)
    
    @staticmethod
    def get_person_by_google_user_id(google_user_id: int) -> PersonObject:
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_by_google_user_id(cnx=cnx, google_user_id=google_user_id)
    
    @staticmethod
    def save_person(person: PersonObject):
        with db_connector as db:
            cnx = db._cnx
            PersonMapper.update(cnx=cnx, person= person)

