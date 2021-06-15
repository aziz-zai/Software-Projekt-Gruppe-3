from .ProfileMapper import ProfileMapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector
from app.apps.person.PersonBO import PersonObject



class ProfileAdministration:
    """Profile Manager class. For managing database interactions."""

    @staticmethod
    def insert_profile(profile: ProfileObject, person: PersonObject) -> ProfileObject:
        """Insert Profile Manager."""
        with db_connector as db:
            cnx = db._cnx
            profile = ProfileObject()
            profile.person = person.id_
            return ProfileMapper.insert(cnx=cnx, object=profile)
    
    @staticmethod
    def get_profile_of_person(person: PersonObject) -> ProfileObject:
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.find_by_personID(cnx=cnx, person = person.id_)
    
    @staticmethod
    def update_profile(profile: ProfileObject) -> ProfileObject:
        with db_connector as db:
            cnx= db._cnx
            return ProfileMapper.update(cnx=cnx, object=profile)

    @staticmethod
    def get_all_profiles():
        with db_connector as db:
            cnx= db._cnx
            return ProfileMapper.find_all(cnx=cnx)


class Matchmaking:
    """Matchmaking class for managing matches"""
    @staticmethod
    def matchmaking(person: PersonObject) -> ProfileObject:
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.find_by_personID(cnx=cnx, person = person.id_)

           

from .profile.ProfileMapper import ProfileMapper
from app.configs.base import db_connector
from app.apps.profile.ProfileBO import ProfileObject

@staticmethod
def matching(person):

    with db_connector as db:
        cnx = db._cnx
        myProfile = ProfileMapper.find_by_personID(cnx= cnx, person = person)    
        profileList = ProfileMapper.find_all(cnx= cnx, person=person)

    result = []         
    personList = []     
    groupList = []

    for profile in profileList:
        profile = ProfileObject
        value = 0  

        if profile.interests == myProfile.interests:
            value += 1
        if profile.type_ == myProfile.type_:
            value += 1
        if profile.online == myProfile.online:
            value += 1
        if profile.frequency == myProfile.frequency:
            value += 1
        if profile.expertise == myProfile.expertise:
            value += 1
        if profile.extroversion == myProfile.extroversion:
            value += 1
        else: 
            value +=0
        if value >= 3:
            result.append(profile)