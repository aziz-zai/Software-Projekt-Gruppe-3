from flask_restx import fields
from app.configs.base import api


Group = api.inherit('Group', {
    "person_id": fields.Integer(required=True),
    "group_id": fields.Integer(required=True)
})
