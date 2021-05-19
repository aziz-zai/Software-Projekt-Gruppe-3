from flask_restx import Resource
from flask_restx import fields
from src.configs.base import api
from .MessageBO import Message
from .MessageMapper import MessageMapper
from .MessageAdmin import MessageAdmin

namespace = api.namespace(
    "/message",
    description="Namespace for message APIs."
)

message_marshalling = api.inherit('Message', {
    'content': fields.String(attribute='_content', description='Inhalt einer Nachricht', required=True)
})

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class MessageAPI(Resource):
    """Basic API for message."""
    
    @api.marshal_with(message_marshalling)
    def get(self):
        messages = MessageAdmin.get_all_messages()
        return messages

    @api.marshal_with(message_marshalling, code=200)
    @api.expect(message_marshalling)
    @api.re
    def post(self) -> dict:
        """Create Message Endpoint."""
        
        adm = MessageAdmin()
        message = Message(api.payload)

        if message is not None:
            p = adm.create_message(
                message.set_content()),
            return p, 200
        else:

            return "", 500