from flask_restx import fields
from app.configs.base import api


person = api.inherit('Person', {
    "course": fields.String(required=True),
    "prof": fields.String(required=True),
    "credit_points": fields.Integer(required=True)
})
