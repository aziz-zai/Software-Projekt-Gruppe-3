from app.apps.core.business_object import BusinessObject


class RequestObject(BusinessObject):
    def __init__(self, sender: int, receiver: int,
                 id_: int = 0, is_accepted: bool = False, is_open: bool = False):
        self.is_accepted = is_accepted
        self.is_open=is_open
        self.sender=sender
        self.receiver=receiver

        super().__init__(id_=id_)
