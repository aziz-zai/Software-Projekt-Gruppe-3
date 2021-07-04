from app.apps.core.mapper import Mapper
from .MembershipBO import MembershipObject
from app.apps.group.GroupBO import GroupObject
from app.configs.base import db_connector


class MembershipMapper(Mapper):
    """Mapper Class for MembershipObjects"""
    def find_by_person(cnx: db_connector, person: int):
        """Gets Membership by id 'person'."""
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, groupname, info from learning_group
            WHERE id IN(
                SELECT learning_group from membership
                WHERE person=%s AND is_open=%s AND is_accepted=%s
            )
            """
        cursor.execute(command, (person, False, True))
        tuples = cursor.fetchall()

        for (id, groupname, info) in tuples:
            group = GroupObject(
                id_=id,
                groupname=groupname,
                info=info,
            )
            result.append(group)

        cnx.commit()
        cursor.close()

        return result

    def find_by_groupID(cnx: db_connector, groupID: int):
        """Gets membership by group id."""
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, learning_group, person, is_open, is_accepted, timestamp from `mydb`.`membership`
            WHERE learning_group=%s AND is_open=%s AND is_accepted=%s
        """
        cursor.execute(command, (groupID, False, True))
        tuples = cursor.fetchall()

        for (id, learning_group, profile, is_open, is_accepted, timestamp) in tuples:
            membership = MembershipObject(
                id_=id,
                learning_group=learning_group,
                person=profile,
                is_open=is_open,
                is_accepted=is_accepted,
                timestamp=timestamp
            )
            result.append(membership)

        cnx.commit()
        cursor.close()

        return result

    def find_all_requests(cnx: db_connector, learning_group: int):
        """Gets all group requests."""
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, learning_group, person, is_open, is_accepted, timestamp from `mydb`.`membership`
            WHERE learning_group=%s AND is_open=%s AND is_accepted=%s
        """
        cursor.execute(command, (learning_group, True, False))
        tuples = cursor.fetchall()

        for(id, learning_group, person, is_open, is_accepted, timestamp) in tuples:
            membership = MembershipObject(
                id_=id,
                learning_group=learning_group,
                person=person,
                is_open=is_open,
                is_accepted=is_accepted,
                timestamp=timestamp
            )
            result.append(membership)

        cnx.commit()
        cursor.close()

        return result

    def insert(cnx: db_connector, object: MembershipObject) -> MembershipObject:
        """Creates membership Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO membership (
                learning_group, person, is_open, is_accepted, timestamp
            ) VALUES (%s,%s, %s, %s, %s)
        """
        cursor.execute(command, (
            object.learning_group,
            object.person,
            object.is_open,
            object.is_accepted,
            object.timestamp
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM membership")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update_membership(cnx: db_connector, membership: int):
        """Updates membership."""
        cursor = cnx.cursor(buffered=True)

        command = """UPDATE membership
            SET is_accepted=TRUE, is_open=FALSE
            WHERE id=%s
            """
        cursor.execute(command, (membership,))

        cnx.commit()
        cursor.close()

    def delete_membership(cnx: db_connector, learning_group: int, person: int):
        """Deletes a membership from a group."""
        cursor = cnx.cursor(buffered=True)
        command = """
            DELETE FROM membership
            WHERE person=%s AND learning_group=%s
        """

        try:
            cursor.execute(command, (person, learning_group))
        except Exception:
            print("Member does not exist!")

        cnx.commit()
        cursor.close()

    def delete_own_membership(cnx: db_connector, learning_group: int, person: int):
        """Deletes own membership for a group."""
        cursor = cnx.cursor(buffered=True)
        command = """
            DELETE FROM membership
            WHERE person=%s AND learning_group=%s
        """

        try:
            cursor.execute(command, (person, learning_group))
        except Exception:
            print("Member does not exist!")

        cnx.commit()
        cursor.close()
