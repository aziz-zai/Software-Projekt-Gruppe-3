from .PersonMapper import PersonMapper
from .PersonBO import Person

class PersonAdmin(object):


    def __init__(self):
            pass
    
    def create_person(self, firstname, lastname):
        """Create a Person"""
        person = Person()
        person.set_firstname(firstname)
        person.set_lastname(lastname)


        return PersonMapper.insert(person)

    def get_all_persons(self):

        return PersonMapper.find_all()
    
    def get_person_by_id(self,id):

        return PersonMapper.find_by_id(id)


