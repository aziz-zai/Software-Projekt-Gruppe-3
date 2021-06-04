from app.apps.core.business_object import BusinessObject


class PersonObject(BusinessObject):
    def __init__(self, email: str,
                google_user_id: int, id_: int= 0):
        self.email = email
        self.google_user_id = google_user_id

        super().__init__(id_=id_)
