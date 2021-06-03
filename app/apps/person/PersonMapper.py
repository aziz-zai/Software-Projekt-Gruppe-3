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
        id, email, google_user_id
        FROM person WHERE id=%s
        """
        cursor.execute(command,(key, ))
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

        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: PersonObject) -> PersonObject:
        """Create Person Object."""
        cursor = cnx.cursor()
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
        return object

    def update(object):
        pass

    def delete(object):
        pass
