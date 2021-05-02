from server.bo import BusinessObject as bo
from server.bo import Person

class Group (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._personID = 0  
        self._groupname = "" 

    def get_personID(self):
        return self._personID

    def set_personID(self, personID):
        self._personID = personID

    def get_groupname(self):
        return self._groupname

    def set_groupname(self, groupname)
        self._groupname = groupname
    