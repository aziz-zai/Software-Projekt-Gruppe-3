from app.apps.core.mapper import Mapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector


class ProfileMapper(Mapper):
    def find_all():
        pass

    def find_by_key(key):
        pass

    @staticmethod
    def insert(cnx: db_connector, object: ProfileObject) -> ProfileObject:
        """Create Profile Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO profile (
                personID, interests, type_, online, frequence, expertise, extroversion
            ) VALUES (%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.personID,
            object.interests,
            object.type_,
            object.online,
            object.frequence,
            object.expertise,
            object.extroversion
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM profile")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(object):
        pass

    def delete(object):
        pass
