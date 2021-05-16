from flask_restx import fields
from src.server.configs import api


Conversation = api.inherit('Conversation', {
    "personID": fields.String(required=True),
    "Conversationsstatus": fields.Bool(required=True),
    "GroupID": fields.Integer(required=True)
})

