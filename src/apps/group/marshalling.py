from flask_restx import fields
from src.configs.base import api

group_marshalling = api.inherit('Group', {
    'personID': fields.Integer(attribute='_personID', description='ID einer Person', required=True),
    'groupID': fields.Integer(attribute='_interests', description='ID einer Gruppe', required=True),
})