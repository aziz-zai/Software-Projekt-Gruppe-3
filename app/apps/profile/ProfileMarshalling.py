from flask_restx import fields
from app.configs.base import api


profile_marshalling = api.inherit('Profile', {
    "id_": fields.Integer(readOnly=True),
    "personID": fields.Integer(),
    "interests": fields.String(),
    "type_": fields.String(),
    "online": fields.Boolean(),
    "frequence": fields.Integer(),
    "expertise": fields.String(),
    "extroversion": fields.String()
})
