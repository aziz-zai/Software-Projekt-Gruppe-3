from app.apps.core.business_object import BusinessObject


class MessageObject(BusinessObject):
    def __init__(self, content: str, conversationID: int, id_: int = 0):
        self.content = content
        self.conversationID = conversationID

        super().__init__(id_=id_)
