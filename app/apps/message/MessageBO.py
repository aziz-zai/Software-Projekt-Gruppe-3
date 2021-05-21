from app.apps.core.business_object import BusinessObject


class MessageObject(BusinessObject):
    def __init__(self, content:str):
        self.content = content
        super().__init__()
