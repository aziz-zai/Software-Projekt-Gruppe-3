from server.bo.Profile import Profile
from server.db.Mapper import Mapper


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
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from Profile")
        tuples = cursor.fetchall()

        for (id, frequence, interests , extroversion, expertise, online, type, ) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_frequence(frequence)
            profile.set_interests(interests)
            profile.set_extroversion(extroversion)
            profile.set_expertise(expertise)
            profile.set_online(online)
            profile.set_type(type)
            result.append(Profile)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, frequence, interests, extroversion, expertise, online, type  FROM Profile WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, profile) in tuples:
            profile = Profile()
            profile.set_id(id)
            profile.set_frequence(frequence)
            profile.set_interests(interests)
            profile.set_extroversion(extroversion)
            profile.set_expertise(expertise)
            profile.set_online(online)
            profile.set_type(type)
            result.append(Profile)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, profile):
        """Einfügen eines Account-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param account das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM Profile ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            profile.set_id(maxid[0]+1)

        command = "INSERT INTO Profile (id, frequence, interests) VALUES (%s,%s,%s,%s,%s,%s,%s)"
        data = (profile.get_id(), profile.get_frequence(), profile.get_interests())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()
        return profile

    def update(self, profile):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE Profile " + "SET frequence=%s, interests=%s, extroversion=%s, expertise=%s, online=%s, typ=%s WHERE id=%s"
        data = (profile.get_frequence(), profile.get_interests(), profile.get_extroversion(), profile.get_expertise(), profile.get_online(), profile.get_type())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self, profile):
        """Löschen der Daten eines Account-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM Profile WHERE id={}".format(profile.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProfileMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p) 
