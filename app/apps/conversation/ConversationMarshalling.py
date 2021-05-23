from flask_restx import fields
from app.configs.base import api


conversation_marshalling = api.inherit('Conversation', {
    "id_": fields.Integer(readOnly=True),
    "conversationstatus": fields.Boolean(),
    "personID": fields.Integer(readOnly=True),
    "groupID": fields.Integer(readOnly=True),
})
