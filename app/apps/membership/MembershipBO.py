from app.apps.core.business_object import BusinessObject


class MembershipObject(BusinessObject):
    def __init__(self, learning_group: int, person: int,
                 id_: int= 0):
        self.learning_group = learning_group
        self.person = person

        super().__init__(id_=id_)
