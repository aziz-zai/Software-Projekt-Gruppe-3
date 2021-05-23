from flask_restx import fields
from app.configs.base import api


message_marshalling = api.inherit('Message', {
    "content": fields.String()
})
