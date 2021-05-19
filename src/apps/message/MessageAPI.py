from flask_restx import fields
from src.configs.base import api

message_marshalling = api.inherit('Message', {
    'content': fields.string(attribute='_content', description='Inhalt einer Nachricht', required=True)
})