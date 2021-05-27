from flask_restx import fields
from app.configs.base import api


message_marshalling = api.model('Message', {
    "id_": fields.Integer(readOnly=True),
    "content": fields.String(),
    "conversationID": fields.Integer(readOnly=True)
})
