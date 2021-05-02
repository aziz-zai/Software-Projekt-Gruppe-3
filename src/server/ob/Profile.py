from server.bo import BusinessObject as bo


class Profile (bo.BusinessObject):

    def __init__(self):
        super().__init__()
        self._profileID = None  # Fremdschlüsselbeziehung 

    def get_profile(self):
        """Auslesen des Fremdschlüssels zum Kontoinhaber."""
        return self._owner

    def set_profile(self, person):
        """Setzen des Fremdschlüssels zum Kontoinhaber."""
        self._profile = profile

    def __str__(self):
        """Erzeugen einer einfachen textuellen Repräsentation der jeweiligen Kontoinstanz."""
        return "Profile: {}, owned by {}".format(self.get_id(), self._owner)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in ein Account()."""
        obj = Account()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_owner(dictionary["owner"])
        return obj
