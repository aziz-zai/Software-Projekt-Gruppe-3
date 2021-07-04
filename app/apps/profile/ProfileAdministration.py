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
        """Create Profile ."""
        with db_connector as db:
            cnx = db._cnx
            profile = ProfileObject()
            profile.person = person.id_
            return ProfileMapper.insert(cnx=cnx, object=profile)
    
    @staticmethod
    def get_profile_of_person(person: int) -> ProfileObject:
        """Gets Profile of a Person"""
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.find_by_personID(cnx=cnx, person=person)

    @staticmethod
    def update_profile(profile: ProfileObject) -> ProfileObject:
        """Updates Profile of a Person"""
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.update(cnx=cnx, object=profile)

    @staticmethod
    def get_all_profiles():
        """Returns all Profiles"""
        with db_connector as db:
            cnx = db._cnx
            return ProfileMapper.find_all(cnx=cnx)
 
    @staticmethod
    def matching(person: int):
        """Matching of Profiles and Groups"""
        with db_connector as db:
            cnx = db._cnx
            myProfile = ProfileMapper.find_by_personID(cnx=cnx, person=person) #Get your own profile
            profileList = ProfileMapper.find_all(cnx=cnx) #Get all other profiles
        result = []             
        personList = []
        groupList = []
        profile = ProfileObject
        for profile in profileList: #Compare each profile attribute with your own profile attributes
            if profile.person != person: 
                value = 0
                if profile.type_ == myProfile.type_:
                    value += 1 #If profile attribute matches increase value + 1
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
                value = value/5*100      #Matching value in percentage
                if value >= 50:
                    result.append(profile)      #If matching value is above 50% then push to result

        for profile in result:
            personList.append(profile)     #Matching personlist is result

        with db_connector as db:
            cnx = db._cnx
            all_groups = GroupMapper.find_all(cnx=cnx, person=myProfile.id_) #Find all groups

        for group in all_groups:
            with db_connector as db:
                cnx = db._cnx
                membershipList = MembershipMapper.find_by_groupID(cnx=cnx, groupID=group.id_) #Find all members for each group
            value = 0
            for person in personList:               #For each Person in matching personlist compare if its a member of the membership membershipList

                for membership in membershipList:
                    if (membership.person == person.person):
                        value += 1                  #If matching person is a member of the membershipList then increase value + 1
                    else:
                        value += 0
            if (len(membershipList) > 0):
                value = value/len(membershipList)*100       #Value in percentage
            else:
                print('group' ' ' + str(group.id_) + ' ' 'has no member')
            if value >= 50:
                groupList.append(group)     #if 50% of the group members are persons from the matching personList then add group to matching groupList

        return personList, groupList
