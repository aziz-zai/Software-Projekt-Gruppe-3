from flask_restx import fields
from src.server.configs import api


profile = api.inherit('Profile', {
    "interests": fields.String(required=True),
    "type": fields.String(required=True),
    "online": fields.bool(required=True),
    "frequency": fields.String(required=True),
    "expertise":fields.bool(required=True),
    "extroversion":fields.String(required=True),
    "profile_id": fields.Integer(required=True)
})
