from app.apps.core.business_object import BusinessObject


class ProfileObject(BusinessObject):
    def __init__(self, owner: int, interests: str, type_: str, online: bool,
                 frequence: int, expertise: str, extroversion: str,
                 id_: int = 0):
        self.owner = owner
        self.interests = interests
        self.type_ = type_
        self.online = online
        self.frequence = frequence
        self.expertise = expertise
        self.extroversion = extroversion
        super().__init__(id_=id_)
