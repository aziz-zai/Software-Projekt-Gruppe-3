from .mapper import ConversationMapper
from .business_object import Conversation

class Administration(object):

    def __init__(self):
            pass

    def create_conversation(self, person_id, group_id, conversationstatus):
        """Conversation anlegen"""
        conversation = Conversation()
        conversation.set_person_id(person_id)
        conversation.set_group_id(group_id)
        conversation.set_conversationstatus(conversationstatus)

        return ConversationMapper.insert(conversation)

    def get_all_conversation(self):


        return ConversationMapper.find_all()