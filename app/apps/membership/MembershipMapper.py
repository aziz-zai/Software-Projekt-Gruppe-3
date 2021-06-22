from app.apps.core.mapper import Mapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector



class MembershipMapper(Mapper):
    def find_by_profile(cnx: db_connector, profile: int):
        result=[]
        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, learning_group, profile from `mydb`.`membership` 
        WHERE profile=%s
        """
        cursor.execute(command,(profile, ))
        tuples = cursor.fetchall()

        for (id, learning_group, profile) in tuples:
            membership = MembershipObject(
            id_=id,
            learning_group = learning_group,
            profile = profile)
            result.append(membership)

        cnx.commit()
        cursor.close()

        return result

    def find_by_groupID(cnx: db_connector, groupID: int):
        result=[]
        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, learning_group, profile from `mydb`.`membership` 
        WHERE learning_group=%s
        """
        cursor.execute(command,(groupID, ))
        tuples = cursor.fetchall()

        for (id, learning_group, profile) in tuples:
            membership = MembershipObject
            membership.id_=id
            membership.learning_group = learning_group
            membership.profile = profile
            result.append(membership)

        cnx.commit()
        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: MembershipObject) -> MembershipObject:
        """Create Membership Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO membership (
                learning_group, profile
            ) VALUES (%s,%s)
        """
        cursor.execute(command, (
            object.learning_group,
            object.profile
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM membership")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
