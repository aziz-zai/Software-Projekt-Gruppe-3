from flask_restx import fields
from app.configs.base import api


message = api.inherit('Message', {
    "content": fields.String(required=True),
})
