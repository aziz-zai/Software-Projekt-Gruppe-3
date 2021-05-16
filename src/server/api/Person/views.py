from typing import Dict
from flask import request
from flask_restx import Resource
from app.configs.base import mysql_connector, api
from app.utils.models import ORM
from .models import Person
from .marshalling import person


lernapp = api.namespace(
    "/Persons",
    description="lernapp for Person APIs."
)


@lernapp.route("/<int:id>")
class PersonAPI(Resource):
    """Basic API for Persons."""

    @api.marshal_with(person, code=200)
    def get(self, id: int) -> Dict[dict, int]:
        """Get Person by id endpoint."""
        with mysql_connector as db:
            person = ORM.select_row(cnx=db.cnx, model=Person, id=id)
        return person


@lernapp.route("/")
class CreatePersonAPI(Resource):
    """Basic List Create API for Persons."""

    @api.marshal_list_with(person, code=201)
    def get(self) -> Dict[dict, int]:
        """Create Person endpoint."""
        with mysql_connector as db:
            persons = ORM.select_many_rows(cnx=db.cnx, model=Person)
        return persons

    @api.marshal_with(person, code=201)
    @api.expect(person, validate=True)
    def post(self) -> Dict[dict, int]:
        """Create Person endpoint."""
        with mysql_connector as db:
            person = ORM.insert_row(cnx=db.cnx, model=Person, **request.json)
        return person

