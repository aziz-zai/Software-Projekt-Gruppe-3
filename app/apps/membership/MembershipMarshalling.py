from flask_restx import fields
from app.configs.base import api


membership_marshalling = api.model('Membership', {
    "id_": fields.Integer(readOnly=True),
    "learning_group": fields.Integer(readOnly=True),
    "profile": fields.Integer(readOnly=True)
})