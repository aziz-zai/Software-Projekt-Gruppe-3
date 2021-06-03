from app.apps.core.business_object import BusinessObject


class MembershipObject(BusinessObject):
    def __init__(self, personID: int, groupID: int, profileID: int,
                 id_: int= 0):
        self.personID = personID
        self.groupID = groupID
        self.profileID = profileID

        super().__init__(id_=id_)
