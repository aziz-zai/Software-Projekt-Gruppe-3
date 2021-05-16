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
            profiles = ORM.find_all(cnx=db.cnx, model=Profile)
        return profiles

@lernapp.route('/customers/<int:id>/accounts')
class Profile_for_Person(Resource):
    @lernapp.marshal_with(Profile)
    def get(self, id):

        with mysql_connector as db:
            prof = ORM.find_by_id(cnx=db.cnx, model=Profile)
        if prof is not None:
            with mysql_connector as db:
                profile_list = ORM.find_by_id(cnx=db.cnx, model=Profile)
            
            return account_list
        else:
            return "Customer not found", 500
        return profiles

        








