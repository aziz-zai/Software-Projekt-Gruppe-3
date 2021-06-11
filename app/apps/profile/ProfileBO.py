from app.apps.core.business_object import BusinessObject


class ProfileObject(BusinessObject):
    def __init__(self, firstname: str = "", lastname: str = "", person:int = 0, interests: str = "", type_: str = "", online: bool = False,
                 frequency: int = 0, expertise: str = "", extroversion: str = "",
                 id_: int = 0):
        self.firstname = firstname
        self.lastname = lastname
        self.person = person
        self.interests = interests
        self.type_ = type_
        self.online = online
        self.frequency = frequency
        self.expertise = expertise
        self.extroversion = extroversion
        super().__init__(id_=id_)
