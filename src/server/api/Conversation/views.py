from typing import Dict
from flask import request
from flask_restx import Resource
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Conversation
from .marshalling import Conversation


lernapp = api.namespace(
    "/Conversation",
    description="ConversationAPI"
)


@lernapp.route("")
class ConversationAPI(Resource):
    """ConversationsAPI"""

    @api.marshal_list_with(Conversation, code=201)
    def get(self):
        """Returns list of all Conversations"""
        with mysql_connector as db:
            conversations = ORM.select_row(cnx=db.cnx, model=Conversation)
            return conversations