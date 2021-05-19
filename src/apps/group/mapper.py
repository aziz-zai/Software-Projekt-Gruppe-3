from src.apps.group.business_object import Group
from server.db.Mapper import Mapper


class GroupMapper(Mapper):

    def __init__(self):
        super().__init__()
    
    def find_all(self):
        """
        Auslesen aller Gruppen aus der data base
        :return: a list of group business objects
        """
        result = []
        cursor = self._cnx.cursor()
        statement = "Select * from `Group`"
        cursor.execute(statement)
        tuples = cursor.fetchall()

        try:
            for (id, personID, groupID) in tuples:
                group = Group()
                group.set_id(id)
                group.set_personID(personID)
                group.set_groupID(groupID)
                result.append(group)

        except IndexError:
            result = None 
        self._cnx.commit()
        cursor.close()

        return result 

    def find_all_by_person_id(self, groupID):
        """
        Auslesen aller Gruppen aus dem Data Base von einer Person
        :return: Eine list von group business objects
        """
        groups = []
        cursor = self._cnx.cursor()
        statement = "Select group_idfrom  WHERE Person_ID = {} ".format(int(id))
        cursor.execute(statement)
        tuples = cursor.fetchall()
        
        for groupID in tuples:
            cursor.execute("SELECT * from `Group` WHERE ID = '{}'".format(groupID[0]))
            group = cursor.fetchall()
            try:
                for (id, personID, groupID) in group:
                    group = Group()
                    group.set_id(id)
                    group.set_personID(personID)
                    group.set_groupID(groupID)

                    groups.append(gr)
            except IndexError:
                groups = None 
        
        self._cnx.commit()
        cursor.close()
        return groups 


    def find_by_key(self, key):
        """
        get one specific group from the data base  
        :return: a group business object
        
        """
        result = None
        cursor = self._cnx.cursor()
        command = "SELECT id, groupname FROM `Group` WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, key) = tuples[0]    
            group = Group()
            group.set_id(id)
            group.set_groupID(key)
            result = group
        except IndexError:
            result = None
        
        self._cnx.commit()
        cursor.close()
        return result
    

    def insert(self,group):
        """
        
        
        insert a group business object to the data base  
        :return: a group business objects
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM `Group`")
        tuples = cursor.fetchall()
        for (maxid) in tuples:
            if maxid[0]:
                group.set_id(maxid[0]+1)
            else:
                group.set_id(1)

        command = "INSERT INTO `Group` (ID, personID, groupID) VALUES ('{}', '{}', '{}', NOW())".format(group.get_id(), group.get_personID(), group.get_groupID())

        try:
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return group

        except Exception as e:
            cursor.close()
            return "Error in groupMapper insert: "+str(e)

    def update(self,group):
        """
        
        update a group business object in the data base  
        :return: a group business objects
        """
        cursor = self._cnx.cursor()
        command = "UPDATE `Group` " + "SET personID = %s groupID=%s WHERE id=%s"
        data = (group.get_personID(),group.get_groupID(), group.get_id())
        cursor.execute(command, data)
        self._cnx.commit()
        cursor.close()

        return group

    def delete(self, group):
        """
        
        delete a group business object from the data base  
        :return: str
        """
        try:
            cursor = self._cnx.cursor()
            command = "DELETE FROM `Group` WHERE ID={0}".format(group.get_id())
            cursor.execute(command)

            self._cnx.commit()
            cursor.close()

            return "Group deleted"

        except Exception as e:
            return "Error in delete Group GroupMapper: " + str(e)

    def checkMembership(self,uid,gid):
        """
        Julius 
        checks if an membership exists between a group and an user  
        :return: bool 
        """
        try:
            cursor = self._cnx.cursor()
            command = "SELECT `User_ID`,`Group_ID` FROM dev_shoppingproject.Membership WHERE `User_ID`={0} AND `Group_ID`={1}".format(uid,groupid)
            cursor.execute(command)
            tuples = cursor.fetchall()
            
            if len(tuples) < 1:
                return False
            else:
                return True


        except Exception as e:
            print("exception in checkMembership",e)
            return None


    def createMembership(self,userid,groupid):
        """
        Julius
        creates an membership in db for a specific user an a specific group
        :return: str
        """

        if self.checkMembership(userid,groupid) == False:
            try:
                cursor = self._cnx.cursor()
                command = "INSERT INTO Membership (User_ID,Group_ID) VALUES ('{0}', '{1}')".format(userid,groupid)
                cursor.execute(command)
                self._cnx.commit()
                cursor.close()
                return "added usernr. {0} to groupnr. {1}".format(userid,groupid)
            
            except Exception as e:
                return str(e)
        else:
            print("membership already exists")
            return "membership already exists"
    

    def deleteMembership(self,userid,groupid):
        """
        Julius 
        deletes an membership from db  
        :return: str
        """
        try: 
            cursor = self._cnx.cursor()
            command = "DELETE FROM dev_shoppingproject.Membership WHERE User_ID = {0} AND Group_ID =  {1}".format(userid,groupid)
            cursor.execute(command)
            self._cnx.commit()
            cursor.close()
            return "deleted usernr. {0} to groupnr. {1}".format(userid,groupid)
        
        except Exception as e:
            return str(e)
    
    def get_users_by_gid(self,gid):
        """
        Julius 
        gets all users of one group 
        :return: list of group bos
        """
        try:
            cursor = self._cnx.cursor()
            command = "SELECT User_ID from Membership WHERE Group_ID = {0}".format(gid)
            cursor.execute(command)
            tuples = cursor.fetchall()
            res = []
            result =[]
            for i in tuples:
                res.append(i[0])

            self._cnx.commit()
            cursor.close()
            userids = res 

            """
            in shopping admin: create user objects from ids
            """
            return res 


        except Exception as e:
            print(e) 
            
            return None