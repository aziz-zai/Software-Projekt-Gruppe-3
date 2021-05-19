from src.apps.profile.ProfileBO import Profile
from src.core.mapper import Mapper
from src.configs.base import mysql_connector


class ProfileMapper (Mapper):
    """Mapper-Klasse, die Profile-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Profile unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            cursor.execute("SELECT * from profile")
            tuples = cursor.fetchall()

        for (id, owner, semester, frequency, interests , extroversion, expertise, online, type_, ) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_owner(owner)
            profile.set_semester(semester),
            profile.set_frequency(frequency)
            profile.set_interests(interests)
            profile.set_extroversion(extroversion)
            profile.set_expertise(expertise)
            profile.set_online(online)
            profile.set_type_(type_)
            result.append(profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            command = "SELECT {id, owner, semester, frequency, interests, extroversion, expertise, online, type_}  FROM Profile WHERE id={}".format(id)
            cursor.execute(command)
            tuples = cursor.fetchone()

        for (id, owner, semester, frequency, interests, extroversion, expertise, online, type_) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_owner(owner)
            profile.set_semester(semester),
            profile.set_frequency(frequency)
            profile.set_interests(interests)
            profile.set_extroversion(extroversion)
            profile.set_expertise(expertise)
            profile.set_online(online)
            profile.set_type_(type_)
            result.append(Profile)

        con._cnx.commit()
        cursor.close()

        return result
    
    def find_by_owner_id(self, owner_id):

        
      with mysql_connector as con:
        result = []
        cursor = con._cnx.cursor()
        command = "SELECT id, owner, semester, frequency, interests, extroversion, expertise, online, type_  FROM Profile WHERE owner={} ORDER BY id".format(owner_id)
        cursor.execute(command)
        tuples = cursor.fetchone()

        for (id, owner, semester, frequency, interests, extroversion, expertise, online, type_) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_owner(owner)
            profile.set_semester(semester),
            profile.set_frequency(frequency)
            profile.set_interests(interests)
            profile.set_extroversion(extroversion)
            profile.set_expertise(expertise)
            profile.set_online(online)
            profile.set_type_(type_)
            result.append(Profile)

        con._cnx.commit()
        cursor.close()

        return result


    def insert(self, profile: Profile):
        """Einfügen eines Account-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        with mysql_connector as con:
            cnx = con._cnx
            cursor = cnx.cursor()
            command = """
                INSERT INTO profile (
                    owner, semester, frequency, interests, extroversion, expertise, online, type_
                ) VALUES (%s,%s,%s,%s,%s,%s)
            """
            cursor.execute(command, (
                profile.get_owner(),
                profile.get_semester(),
                profile.get_frequency(),
                profile.get_interests(),
                profile.get_extroversion(),
                profile.get_expertise(),
                profile.get_online(),
                profile.get_type_()
            ))
            cnx.commit()
        return profile

    def update(self, profile: Profile):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        with mysql_connector as con:
            cursor = con._cnx.cursor()

            command = "UPDATE Profile " + "SET owner= %s, semester=%s, frequency=%s, interests=%s, extroversion=%s, expertise=%s, online=%s, type_=%s WHERE id=%s"
            data = (
                profile.get_owner(),
                profile.get_semester(),
                profile.get_frequency(),
                profile.get_interests(),
                profile.get_extroversion(),
                profile.get_expertise(),
                profile.get_online(),
                profile.get_type_())
            cursor.execute(command, data)

            con._cnx.commit()
            cursor.close()

    def delete(self, profile: Profile):
        """Löschen der Daten eines Account-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        with mysql_connector as con:
            cursor = con._cnx.cursor()

            command = "DELETE FROM Profile WHERE id={}".format(profile.get_id())
            cursor.execute(command)

            con._cnx.commit()
            cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
        result = ProfileMapper.find_all()
        for p in result:
            print(p) 
