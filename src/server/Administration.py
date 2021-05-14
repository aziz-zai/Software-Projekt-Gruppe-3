from .bo.Profile import Profile

from .bo.Person import Person

from .db.ProfileMapper import ProfileMapper




class Administration (object):

    def _init_(self):
        pass

    def create_profile(self, id, frequence, interests):

        profile = Profile()
        profile.set_id(1)
        profile.set_frequence(frequence)
        profile.set_interests(interests)

        with ProfileMapper() as Profilemapper:
            return Profilemapper.insert(Profile)
    
    def create_person(self, id, firstname, surname):
        
        person = Person()
        person.set_id(1)
        person.set_firstname(firstname)
        person.set_surname(surname)

        with PersonMapper() as Personmapper:
            return PersonMapper.insert(Person)