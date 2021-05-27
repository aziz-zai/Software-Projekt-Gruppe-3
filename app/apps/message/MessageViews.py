from flask_restx import Resource
from app.configs.base import api
from .MessageMarshalling import message_marshalling
from .MessageBO import MessageObject
from .MessageAdministration import MessageAdministration


namespace = api.namespace(
    "/message",
    description="Namespace for message APIs."
)


@namespace.route("/")
class MessageAPI(Resource):
    """Basic API for message."""

    @api.marshal_with(message_marshalling, code=201)
    @api.expect(message_marshalling)
    def post(self) -> dict:
        """Create Message Endpoint."""
        message = MessageObject(**api.payload)
        message = MessageAdministration.insert_message(message=message)
        return message
