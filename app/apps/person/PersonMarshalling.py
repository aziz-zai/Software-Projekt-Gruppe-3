from flask_restx import fields
from app.configs.base import api


person_marshalling = api.model('Person', {
    "id_": fields.Integer(readOnly=True),
    "email": fields.String(),
    "google_user_id": fields.String(readOnly=True),
})
 