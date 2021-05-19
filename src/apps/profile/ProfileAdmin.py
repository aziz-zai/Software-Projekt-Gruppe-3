from apps.person.PersonBO import Person
from .ProfileMapper import ProfileMapper 
from .ProfileBO import Profile

class ProfileAdmin(object):


    def __init__(self):
            pass
    
    def create_profile_for_person(self, person : Person, frequency, interests, extroversion, expertise, online, type_):
        """Einen Benutzer anlegen"""
        profile = Profile()
        profile.set_owner(person.get_id())
        profile.set_frequency(frequency)
        profile.set_interests(interests)
        profile.set_extroversion(extroversion)
        profile.set_expertise(expertise)
        profile.set_online(online)
        profile.set_type_(type_)
        
        return ProfileMapper.insert(profile)

    def get_all_profiles(self):

        return ProfileMapper.find_all()

    def get_profile_of_person(self, person: Person):
     
        return ProfileMapper.find_by_owner_id(person.get_id())
