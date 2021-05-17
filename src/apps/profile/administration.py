from .mapper import ProfileMapper
from .business_object import Profile

class Administration(object):


    def __init__(self):
            pass
    
    def create_profile(self, frequency, interests, extroversion, expertise, online, type_):
        """Einen Benutzer anlegen"""
        profile = Profile()
        profile.set_frequency(frequency)
        profile.set_interests(interests)
        profile.set_extroversion(extroversion)
        profile.set_expertise(expertise)
        profile.set_online(online)
        profile.set_type_(type_)
        

        return ProfileMapper.insert(profile)

    def get_all_profiles(self):

        return ProfileMapper.find_all()
    
    

