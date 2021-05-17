from src.core.business_object import BusinessObject

class Profile (BusinessObject):
    def __init__(self, owner: None, interests: str, type_: str, online: bool, frequency: str, expertise: str, extroversion: str ):
        super().__init__()
        self._owner = None
        self._interests = ""
        self._type_ = ""
        self._online = ""
        self._frequency = ""
        self._expertise = ""
        self._extroversion = ""

    def get_owner(self):
        return self._owner

    def set_owner(self,value):
        self._owner = value

    def get_interests(self):
        return self._interests

    def set_interests(self,value):
        self._interests = value

    def get_type_(self):
        return self._type

    def set_type_(self,value):
        self._interests = value

    def get_online(self):
        return self._online

    def set_online(self,value):
        self._online = value

    def get_frequency(self):
        return self._frequency

    def set_frequency(self,value):
        self._frequency = value

    def get_expertise(self):
        return self._expertise

    def set_expertise(self,value):
        self._expertise = value

    def get_extroversion(self):
        return self._extroversion

    def set_extroversion(self,value):
        self._extroversion = value

    def __str__(self):
        return "Person: {}, {}, {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_owner(),
            self.get_frequency,
            self.get_interests,
            self.get_extroversion,
            self.get_expertise,
            self.get_online,
            self.get_type_)
