from logging import captureWarnings
from app.apps.core.mapper import Mapper
from .PersonBO import PersonObject
from app.configs.base import db_connector
from app.apps.profile.ProfileAdministration import ProfileAdministration


class PersonMapper(Mapper):

    def find_by_google_user_id(cnx: db_connector, google_user_id: str) -> PersonObject:
        result = None

        cursor = cnx.cursor(buffered=True)
        command = """
        SELECT id, email, google_user_id from `mydb`.`person` 
        WHERE google_user_id=%s
        """
        cursor.execute(command,(google_user_id, ))
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

        cursor.close()

        return result

    def find_by_key(cnx: db_connector, key: int) -> PersonObject:
        result = None

        cursor = cnx.cursor(buffered=True)
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
        ProfileAdministration.insert_profile(profile = None, person = object)
        return object

    def update(cnx: db_connector, person: PersonObject):
        
        cursor = cnx.cursor(buffered=True)
        command = "UPDATE person " + "SET email=%s WHERE google_user_id=%s"
        cursor.execute(command, (
            person.email,
            person.google_user_id
        ))

        cnx.commit()
        cursor.close()

    def delete(object):
        pass
