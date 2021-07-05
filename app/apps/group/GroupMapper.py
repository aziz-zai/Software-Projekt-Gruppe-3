from app.apps.core.mapper import Mapper
from .GroupBO import GroupObject
from app.configs.base import db_connector


class GroupMapper(Mapper):
    def find_all(cnx: db_connector, person: int):
        """Returns all groups"""

        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, groupname, info from `mydb`.`learning_group`
        WHERE id NOT IN (
            SELECT learning_group from membership
            WHERE person=%s
        )
        """
        cursor.execute(command, (person, ))
        tuples = cursor.fetchall()

        for (id, groupname, info) in tuples:
            learning_group = GroupObject(
                id_=id,
                groupname=groupname,
                info=info
            )
            result.append(learning_group)

        cnx.commit()
        cursor.close()

        return result

    def find_by_groupID(cnx: db_connector, learning_group: int):
        """Returns all groups by id."""
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, groupname, info from `mydb`.`learning_group`
        WHERE id=%s
        """
        cursor.execute(command, (learning_group, ))
        entity = cursor.fetchone()

        try:
            (id, info, groupname) = entity
            result = GroupObject(
                id_=id,
                info=info,
                groupname=groupname
            )
        except TypeError:
            result = None

        cnx.commit()
        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: GroupObject) -> GroupObject:
        """Create group Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO learning_group (
                 groupname, info
            ) VALUES (%s, %s)
        """
        cursor.execute(command, (object.groupname, object.info))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM learning_group")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id

        return object

    def delete(cnx: db_connector, learning_group: int):
        """Deletes a group."""
        cursor = cnx.cursor(buffered=True)
        command = ("DELETE FROM learning_group WHERE id=%s")
        try:
            cursor.execute(command, (learning_group,))
        except:
            print("Group does not exist!")

        cnx.commit()
        cursor.close()
