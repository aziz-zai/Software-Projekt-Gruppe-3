from flask_restx import fields
from app.configs.base import api


"""Anlegen von transferierbaren Strukturen"""
membership_marshalling = api.model('Membership', {
    "id_": fields.Integer(readOnly=True),
    "learning_group": fields.Integer(readOnly=True),
    "person": fields.Integer(readOnly=True)
})
