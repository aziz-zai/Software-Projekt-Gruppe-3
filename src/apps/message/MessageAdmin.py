from .MessageMapper import MessageMapper
from .MessageBO import Message

class MessageAdmin(object):


    def __init__(self):
            pass
    
    def create_message(self, content):
        """Einen Message erstellen"""
        message = Message()
        message.set_content(content)
        

        return MessageMapper.insert(message)

    def get_all_messages(self):

        return MessageMapper.find_all()