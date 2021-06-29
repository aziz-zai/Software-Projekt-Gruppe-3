from dns.tsig import validate
from app.apps.core.auth import AuthView
from app.configs.base import api
from .MessageMarshalling import message_marshalling, message_create_marshalling
from .MessageBO import MessageObject
from .MessageAdministration import MessageAdministration



namespace = api.namespace(
    "/message",
    description="Namespace for message APIs."
)


@namespace.route("/<int:is_singlechat>/<int:thread_id>/<int:person>/<string:content>")
class MessageAPI(AuthView):
    """Basic API for message."""

    @api.marshal_with(message_marshalling, code=201)
    @api.expect(message_marshalling)
    def post(self, is_singlechat: int, thread_id: int, person: int, content: str) -> dict:
        """Create Message Endpoint."""
        message = MessageObject(
            thread_id=thread_id,
            is_singlechat=bool(is_singlechat),
            sender=person,
            content=content,
        )
        message = MessageAdministration.insert_message(message=message)
        return message


@namespace.route("/<int:is_singlechat>/<int:thread_id>")
class GetMessageAPI(AuthView):
    @api.marshal_with(message_marshalling)
    def get(self, is_singlechat: int, thread_id: int):
        """Get Messages of a singlechat or groupchat"""
        return MessageAdministration.get_all_messages_for_thread_person(
            thread_id=thread_id, is_singlechat=bool(is_singlechat)
        )
