from app.apps.core.mapper import Mapper
from .ProfileBO import ProfileObject
from app.configs.base import db_connector


class ProfileMapper(Mapper):
    def find_all(cnx: db_connector):
        """Gibt alle Profile zurück"""

        result = []
        cursor = cnx.cursor()
        cursor.execute("""
        SELECT id, firstname,  lastname, person, interests, 
               type_, online, frequency, expertise, extroversion
        FROM profile
        """)
        tuples = cursor.fetchall()

        for (id, firstname, lastname, person, interests, type_, online,
            frequency, expertise, extroversion) in tuples:
            profile = ProfileObject()
            profile.id_ = id
            profile.firstname = firstname
            profile.lastname = lastname
            profile.person = person
            profile.interests = interests
            profile.type_ = type_
            profile.online = online
            profile.frequency = frequency
            profile.expertise = expertise
            profile.extroversion = extroversion

            result.append(profile)

        cnx.commit()
        cursor.close()

        return result

    def find_by_personID(cnx: db_connector, person: int) -> ProfileObject:
        """Auslesen eines Profils anhand der ID 'person' """

        result = None
        cursor = cnx.cursor(buffered=True)

        command = """
        SELECT
         id,
         firstname, 
         lastname,
         person,
         interests,
         type_,
         online,
         frequency,
         expertise,
         extroversion
        FROM profile WHERE person=%s
        """
        cursor.execute(command, (person, ))
        entity = cursor.fetchone()

        try:
            (id, firstname, lastname, person, interests,
             type_, online, frequency, expertise, extroversion) = entity
            result = ProfileObject(
                id_=id,
                firstname=firstname,
                lastname=lastname,
                interests=interests,
                person=person,
                type_=type_,
                online=online,
                frequency=frequency,
                expertise=expertise,
                extroversion=extroversion
           )
        except IndexError:
            result = None

        cnx.commit()
        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: ProfileObject) -> ProfileObject:
        """Erstellen eines Profils."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO profile (
                firstname,
                lastname,
                person,
                interests,
                type_,
                online,
                frequency,
                expertise,
                extroversion
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.firstname,
            object.lastname,
            object.person,
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

    def update(cnx: db_connector, object: ProfileObject):
        """Updating eines Profils"""
        cursor = cnx.cursor(buffered=True)

        command = "UPDATE profile " + "SET firstname=%s, lastname=%s, person=%s, interests=%s, type_=%s, online=%s, frequency=%s, expertise=%s, extroversion=%s WHERE id=%s"

        cursor.execute(command, (
            object.firstname,
            object.lastname,
            object.person,
            object.interests,
            object.type_,
            object.online,
            object.frequency,
            object.expertise,
            object.extroversion,
            object.id_
        ))

        cnx.commit()
        cursor.close()
