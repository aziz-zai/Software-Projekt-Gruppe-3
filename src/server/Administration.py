from .bo.Profile import Profile

from .db.ProfileMapper import ProfileMapper




class Administration (object):

    def _init_(self):
        pass

    def create_profile(self, id, frequence, interests):

        Profile = Profile()
        Profile.set_id(1)
        Profile.set_frequence(frequence)
        Profile.set_interests(interests)

        with ProfileMapper() as Profilemapper:
            return Profilemapper.insert(Profile)
    
    def create_person(self, id, firstname, surname):
        
        Person = Person()
        Person.set_id(1)
        Person.set_firstname(firstname)
        Person.set_surname(surname)

        with PersonMapper() as Personmapper:
            return PersonMapper.insert(Person)