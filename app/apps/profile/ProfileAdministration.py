from .ProfileMapper import ProfileMapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector
from app.apps.person.PersonBO import PersonObject
from app.apps.group.GroupMapper import GroupMapper
from app.apps.membership.MembershipMapper import MembershipMapper

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
    def get_profile_of_person(person: int) -> ProfileObject:
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.find_by_personID(cnx=cnx, person=person)
    
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
    
    @staticmethod
    def matching(person: int):
        with db_connector as db:
            cnx = db._cnx
            myProfile = ProfileMapper.find_by_personID(cnx=cnx, person=person)
            profileList = ProfileMapper.find_all(cnx=cnx)
        result = []
        personList = []
        groupList = []
        profile = ProfileObject
        for profile in profileList:
            if profile.person != person:
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
                    value += 0
                value = value/6*100
                if value >= 50:
                    result.append(profile)

        for profile in result:
            personList.append(profile)

        with db_connector as db:
            cnx = db._cnx
            all_groups = GroupMapper.find_all(cnx=cnx)

        for group in all_groups:
            with db_connector as db:
                cnx = db._cnx
                membershipList = MembershipMapper.find_by_groupID(cnx=cnx, groupID=group.id_)
            value = 0
            for person in personList:
                for membership in membershipList:
                    if (membership.person == person.person):
                        value += 1
                    else:
                        value += 0
            if (len(membershipList) > 0):
                value = value/len(membershipList)*100
            else:
                print('group' ' ' + str(group.id_) + ' ' 'has no member')
            if value >= 50:
                groupList.append(group)

        return personList, groupList
