from app.apps.core.business_object import BusinessObject


class GroupObject(BusinessObject):
    """Class for Group."""
    def __init__(self, groupname: str, info: str, id_: int = 0):
        self.groupname = groupname
        self.info = info
        super().__init__(id_=id_)
