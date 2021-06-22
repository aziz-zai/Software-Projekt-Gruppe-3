from .RequestMapper import RequestMapper
from app.apps.person.PersonBO import PersonObject
from app.configs.base import db_connector
from app.apps.request.RequestBO import RequestObject

class RequestAdministration:
    """Request Manager class. For managing database interactions."""

    @staticmethod
    def send_request(request: RequestObject) -> RequestObject:
        """Insert Request Manager."""
        with db_connector as db:
            cnx = db._cnx
            return RequestMapper.insert(cnx=cnx, object=request)
    
    @staticmethod
    def get_request_for_person(person: int) -> RequestObject:
        with db_connector as db:
            cnx = db._cnx
            return RequestMapper.find_by_person_id(cnx=cnx, receiver = person)
    
    
    @staticmethod
    def respond(request: RequestObject) -> RequestObject:
        with db_connector as db:
            cnx= db._cnx
            return RequestMapper.update(cnx=cnx, object=request)

    @staticmethod
    def get_all_requests():
        with db_connector as db:
            cnx= db._cnx
            return RequestMapper.find_all(cnx=cnx)
