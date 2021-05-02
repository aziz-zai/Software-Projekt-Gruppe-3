from server.bo import BusinessObject as bo
from server.bo import Conversation

class Message():

    def __init__(self):
        self._content = ""

    def get_content(self):
        return self._Content

    def set_content(self):
        self._Content = value

    def __str__(self):
        return "Message: {}, {},".format(self.get_id(), self.get_Content)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Message()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_content(dictionary["content"])
        return obj