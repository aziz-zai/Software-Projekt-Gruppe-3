from datetime import datetime
from app.apps.core.business_object import BusinessObject


class ChatRoomObject(BusinessObject):
    """Class for Chatroom."""
    def __init__(self, is_open: bool, is_accepted: bool, sender: int, receiver: int, timestamp: datetime.now,
                 id_: int = 0):
        self.id_ = id_
        self.is_accepted = is_accepted
        self.is_open = is_open
        self.sender = sender
        self.receiver = receiver
        self.timestamp = timestamp

        super().__init__(id_=id_)
