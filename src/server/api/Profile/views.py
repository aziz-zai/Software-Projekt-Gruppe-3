from typing import Dict
from flask import request
from flask_restx import Resource
from server.api.Person.models import Person
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Person
from .marshalling import person

lernapp = api.namespace(
    "/Profile",
    description="ProfileAPI."
)

@lernapp.route("/<int:id>")
class ProfileAPI(Resource):
    """ProfileAPI"""

    @lernapp.marshal_list_with(person, code=202)
    def get(self, id: int) -> Dict[dict, int]:
        """Get Profile by id endpoint."""
        with mysql_connector as db:
            person = ORM.select_row(cnx=db.cnx, model=Person, id=id)
        return person

@lernapp.route("/")
class CreateProfileAPI(Resource):
    """Create List for Profile API"""

    @lernapp.marshal_list_with(person, code=203)
    def get(self) -> Dict[dict, int]:
        """Create Profile endpoint."""
        with mysql_connector as db:
            persons = ORM.select_many_rows(cnx=db.cnx, model=Person)
        return persons

    @lernapp.marshal_list_with(person, code=201)
    def get(self):
        """Return list of all Profiles"""
        with mysql_connector as db:
            profiles = ORM.select_many_rows(cnx=db.cn, model=Person)
            return profiles

    @lernapp.marshal_with(person, code=203)
    @lernapp.expect(person, validate=True)
    def post(self) -> Dict[dict, int]:
        """Create Profile endpoint."""
        with mysql_connector as db:
            person = ORM.insert_row(cnx=db.cnx, model=Person, **request.json)
        return person



