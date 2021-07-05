from .PersonMapper import PersonMapper
from .PersonBO import PersonObject
from app.configs.base import db_connector


class PersonAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_person(email: str, google_user_id: str) -> PersonObject:
        """Create a PersonObject."""
        with db_connector as db:
            cnx = db._cnx
            person = PersonObject
            person.email=email
            person.google_user_id=google_user_id
            return PersonMapper.insert(cnx=cnx, object=person)

    @staticmethod
    def get_person_by_id(person: int) -> PersonObject:
        """Returns Persons by id."""
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_by_key(cnx=cnx, key=person)

    @staticmethod
    def get_person_by_google_user_id(google_user_id: str) -> PersonObject:
        """Returns person by google_user_id."""
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_by_google_user_id(cnx=cnx, google_user_id=google_user_id)

    @staticmethod
    def save_person(person: PersonObject):
        """Saves a Person"""
        with db_connector as db:
            cnx = db._cnx
            PersonMapper.update(cnx=cnx, person=person)

    @staticmethod
    def delete_person(person: int):
        """Deletes a Person"""
        with db_connector as db:
            cnx = db._cnx
            PersonMapper.delete(cnx=cnx, person=person)

    @staticmethod
    def get_potential_persons_for_group(learning_group: int):
        """Returns all potential Persons for a Group"""
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_potential_persons_for_group(cnx=cnx, learning_group=learning_group)

    @staticmethod
    def get_potential_singlechat(person: int) -> PersonObject:
        """"Returns all potential Persons for a SingleChat between Users. """
        with db_connector as db:
            cnx = db._cnx
            return PersonMapper.find_potential_singlechat(cnx=cnx, person=person)