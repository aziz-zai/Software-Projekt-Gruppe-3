from typing import Dict
from flask import request
from flask_restx import Resource
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Profile
from .marshalling import Profile

lernapp = api.namespace(
    "/Profile",
    description="ProfileAPI."
)


@lernapp.route("/Profile")
class ProfileAPI(Resource):
    """ProfileAPI"""

    @api.marshal_list_with(Profile, code=200)
    def get(self):
        """Return list of all Profiles"""
        with mysql_connector as db:
            profiles = ORM.select_row(cnx=db.cnx, model=Profile)
        return profiles




