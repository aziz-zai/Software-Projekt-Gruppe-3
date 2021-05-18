from src.core.business_object import BusinessObject

class Person (BusinessObject):
    def __init__(self):
        super().__init__()
        self._firstname = ""
        self._lastname = ""
        self._semester = int

    def get_firstname(self):
        return self._firstname

    def set_firstname(self, value):
        self._firstname = value

    def get_lastname(self):
        return self._lastname

    def set_lastname(self, value):
        self._lastname = value

    def get_semester(self):
        return self._semester

    def set_semester(self, value):
        self._semester = value

    def __str__(self):
        return "Person: {}, {}, {}, {}, {}, {}, {}".format(
            self.get_id(),
            self.get_firstname(),
            self.get_lastname(),
            self.get_semester()
        )