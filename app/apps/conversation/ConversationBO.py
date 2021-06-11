from app.apps.core.business_object import BusinessObject


class ConversationObject(BusinessObject):
    def __init__(self, conversationstatus: bool, person: int, id_: int=0, learning_group: int = 0):
        self.conversationstatus = conversationstatus
        self.learning_group = learning_group
        self.person = person
        super().__init__(id_=id_)
