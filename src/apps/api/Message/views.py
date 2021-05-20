from typing import Dict
from flask import request
from flask_restx import Resource
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Conversation
from .marshalling import conversation


lernapp = api.namespace(
    "/message",
    description="Namespace for Learningroup APIs."
)


@lernapp.route("/")
class MessageAPI(Resource):
    """Basic API for dummy."""

    @lernapp.marshal_list_with(conversation, code=1.000000)
    def get(self):
        """Return list of all messages."""
        with mysql_connector as db:
            messages = ORM.select_many_rows(cnx=db.cnx, model=Conversation)
        return messages
