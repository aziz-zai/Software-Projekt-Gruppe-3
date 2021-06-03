from flask_restx import fields
from app.configs.base import api


membership_marshalling = api.model('Membership', {
    "id_": fields.Integer(readOnly=True),
    "personID": fields.Integer(readOnly=True),
    "groupID": fields.Integer(readOnly=True),
    "profileID": fields.Integer(readOnly=True)
})