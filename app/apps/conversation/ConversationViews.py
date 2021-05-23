from flask_restx import Resource
from app.configs.base import api
from .ConversationMarshalling import conversation_marshalling
from .ConversationBO import ConversationObject
from .ConversationAdministration import ConversationManager


namespace = api.namespace(
    "/conversation",
    description="Namespace for conversation APIs."
)


@namespace.route("/")
class ProfileAPI(Resource):
    """Basic API for Conversation."""

    @api.marshal_with(conversation_marshalling, code=201)
    @api.expect(conversation_marshalling)
    def post(self) -> dict:
        """Create Conversation Endpoint."""
        conversation = ConversationObject(**api.payload)
        conversation = ConversationManager.insert_conversation(conversation=conversation)
        return conversation
