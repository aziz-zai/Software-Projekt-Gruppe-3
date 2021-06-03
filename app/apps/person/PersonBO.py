from app.apps.core.business_object import BusinessObject


class PersonObject(BusinessObject):
    def __init__(self, firstname: str, lastname: str, id_: int= 0):
        self.firstname = firstname
        self.lastname = lastname

        super().__init__(id_=id_)
        
