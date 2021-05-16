from flask_restx import fields
from src.server.configs import api


Message = api.inherit('Message', {
    "content": fields.String(required=True),
})
