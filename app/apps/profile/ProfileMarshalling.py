from flask_restx import fields
from app.configs.base import api


profile_marshalling = api.model('Profile', {
    "id_": fields.Integer(readOnly=True),
    "personID": fields.Integer(readOnly=True),
    "interests": fields.String(),
    "type_": fields.String(),
    "online": fields.Boolean(),
    "frequency": fields.Integer(),
    "expertise": fields.String(),
    "extroversion": fields.String()
})
