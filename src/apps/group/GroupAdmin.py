from .GroupMapper import GroupMapper
from .GroupBO import Group

class GroupAdmin(object):


    def __init__(self):
            pass
    
    def create_Group(self, personID, groupID):
        """Eine Gruppe anlegen"""
        Group = Group()
        Group.set_personID(personID)
        Group.set_groupID(groupID)
        

        return GroupMapper.insert(Group)

    def get_all_Groups(self):

        return GroupMapper.find_all()
    
    