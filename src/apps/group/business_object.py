from src.core.business_object import BusinessObject

class Group (BusinessObject):
    def __init__(self, personID: int, groupID: int) :
        super().__init__()
        self._personID = ""
        self._groupID = ""

    def get_personID(self):
        return self._personID

    def set_personID(self,value):
        self._personID = value

    def get_groupID(self):
        return self._groupID

    def set_groupID(self,value):
        self._groupID = value

    

    def __str__(self):
        return "Group: {}, {}".format(
            self.get_personID(),
            self.get_groupID,
        )