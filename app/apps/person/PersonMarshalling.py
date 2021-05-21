from flask_restx import fields
from app.configs.base import api


person_marshalling = api.inherit('Person', {
    "firstname": fields.Integer(),
    "lastname": fields.Integer(),
})
