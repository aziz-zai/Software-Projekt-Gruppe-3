from app.apps.core.business_object import BusinessObject


class GroupObject(BusinessObject):
    def __init__(self, groupname: str, id_: int=0):
        self.groupname = groupname
        super().__init__(id_=id_)
