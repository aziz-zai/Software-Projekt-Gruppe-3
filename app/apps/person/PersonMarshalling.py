from flask_restx import fields
from app.configs.base import api


person_marshalling = api.inherit('Person', {
    "id_": fields.Integer(readOnly=True),
    "firstname": fields.String(),
    "lastname": fields.String(),
    "email": fields.String(),
    "google_user_id": fields.Integer(readOnly=True),
})
