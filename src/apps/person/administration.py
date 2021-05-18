from .mapper import PersonMapper
from .business_object import Person

class Administration(object):


    def __init__(self):
            pass
    
    def create_person(self, firstname, lastname, semester):
        """Create a Person"""
        person = Person()
        person.set_firstname(firstname)
        person.set_lastname(lastname)
        person.set_semester(semester)


        return PersonMapper.insert(person)

    def get_all_persons(self):

        return PersonMapper.find_all()
    
    

