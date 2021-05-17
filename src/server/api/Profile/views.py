from typing import Dict
from flask import request
from flask_restx import Resource
from server.api.Profile.models import Profile
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Profile
from .marshalling import profile

lernapp = api.namespace(
    "/Profile",
    description="ProfileAPI."
)

@lernapp.route("/profile")
@lernapp.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProfileAPI(Resource):
    """ProfileAPI"""

    @lernapp.marshal_list_with(profile)
    def get(self, id: int) -> Dict[dict, int]:
        """Get Profile by id endpoint."""
        with mysql_connector as db:
            person = ORM.find_by_id(cnx=db.cnx, model=Profile, id=id)
        return person

@lernapp.route("/")
class ProfileListOperations(Resource):
    """Create List for Profile API"""

    @lernapp.marshal_list_with(profile)
    def get(self) -> Dict[dict, int]:
        """Create Profile endpoint."""
        with mysql_connector as db:
            persons = ORM.find_all(cnx=db.cnx, model=Profile)
        return persons


    @lernapp.marshal_with(profile, code=200)
    @lernapp.expect(profile, validate=True)
    def post(self) -> Dict[dict, int]:
        """Create Profile endpoint."""
        proposal = Profile(api.payload)
        if(proposal is not None):

            pro = Profile()
            pro = Profile.firstname(proposal)
            pro = Profile.surname(proposal)
            pro = Profile.semester(proposal)
            with mysql_connector as db:
                pro = ORM.insert(cnx=db.cnx, model=Profile)
            return pro, 200
        else:
            return "", 500

class PersonRelatedProfileOperations(Resource):

        @lernapp.marshal_list_with(profile)
        def get(self, id: int):
        
            with mysql_connector as db:
                pro = ORM.find_by_id(cnx=db.cnx, model=Profile)

            if( pro is not None):
                 pro_pers = 










