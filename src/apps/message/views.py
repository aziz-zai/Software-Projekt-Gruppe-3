from flask_restx import Resource
from src.configs.base import api
from .marshalling import message_marshalling
from .business_object import Message
from .mapper import MessageMapper
from .administration import Administration


namespace = api.namespace(
    "/message",
    description="Namespace for message APIs."
)

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class MessageAPI(Resource):
    """Basic API for message."""
    
    @api.marshal_with(message_marshalling)
    def get(self):
        messages = Administration.get_all_messages()
        return messages

    @api.marshal_with(message_marshalling, code=200)
    @api.expect(message_marshalling)
    @api.re
    def post(self) -> dict:
        """Create Message Endpoint."""
        
        #profile = ProfileMapper.insert(object=profile)
        adm = Administration()
        message = Message(api.payload)

        if message is not None:
            p = adm.create_message(
                message.set_content(),
            return p, 200
        else:

            return "", 500