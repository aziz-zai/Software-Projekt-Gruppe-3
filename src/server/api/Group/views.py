from typing import Dict
from flask import request
from flask_restx import Resource
from app.configs.base import mysql_connector, api
from app.utils.models import ORM
from .models import Person
from .marshalling import person

lernapp = api.namespace(
    "/Group",
    description="GroupAPI"
)

@lernapp.route("/<int:id>")
class GroupAPI(Resource):
    """GroupAPI"""

    @lernapp.marshal_list_with(person, code=202)
    def get(self, id: int) -> Dict[dict, int]:
        """Get Group by id endpoint."""
        with mysql_connector as db:
            person = ORM.select_row(cnx=db.cnx, model=Person, id=id)
        return person
@lernapp.route("/")
class GroupAPI(Resource):
    """Basic API for dummy."""

    @lernapp.marshal_list_with(person, code=201)
    def get(self):
        """Return list of all groups."""
        with mysql_connector as db:
            groups = ORM.select_many_rows(cnx=db.cnx, model=Group)
        return groups
