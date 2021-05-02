from server.bo import BusinessObject as bo

class Profile (bo.BusinessObject):
    def __init__(self):
        super().__init__()
        self._interests = ""
        self._type = ""
        self._online = ""
        self._frequenz = ""
        self._expertise = ""
        self._extroversion = ""
    
    def get_interests(self):
        return self._interests
    
    def set_interests(self,value):
        self._interests = value
    
    def get_type(self):
        return self._type
    
    def set_type(self,value):
        self._interests = value
    
    def get_online(self):
        return self._online
    
    def set_online(self,value):
        self._online = value
    
    def get_frequenz(self):
        return self._frequenz
    
    def set_frequenz(self,value):
        self._frequenz = value
    
    def get_expertise(self):
        return self._expertise
    
    def set_expertise(self,value):
        self._expertise = value
    
    def get_extroversion(self):
        return self._extroversion
    
    def set_extroversion(self,value):
        self._extroversion = value
