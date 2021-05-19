from src.core.business_object import BusinessObject

class Message (BusinessObject):
    def __init__(self, content: str):
        super().__init__()
        self._content = ""

    def get_content(self):
        return self._content

    def set_content(self,value):
        self._content = value


    def __str__(self):
        return "Message: {}".format(
            self.get_content(),
            )