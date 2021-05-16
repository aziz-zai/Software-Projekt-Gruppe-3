from app.apps.learngroup.models import Learninggroup
from flask_restx import fields
from app.configs.base import api


learninggroup = api.inherit('Learninggroup', {
    "course": fields.String(required=True),
    "prof": fields.String(required=True),
    "credit_points": fields.Integer(required=True)
})
