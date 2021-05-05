from server.bo import BusinessObject as bo
from server.bo import Conversation

class Conversation (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._personID = None #Fremdschlüssel von Profile
        self._conversationstatus = False #boolean
        self._groupID = ""

    def get_personID(self):
        """Auslesen des Fremdschlüssels von Person"""
        return self._personID 

    def set_personID(self,person):
        self._profileID = profile

    def get_conversationstatus(self):
        return self._conversationstatus

    def set_conversationstatus(self, _conversationstatus):
        self._conversationstatus = _conversationstatus

    def accept_conversation(self, boolean):
        return self._conversation(True)

    def reject_conversation(self, boolean):
        return self._conversation(False) #soll hier die Ausgabe als rejected markiert werden?

    def __str__(self):
        return "Person: {}, {}, {}, {}".format(self.get_id(), self.get_personID, self.get_conversationstatus, self.get_conversation)

        
    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Conversation()
        obj.set_id(dictionary["id"])  
        obj.set_personID(dictionary["personID"])
        obj.set_conversationstatus(dictionary["conversationstatus"])
        return obj