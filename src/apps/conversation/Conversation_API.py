from flask_restx import Resource
from flask_restx import fields
from src.configs.base import api


from src.apps.conversation.ConversationAdmin import ConversationAdmin
from .ConversationBO import Conversation
from .ConversationMapper import ConversationMapper
from .ConversationAdmin import ConversationAdmin


namespace = api.namespace(
    "/profile",
    description="Namespace for conversation APIs."
)


conversation_marshalling = api.inherit('Conversation', {
    'person_id': fields.Integer(attribute='person_id', description='person_id of conversation', required=True, readOnly=True),
    'group_id': fields.Integer(attribute='group_id', description='group_id of conversation', required=True, readOnly=True),
    'conversationsstatus': fields.Integer(attribute='person_id', description='person_id of conversation', required=True)
})  



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
        conversations = ConversationAdmin.get_all_conversation()
        return conversations

    @api.marshal_with(conversation_marshalling, code=200)
    @api.expect(conversation_marshalling)
    @api.re
    def post(self) -> dict:
        """Create conversation Endpoint."""
        
        #conversation = ConversationMapper.insert(object=conversation)
        adm = ConversationAdmin()
        conversation = Conversation(api.payload)

        if conversation is not None:
            c = adm.create_conversation(
                conversation.set_person_id(), #Fremdschlüssel
                conversation.set_conversationstatus(),
                conversation.set_group_id())
  
            return c, 200
        else:

            return "", 500