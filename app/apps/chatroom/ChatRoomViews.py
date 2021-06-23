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

@namespace.route("/open_sent_requests/<int:person>")
class ChatRoomRequestsAPI(Resource):
    @namespace.marshal_with(chatroom_marshalling)
    def get(self, person: int):
        open_sent_requests = ChatRoomAdministration.get_open_sent_requests(person=person)
        return open_sent_requests

@namespace.route("/accept_request/<int:chatroom>/<int:person>")
class ChatRoomRequestsAPI(Resource):
    """Basic API for requests."""
    @namespace.marshal_with(chatroom_marshalling)
    def put(self, person: int, chatroom: int):
        accept_open_request = ChatRoomAdministration.accept_open_request(person=person, chatroom= chatroom)
        return accept_open_request



@namespace.route("/chatroom_to_delete/<int:chatroom>/<int:person>")
class ChatRoomRequestsAPI(Resource):
    @api.marshal_with(chatroom_marshalling, code=200)
    @api.expect(chatroom_marshalling)
    #@secured
    def delete(self, chatroom: int, person: int):
        """Delete singlechat."""
        ChatRoomAdministration.delete_singlechat(chatroom=chatroom,person=person)
        return '', 200

@namespace.route("/delete_sent/<int:chatroom>/<int:person>")
class ChatRoomRequestsAPI(Resource):
    @api.marshal_with(chatroom_marshalling, code=200)
    @api.expect(chatroom_marshalling)
    #@secured
    def delete(self, person:int, chatroom:int) -> dict:
        """Delete sent request."""
        ChatRoomAdministration.delete_sent_request(chatroom = chatroom, person=person)
        return '', 200

@namespace.route("/delete_received/<int:chatroom>/<int:person>")
class ChatRoomRequestsAPI(Resource):
    @namespace.marshal_with(chatroom_marshalling)
    def delete(self, person: int, chatroom: int):
        """Delete received request."""
        reject_open_request = ChatRoomAdministration.reject_received_request(chatroom = chatroom,person=person)
        return reject_open_request

