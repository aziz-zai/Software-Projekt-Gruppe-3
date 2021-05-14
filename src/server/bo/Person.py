from server.bo import BusinessObject as bo
from server.bo import Profile

class Person (bo.BusinessObject):
    
    def __init__(self):
        super().__init__()
        self._profile = None #Fremdschlüssel von Profile
        self._firstname = "" #Name der Person
        self._surname = "" #Nachname der Person
        self._semester = None #Semester 

    def get_profile(self):
        """Auslesen des Fremdschlüssels von Profile"""
        return self._profile
    
    def set_profile(self,profile):
        self._profile = profile

    def get_firstname(self):
        return self._firstname

    def set_firstname(self, firstname):
        self._firstname = firstname

    def get_surname(self):
        return self._firstname

    def set_surname(self, surname):
        self._surname = surname

    def get_semester(self):
        return self._semester

    def set_semester(self, semester):
        self._semester = semester

    def __str__(self):
        return "Person: {}, {}, {}, {}, {}".format(self.get_id(), self.get_profile, self.get_firstname, self.get_surname, self.get_semester)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Person()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_profile(dictionary["profile"])
        obj.set_firstname(dictionary["firstname"])
        obj.set_surname(dictionary["surname"])
        obj.set_semester(dictionary["semester"])
        return obj