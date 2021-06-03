from app.apps.core.mapper import Mapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector


class ProfileMapper(Mapper):
    def find_all(cnx: db_connector):
        
        result = []
        cursor = cnx._cnx.cursor()
        cursor.execute("SELECT * from profiles")
        tuples = cursor.fetchall()

        for (id, personID, interests, type_, online,
            frequency, expertise, extroversion) in tuples:
            profile = ProfileObject()
            profile.id_(id)
            profile.personID(personID)
            profile.interests(interests)
            profile.type_(type_)
            profile.online(online)
            profile.frequency(frequency)
            profile.expertise(expertise)
            profile.extroversion(extroversion)

            result.append(profile)

        cnx._cnx.commit()
        cursor.close()

        return result

    def find_by_key(key):
        pass

    @staticmethod
    def insert(cnx: db_connector, object: ProfileObject) -> ProfileObject:
        """Create Profile Object."""
        cursor = cnx.cursor()
        command = """
            INSERT INTO profile (
                personID,
                interests,
                type_,
                online,
                frequency,
                expertise,
                extroversion
            ) VALUES (%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.personID,
            object.interests,
            object.type_,
            object.online,
            object.frequency,
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
