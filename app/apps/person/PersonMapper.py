from app.apps.core.mapper import Mapper
from .PersonBO import PersonObject
from app.configs.base import db_connector


class PersonMapper(Mapper):
    def find_all():
        pass

    def find_by_key(key):
        pass

    @staticmethod
    def insert(cnx: db_connector, object: PersonObject) -> PersonObject:
        """Create Person Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO person (
                firstname, lastname
            ) VALUES (%s,%s)
        """
        cursor.execute(command, (
            object.firstname,
            object.lastname,
    
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
