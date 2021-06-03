from flask_restx import fields
from app.configs.base import api


conversation_marshalling = api.model('Conversation', {
    "id_": fields.Integer(readOnly=True),
    "conversationstatus": fields.Boolean(),
    "person": fields.Integer(readOnly=True),
    "learning_group": fields.Integer(readOnly=True),
})
