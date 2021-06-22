from app.apps.core.business_object import BusinessObject


class RequestObject(BusinessObject):
    def __init__(self, is_open: bool, is_accepted: bool ,sender: int, receiver: int,
                 id_: int = 0):
        self.is_accepted = is_accepted
        self.is_open=is_open
        self.sender=sender
        self.receiver=receiver

        super().__init__(id_=id_)
