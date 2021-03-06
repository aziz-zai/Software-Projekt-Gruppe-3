from flask_restx import fields
from app.configs.base import api


"""Anlegen von transferierbaren Strukturen"""
group_marshalling = api.model('Group', {
    "id_": fields.Integer(readOnly=True),
    "groupname": fields.String(),
    "info": fields.String()
})
