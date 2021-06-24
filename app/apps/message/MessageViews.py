from flask_restx import Resource
from app.configs.base import api
from .MessageMarshalling import message_marshalling
from .MessageBO import MessageObject
from .MessageAdministration import MessageAdministration


namespace = api.namespace(
    "/message",
    description="Namespace for message APIs."
)


@namespace.route("/<int:is_singlechat>/<int:thread_id>")
class MessageAPI(Resource):
    """Basic API for message."""

    @api.marshal_with(message_marshalling, code=201)
    @api.expect(message_marshalling)
    def post(self, singlechat: int, thread_id: int) -> dict:
        """Create Message Endpoint."""
        message = MessageObject(**api.payload)
        message = MessageAdministration.insert_message(message=message)
        return message

    def get(self, singlechat: int, thread_id: int):
        """Get Messages of a singlechat or groupchat"""
        pass
