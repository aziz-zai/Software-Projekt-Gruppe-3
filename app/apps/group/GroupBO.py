from app.apps.core.business_object import BusinessObject


class GroupObject(BusinessObject):
    def __init__(self, personID:int, groupID:int):
        self.personID = personID
        self.groupID= groupID
        super().__init__()
