from app.apps.core.business_object import BusinessObject


class PersonObject(BusinessObject):
    def __init__(self, firstname: str, lastname: str):
        self.firstname = firstname
        self.lastname = lastname
        super().__init__()
