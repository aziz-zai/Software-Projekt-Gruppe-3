from typing import Dict
from flask import request
from flask_restx import Resource
from server.api.Person.marshalling import person
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Person
from .marshalling import person


lernapp = api.namespace(
    "/Person",
    description="PersonAPI."
)


@lernapp.route("/person")
@lernapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PersonAPI(Resource):
    """Basic API for Persons."""

    @lernapp.marshal_with(profile, code=200)
    def get(self, id: int) -> Dict[dict, int]:
        """Get Person by id endpoint."""
        with mysql_connector as db:
            profiles = ORM.find_by_id(cnx=db.cnx, model=Person, id=id)
        return profiles

@lernapp.route("/")
class PersonListOperations(Resource):
    """Basic List Create API for Persons."""

    @lernapp.marshal_list_with(person, code=201)
    def get(self) -> Dict[dict, int]:
        """Create Person endpoint."""
        with mysql_connector as db:
            profiles = ORM.find_all(cnx=db.cnx, model=Person)
        return profiles

    @lernapp.marshal_with(person, code=201)
    @lernapp.expect(person, validate=True)
    def post(self) -> Dict[dict, int]:
    
        proposal = Person(api.payload)
        if(proposal is not None):

            per = Person()
            per = Person.id()
            per = Person.firstname(proposal)
            per = Person.surname(proposal)
            per = Person.semester(proposal)
    
            with mysql_connector as db:
                per = ORM.insert(cnx=db.cnx, model=Person, **request.json)
            return per, 200

        
        else:
            return "", 500
    


