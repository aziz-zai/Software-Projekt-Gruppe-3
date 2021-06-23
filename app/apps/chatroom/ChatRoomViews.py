from os import name
from app.apps.core.SecurityDecorator import secured
from flask_restx import Resource
from app.configs.base import api
from .ChatRoomMarshalling import chatroom_marshalling
from .ChatRoomBO import ChatRoomObject
from app.apps.core.SecurityDecorator import secured
from .ChatRoomAdministration import ChatRoomAdministration

namespace = api.namespace(
    "/chatroom",
    description="Namespace for chatroom APIs."
)

@namespace.route("/singlechats/<int:person>")
class ChatRoomOperation(Resource):
    @namespace.marshal_with(chatroom_marshalling)
    #@secured
    def get(self, person):
        person_chat_list = ChatRoomAdministration.get_single_chats(person)
        return person_chat_list

@namespace.route("/open_received_requests/<int:person>")
class ChatRoomOperation(Resource):
    @namespace.marshal_with(chatroom_marshalling)
    #@secured
    def get(self, person: int):
        open_received_requests = ChatRoomAdministration.get_open_received_requests(person=person)
        return open_received_requests

    

@namespace.route("/<int:person>/<int:receiver>")
class ChatRoomRequestsAPI(Resource):
    """Basic API for requests."""
    @namespace.marshal_with(chatroom_marshalling)
    #@secured
    def get(self, person: int, receiver: int):
        open_received_requests = ChatRoomAdministration.get_open_received_requests(person=receiver)
        return open_received_requests

    @namespace.marshal_with(chatroom_marshalling)
    def get(self, person: int, sender: int):
        sender=person
        open_sent_requests = ChatRoomAdministration.get_open_sent_requests(person=sender)
        return open_sent_requests
    
    @namespace.marshal_with(chatroom_marshalling)
    def put(self, person: int, receiver: int):
        receiver=person
        reject_open_request = ChatRoomAdministration.reject_open_request(person=receiver)
        return reject_open_request
    
    @namespace.marshal_with(chatroom_marshalling)
    def put(self, person: int, receiver: int):
        receiver=person
        accept_open_request = ChatRoomAdministration.accept_open_request(person=receiver)
        return accept_open_request

    @api.marshal_with(chatroom_marshalling, code=200)
    @api.expect(chatroom_marshalling)
    #@secured
    def delete(self, sender) -> dict:
        """Delete sent request."""
        ChatRoomAdministration.delete_open_sent_request(person=sender)
        return '', 200

@namespace.route("/chatroom_to_delete/<int:chatroom>/<int:person>")
class ChatRoomRequestsAPI(Resource):
    @api.marshal_with(chatroom_marshalling, code=200)
    @api.expect(chatroom_marshalling)
    #@secured
    def delete(self, chatroom: int, person: int):
        """Delete sent request."""
        ChatRoomAdministration.delete_singlechat(chatroom=chatroom,person=person)
        return '', 200


