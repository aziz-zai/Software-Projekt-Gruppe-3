from typing import Dict
from flask import request
from flask_restx import Resource
from app.configs.base import mysql_connector, api
from app.utils.models import ORM


lernapp = api.lernapp(
    "/Conversation",
    description="lernapp"
)


@lernapp.route("")
class Conversation(Resource):
    """Basic API for dummy."""

    pass
