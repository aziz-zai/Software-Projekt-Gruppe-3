from typing import Dict
from flask import request
from flask_restx import Resource
from app.configs.base import mysql_connector, api
from app.utils.models import ORM
from .models import Group
from .marshalling import Group


lernapp = api.lernapp(
    "/Group",
    description="lernapp"
)


@lernapp.route("/")
class GroupAPI(Resource):
    """Basic API for dummy."""

    @api.marshal_list_with(Group, code=201)
    def get(self):
        """Return list of all groups."""
        with mysql_connector as db:
            groups = ORM.select_many_rows(cnx=db.cnx, model=Group)
        return groups
