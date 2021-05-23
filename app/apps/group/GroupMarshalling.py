from flask_restx import fields
from app.configs.base import api


group_marshalling = api.inherit('Group', {
    "id_": fields.Integer(readOnly=True),
    "groupname": fields.String()
})
