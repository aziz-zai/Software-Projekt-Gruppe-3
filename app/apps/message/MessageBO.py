from app.apps.core.business_object import BusinessObject
from datetime import datetime


class MessageObject(BusinessObject):
    """Class for Messages"""
    def __init__(self, content: str, sender: int, thread_id: int,
                 is_singlechat: bool, timestamp: datetime = datetime.now(),  id_: int = 0):
        self.content = content
        self.sender = sender
        self.thread_id = thread_id
        self.is_singlechat = is_singlechat
        self.timestamp = timestamp

        super().__init__(id_=id_)
