from app.apps.core.mapper import Mapper
from .PersonBO import PersonObject
from app.configs.base import db_connector


class PersonMapper(Mapper):
    def find_all():
        pass

    def find_by_key(cnx: db_connector, key: int) -> PersonObject:
        result = None

        cursor = cnx.cursor()
        command = """
        SELECT
        id, firstname, lastname, email, google_user_id
        FROM person WHERE id=%s
        """
        cursor.execute(command,(key, ))
        tuples = cursor.fetchone()

        try:
            (id, firstname, lastname, email, google_user_id) = tuples[0]
            person = PersonObject()
            person.id_(id)
            person.firstname(firstname)
            person.lastname(lastname)
            person.email(email)
            person.google_user_id(google_user_id)
            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        cnx.commit()
        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: PersonObject) -> PersonObject:
        """Create Person Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO person (
                firstname, lastname, email, google_user_id
            ) VALUES (%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.firstname,
            object.lastname,
            object.email,
            object.google_user_id
    
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM person")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
