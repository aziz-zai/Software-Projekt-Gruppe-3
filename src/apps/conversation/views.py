from flask_restx import Resource
from src.configs.base import api
from .marshalling import conversation_marshalling
from .business_object import Conversation
from .mapper import ConversationMapper
from .administration import Administration

namespace = api.namespace(
    "/conversation",
    description= "Namespace for conversation APIs."
)

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class ConversationAPI(Resource):
    """Basic API for conversation."""
    
    @api.marshal_with(conversation_marshalling)
    def get(self):
        conversations = Administration.get_all_conversation()
        return conversations

    @api.marshal_with(conversation_marshalling, code=200)
    @api.expect(conversation_marshalling)
    @api.re
    def post(self) -> dict:
        """Create conversation Endpoint."""
        
        #conversation = ConversationMapper.insert(object=conversation)
        adm = Administration()
        conversation = Conversation(api.payload)

        if conversation is not None:
            c = adm.create_conversation(
                conversation.set_person_id(), #Fremdschlüssel
                conversation.set_conversationstatus(),
                conversation.set_group_id())
  
            return c, 200
        else:

            return "", 500