from app.apps.core.business_object import BusinessObject


class MessageObject(BusinessObject):
    def __init__(self, content: str, conversation: int, id_: int = 0):
        self.content = content
        self.conversation = conversation

        super().__init__(id_=id_)
