from app.apps.core.mapper import Mapper
from .MembershipBO import MembershipObject
from app.configs.base import db_connector


class MembershipMapper(Mapper):
    def find_by_person(cnx: db_connector, person: int):
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, learning_group, person, is_open, is_accepted, timestamp from `mydb`.`membership`
            WHERE person=%s AND is_open=%s AND is_accepted=%s
            """
        cursor.execute(command, (person, False, True))
        tuples = cursor.fetchall()

        for (id, learning_group, person, is_open, is_accepted, timestamp) in tuples:
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

    def find_by_groupID(cnx: db_connector, groupID: int):
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, learning_group, person, is_open, is_accepted, timestamp from `mydb`.`membership`
            WHERE learning_group=%s
        """
        cursor.execute(command, (groupID, ))
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

    def find_all_requests(cnx: db_connector, person: int):
        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
            SELECT id, learning_group, person, is_open, is_accepted, timestamp from `mydb`.`membership`
            WHERE person=%s AND is_open=%s AND is_accepted=%s
        """
        cursor.execute(command, (person, True, False))
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
        """Create Membership Object."""
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

    def update(object):
        pass

    def delete_membership(cnx: db_connector, learning_group: int, person: int):
        cursor = cnx.cursor(buffered=True)
        command = """
            DELETE FROM membership
            WHERE person=%s AND learning_group=%s AND is_open=%s AND is_accepted=%s
        """

        try:
            cursor.execute(command, (person, learning_group, False, True))
        except Exception:
            print("Member does not exist!")

        cnx.commit()
        cursor.close()

    def delete_membership_request(cnx: db_connector, learning_group: int, person: int):
        cursor = cnx.cursor(buffered=True)
        command = """
            DELETE FROM membership
            WHERE person=%s AND learning_group=%s AND is_open=%s AND is_accepted=%s
        """

        try:
            cursor.execute(command, (person, learning_group, True, False))
        except Exception:
            print("Member does not exist!")

        cnx.commit()
        cursor.close()
