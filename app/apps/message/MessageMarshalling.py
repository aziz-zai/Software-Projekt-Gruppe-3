from flask_restx import fields
from app.configs.base import api

"""Anlegen von transferierbaren Strukturen"""
message_marshalling = api.model('Message', {
    "id_": fields.Integer(readOnly=True),
    "content": fields.String(),
    "sender": fields.Integer(),
    "timestamp": fields.String()
})

"""Anlegen von transferierbaren Strukturen """
message_create_marshalling = api.model('Message', {
    "content": fields.String(),
})
