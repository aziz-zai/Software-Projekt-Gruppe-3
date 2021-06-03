from app.apps.core.business_object import BusinessObject


class MembershipObject(BusinessObject):
    def __init__(self, person: int, group: int, profile: int,
                 id_: int= 0):
        self.person = person
        self.group = group
        self.profile = profile

        super().__init__(id_=id_)
