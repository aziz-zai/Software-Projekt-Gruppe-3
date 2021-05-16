from typing_extensions import Required
from app.apps.learngroup.models import Learninggroup
from flask_restx import fields
from app.configs.base import api


Conversation = api.inherit('Conversation', {
    "personID": fields.String(required=True),
    "ConversationID": fields.String(required=True),
    "Conversationsstatus": fields.Bool(required=True)
    "GroupID": fields.Integer(required=True)
})

