from app.apps.learngroup.models import Group
from flask_restx import fields
from app.configs.base import api
from server.api import Group


Group = api.inherit('Group', {
    "PersonID": fields.Integer(required=True),
    "GroupID": fields.Integer(required=True)
})
