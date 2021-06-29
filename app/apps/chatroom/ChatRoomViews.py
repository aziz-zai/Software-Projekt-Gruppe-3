from os import name
from app.configs.base import api
from .ChatRoomMarshalling import chatroom_marshalling
from .ChatRoomBO import ChatRoomObject
from .ChatRoomAdministration import ChatRoomAdministration
from app.apps.core.auth import AuthView

namespace = api.namespace(
    "/chatroom",
    description="Namespace for chatroom APIs."
)


@namespace.route("/receiver/<int:receiver>")
class ChatRoomSingleChats(AuthView):
    """Sent A Singlechat-Request"""
    @namespace.marshal_with(chatroom_marshalling)
    def post(self, receiver: int):
        singlechat = ChatRoomAdministration.insert_chatroom(sender=self.person.id_, receiver=receiver)
        return singlechat

@namespace.route("/singlechat/<int:chatroom>")
class ChatRoomSingleChats(AuthView):
    """Get A Single Chat"""
    @namespace.marshal_with(chatroom_marshalling)
    def get(self, chatroom):
        singlechat = ChatRoomAdministration.get_single_chat(chatroom)
        return singlechat

@namespace.route("/singlechats")
class ChatRoomAllSingleChats(AuthView):
    """Sent All Singlechats"""
    @namespace.marshal_with(chatroom_marshalling)
    def get(self):
        person_chat_list = ChatRoomAdministration.get_single_chats(person=self.person.id_)
        return person_chat_list

@namespace.route("/open_received_requests")
class ChatRoomReceivedRequests(AuthView):
    """Get All Received Requests"""
    @namespace.marshal_with(chatroom_marshalling)
    def get(self):
        open_received_requests = ChatRoomAdministration.get_open_received_requests(person=self.person.id_)
        return open_received_requests

@namespace.route("/open_sent_requests")
class ChatRoomSentRequests(AuthView):
    """Get All Sent Requests"""
    @namespace.marshal_with(chatroom_marshalling)
    def get(self):
        open_sent_requests = ChatRoomAdministration.get_open_sent_requests(person=self.person.id_)
        return open_sent_requests

@namespace.route("/accept_request/<int:chatroom>")
class ChatRoomAcceptRequest(AuthView):
    """Accept A Received Request"""
    @namespace.marshal_with(chatroom_marshalling)
    def put(self, chatroom: int):
        accept_open_request = ChatRoomAdministration.accept_open_request(person=self.person.id_, chatroom=chatroom)
        return accept_open_request

@namespace.route("/chatroom_to_delete/<int:chatroom>")
class ChatRoomDelete(AuthView):
    """Delete A Singlechat"""
    @api.marshal_with(chatroom_marshalling, code=200)
    @api.expect(chatroom_marshalling)
    def delete(self, chatroom: int):
        """Delete singlechat."""
        ChatRoomAdministration.delete_singlechat(chatroom=chatroom, person=self.person.id_)
        return '', 200

@namespace.route("/delete_sent/<int:chatroom>")
class ChatRoomDeleteSentRequest(AuthView):
    """Delete A Sent Request"""
    @api.marshal_with(chatroom_marshalling, code=200)
    @api.expect(chatroom_marshalling)
    def delete(self, chatroom: int) -> dict:
        """Delete sent request."""
        ChatRoomAdministration.delete_sent_request(chatroom=chatroom, person=self.person.id_)
        return '', 200

@namespace.route("/delete_received/<int:chatroom>")
class ChatRoomDeleteReceivedRequest(AuthView):
    @namespace.marshal_with(chatroom_marshalling)
    def delete(self, chatroom: int):
        """Delete received request."""
        reject_open_request = ChatRoomAdministration.reject_received_request(chatroom=chatroom, person=self.person.id_)
        return reject_open_request
