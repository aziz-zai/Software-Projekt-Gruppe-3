from typing import Dict
from flask import request
from flask_restx import Resource
from server.api.Profile.marshalling import Profile
from src.server.db import mysql_connector, api
from src.server.db import orm
from .models import Profile
from .marshalling import profile


lernapp = api.namespace(
    "/Person",
    description="PersonAPI."
)


@lernapp.route("/<int:id>")
class PersonAPI(Resource):
    """Basic API for Persons."""

    @lernapp.marshal_with(profile, code=200)
    def get(self, id: int) -> Dict[dict, int]:
        """Get Person by id endpoint."""
        with mysql_connector as db:
            profiles = orm.select_row(cnx=db.cnx, model=Profile, id=id)
        return profiles

@lernapp.route("/")
class CreatePersonAPI(Resource):
    """Basic List Create API for Persons."""

    @lernapp.marshal_list_with(profile, code=201)
    def get(self) -> Dict[dict, int]:
        """Create Person endpoint."""
        with mysql_connector as db:
            profiles = orm.select_many_rows(cnx=db.cnx, model=Profile)
        return profiles

    @lernapp.marshal_with(profile, code=201)
    @lernapp.expect(profile, validate=True)
    def post(self) -> Dict[dict, int]:
        """Create Person endpoint."""
        with mysql_connector as db:
            profile = orm.insert_row(cnx=db.cnx, model=Profile, **request.json)
        return profile


