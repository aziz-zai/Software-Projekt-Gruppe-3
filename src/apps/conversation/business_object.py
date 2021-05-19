from src.core.business_object import BusinessObject 

class Conversation (BusinessObject):
    def __init__(self):
        super().__init__()
        self._person_id = None #Fremdschlüssel von Profile 
        self._conversationstatus = False #boolean
        self._group_id = None #Fremdschlüssel

        """Auslesen des Fremdschlüssels von Person"""
    def get_person_id(self):
        return self._person_id

    def set_person_id(self,value):
        self._person_id = value

    def get_conversationstatus(self):
        return self._conversationstatus

    def set_conversationstatus(self, value):
        self._conversationstatus = value

    def get_group_id(self):
        return self._group_id

    def set_group_id(self, value):
        self._group_id = value
    

    def __str__(self):
        return "Connection: {}, {}, {}".format(
            self.get_id(),
            self.get_person_id(),
            self.get_conversationstatus(),
            self.get_group_id()
        )

    