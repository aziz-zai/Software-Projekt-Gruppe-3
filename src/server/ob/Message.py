from server.bo import BusinessObject as bo
from server.bo import Conversation

class Message():

    def __init__(self):
        self._id = 0

    def get_Content(self):
        return self._Content

    def set_Content(self):
        self._Content = value