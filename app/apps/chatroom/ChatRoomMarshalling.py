from flask_restx import fields
from app.configs.base import api

chatroom_marshalling = api.model('chatroom', {
    "id_": fields.Integer(readOnly=True),
    "is_accepted": fields.Boolean(),
    "is_open": fields.Boolean(),
    "sender": fields.Integer(readOnly=True),
    "receiver": fields.Integer(readOnly=True),
    "timestamp": fields.Integer(),
    "learning_group": fields.Integer(),
})
