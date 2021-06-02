from app.apps.core.business_object import BusinessObject


class ProfileObject(BusinessObject):
    def __init__(self, firstname: str, lastname: str, personID: int, interests: str, type_: str, online: bool,
                 frequency: int, expertise: str, extroversion: str,
                 id_: int = 0):
        self.firstname = firstname
        self.lastname = lastname
        self.personID = personID
        self.interests = interests
        self.type_ = type_
        self.online = online
        self.frequency = frequency
        self.expertise = expertise
        self.extroversion = extroversion
        super().__init__(id_=id_)
