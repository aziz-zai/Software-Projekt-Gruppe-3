from app.apps.learngroup.models import Person
from flask_restx import fields
from app.configs.base import api


Person = api.inherit('Person', {
    "course": fields.String(required=True),
    "prof": fields.String(required=True),
    "credit_points": fields.Integer(required=True)
})
