from typing import Dict
from flask import request
from flask_restx import Resource
from src.server.db import mysql_connector, api
from src.server.db import ORM
from .models import Conversation
from .marshalling import conversation
from .models import Person
from .marshalling import person


lernapp = api.namespace(
    "/Conversation",
    description="ConversationAPI"
)


@lernapp.route("/<int:id>")
class ConversationAPI(Resource):
    """ConversationsAPI"""

    @lernapp.marshal_list_with(conversation, code=203)
    def get(self, id: int) -> Dict[dict, int]:
        """Get conversation by id endpoint"""
        with mysql_connector as db:
            conversation = ORM.select_row(cnx=db.cnx, model=Conversation, id=id)
            return conversation

@lernapp.route("/")
class CreateConversationAPI(Resource):
    """Create List for Connection API"""

    @lernapp.marshal_list_with(person, code=204)
    def get(self) -> Dict[dict, int]:
        """Create Connection endpoint."""
        with mysql_connector as db:
            persons = ORM.select_many_rows(cnx=db.cnx, model=Person)
        return persons

    @lernapp.marshal_with(person, code=204)
    @lernapp.expect(person, validate=True)
    def post(self) -> Dict[dict, int]:
        """Create Connection endpoint."""
        with mysql_connector as db:
            person = ORM.insert_row(cnx=db.cnx, model=Person, **request.json)
        return person
    