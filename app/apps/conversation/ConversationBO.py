from app.apps.core.business_object import BusinessObject


class ConversationObject(BusinessObject):
    def __init__(self, conversationstatus: bool, groupID: int, personID: int, id_: int=0):
        self.conversationstatus = conversationstatus
        self.groupID = groupID
        self.personID = personID
        super().__init__(id_=id_)
