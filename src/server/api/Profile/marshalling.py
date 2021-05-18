from flask_restx import fields
from src.server.configs import api


Profile = api.inherit('Profile', {
    "interests": fields.String(required=True),
    "type": fields.String(required=True),
    "online": fields.Boolean(required=True),
    "frequency": fields.String(required=True),
    "expertise":fields.Boolean(required=True),
    "extroversion":fields.String(required=True),
    "profile_id": fields.Integer(readonly=True)
})
