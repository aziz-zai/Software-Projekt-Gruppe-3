from app.apps.core.business_object import BusinessObject
from datetime import datetime


class MembershipObject(BusinessObject):
    def __init__(self, learning_group: int, person: int, timestamp: datetime = datetime.now(),
                 id_: int = 0, is_open: bool = True, is_accepted: bool = False):
        self.learning_group = learning_group
        self.person = person
        self.is_open = is_open
        self.is_accepted = is_accepted
        self.timestamp = timestamp
        super().__init__(id_=id_)
