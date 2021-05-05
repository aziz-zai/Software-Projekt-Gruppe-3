from abc import ABC, abstractmethod

class  BusinessObject(ABC):

    def __init__(self):
        self._id = 0

    def get_id(self):
        return self.id

    def set_id(self,value):
        self._id = value




