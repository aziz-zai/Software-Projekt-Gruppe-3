from app.apps.core.mapper import Mapper
from .PersonBO import PersonObject
from app.configs.base import db_connector
from app.apps.profile.ProfileAdministration import ProfileAdministration


class PersonMapper(Mapper):

    def find_by_google_user_id(cnx: db_connector, google_user_id: str) -> PersonObject:
        """Gets a person by the google_user_id."""
        result = None

        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, email, google_user_id from `mydb`.`person`
        WHERE google_user_id=%s
        """
        cursor.execute(command, (google_user_id, ))
        entity = cursor.fetchone()

        try:
            (id, email, google_user_id) = entity
            result = PersonObject(
                id_=id,
                email=email,
                google_user_id=google_user_id
            )
        except TypeError:
            result = None

        cnx.commit()
        cursor.close()

        return result

    def find_by_key(cnx: db_connector, key: int) -> PersonObject:
        """Gets a Person by the key 'id'."""
        result = None

        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT
        id, email, google_user_id
        FROM person WHERE id=%s
        """
        cursor.execute(command, (key, ))
        entity = cursor.fetchone()

        try:
            (id, email, google_user_id) = entity
            result = PersonObject(
                id_=id,
                email=email,
                google_user_id=google_user_id
            )
        except IndexError:
            result = None

        cnx.commit()
        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: PersonObject) -> PersonObject:
        """Creates Person Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO person (
                 email, google_user_id
            ) VALUES (%s,%s)
        """
        cursor.execute(command, (
            object.email,
            object.google_user_id
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM person")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        ProfileAdministration.insert_profile(profile=None, person=object)
        return object

    def update(cnx: db_connector, person: PersonObject):
        """Updates a Person."""
        cursor = cnx.cursor(buffered=True)
        command = "UPDATE person " + "SET email=%s WHERE google_user_id=%s"
        cursor.execute(command, (
            person.email,
            person.google_user_id
        ))

        cnx.commit()
        cursor.close()

    def delete(cnx: db_connector, person: int):
        """Deletes a Person."""
        cursor = cnx.cursor(buffered=True)
        command = ("DELETE FROM person WHERE id=%s")
        try:
            cursor.execute(command, (person,))
        except Exception:
            print("Person does not exist!")

        cnx.commit()
        cursor.close()

    def find_potential_persons_for_group(cnx: db_connector, learning_group: int):
        """"Gets potential persons for a group."""

        result = []
        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, email, google_user_id FROM person
        WHERE id NOT IN (
        SELECT person FROM membership
            WHERE learning_group = %s
        )
        """
        cursor.execute(command, (learning_group,))
        tuples = cursor.fetchall()

        for(id, email, google_user_id) in tuples:
            person = PersonObject(
            id_=id,
            email=email,
            google_user_id=google_user_id
            )
            result.append(person)

        cnx.commit()
        cursor.close()

        return result

    def find_potential_singlechat(cnx: db_connector, person: int):
        """"Gets all potential persons for a SingleChat."""
        result = []

        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT * FROM person
        WHERE id !=%s AND id NOT IN (
        SELECT chatroom.receiver FROM chatroom
            WHERE chatroom.sender = %s
                AND (
                    is_open=True OR is_accepted=True
                )
        UNION
        SELECT chatroom.sender FROM chatroom
            WHERE chatroom.receiver = %s
                AND (
                    is_open=True OR is_accepted=True
                )
        )
        """
        cursor.execute(command, (person, person, person))
        tuples = cursor.fetchall()

        for (id, email, google_user_id) in tuples:
            person = PersonObject(
                id_=id,
                email=email,
                google_user_id=google_user_id
            )
            result.append(person)

        cnx.commit()
        cursor.close()

        return result
