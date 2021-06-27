from dns.rdatatype import register_type
from .PersonMapper import PersonMapper
from .PersonBO import PersonObject
from app.configs.base import db_connector
from app.apps.profile.ProfileAdministration import ProfileAdministration


class PersonAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_person(email: str, google_user_id: str) -> PersonObject:
        """Insert Person Manager."""
        with db_connector as db:
            cnx = db._cnx
            person = PersonObject
            person.email=email
            person.google_user_id=google_user_id
            return PersonMapper.insert(cnx=cnx, object=person)

    @staticmethod
    def get_person_by_id(person: int) -> PersonObject:
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_by_key(cnx=cnx, key=person)

    @staticmethod
    def get_person_by_google_user_id(google_user_id: str) -> PersonObject:
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_by_google_user_id(cnx=cnx, google_user_id=google_user_id)

    @staticmethod
    def save_person(person: PersonObject):
        with db_connector as db:
            cnx = db._cnx
            PersonMapper.update(cnx=cnx, person= person)

    @staticmethod
    def delete_person(person: int):
        with db_connector as db:
            cnx = db._cnx
            PersonMapper.delete(cnx=cnx, person=person)
    
    @staticmethod
    def get_potential_persons_for_group(learning_group: int):
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_potential_persons_for_group(cnx=cnx, learning_group= learning_group)
    
    @staticmethod
    def get_potential_singlechat(person: int) -> PersonObject:
        with db_connector as db:
            cnx= db._cnx
            return PersonMapper.find_potential_singlechat(cnx=cnx, person=person)