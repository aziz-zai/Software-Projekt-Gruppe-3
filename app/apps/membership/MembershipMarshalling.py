from flask_restx import fields
from app.configs.base import api


membership_marshalling = api.model('Membership', {
    "id_": fields.Integer(readOnly=True),
    "learning_group": fields.Integer(readOnly=True),
    "person": fields.Integer(readOnly=True)
})


membership_person_marshalling = api.model('Membership', {
    "person": fields.Integer(required=True)
})
