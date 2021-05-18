from flask_restx import fields
from src.configs.base import api 

conversation_marshalling = api.inherit('Conversation', {
    'person_id': fields.Integer(attribute='person_id', description='person_id of conversation', required=True, readOnly=True),
    'group_id': fields.Integer(attribute='group_id', description='group_id of conversation', required=True, readOnly=True),
    'conversationsstatus': fields.Integer(attribute='person_id', description='person_id of conversation', required=True)
})  