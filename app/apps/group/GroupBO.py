from app.apps.core.business_object import BusinessObject


class GroupObject(BusinessObject):
    def __init__(self, id_:int, groupname:str):
        self.id_ = id_
        self.groupname= groupname
        super().__init__(id_=id_)
