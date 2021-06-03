from app.apps.core.business_object import BusinessObject


class ConversationObject(BusinessObject):
    def __init__(self, conversationstatus: bool, group: int, person: int, id_: int=0):
        self.conversationstatus = conversationstatus
        self.group = group
        self.person = person
        super().__init__(id_=id_)
