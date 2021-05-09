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
