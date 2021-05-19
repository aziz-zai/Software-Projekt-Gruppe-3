from src.apps.person.PersonBO import Person
from src.core.mapper import Mapper
from src.configs.base import mysql_connector


class PersonMapper (Mapper):
    """Mapper-Klasse, die Person-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Personen unseres Systems.

        :return Eine Sammlung mit Personen-Objekten, die sämtliche Personen
                des Systems repräsentieren.
        """
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            cursor.execute("SELECT * from Person")
            tuples = cursor.fetchall()

        for (id, firstname, lastname, semester) in tuples:
            person= Person()
            person.set_id(id)
            person.set_firstname(firstname)
            person.set_lastname(lastname)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            command = "SELECT id, firstname, lastname FROM Person WHERE id={}".format(id)
            cursor.execute(command)
            tuples = cursor.fetchone()

        for (id, firstname, lastname) in tuples:
            person = Person
            person.set_id(id)
            person.set_firstname(firstname)
            person.set_lastname(lastname)
            result.append(Person)

        con._cnx.commit()
        cursor.close()

        return result


    def insert(self, person : Person):
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
                INSERT INTO person (
                    firstname, lastname
                ) VALUES (%s,%s,%s)
            """
            cursor.execute(command, (
                person.get_firstname(),
                person.get_lastname(),

            ))
            cnx.commit()
        return person

    def update(self, person: Person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        with mysql_connector as con:
            cursor = con._cnx.cursor()

            command = "UPDATE Person " + "SET firstname= %s, lastname=%s, semester=%s WHERE id=%s"
            data = (person.get_firstname(), person.get_lastname(),)
            cursor.execute(command, data)

            con._cnx.commit()
            cursor.close()

    def delete(self, person: Person):
        """Löschen der Daten eines Account-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        with mysql_connector as con:
            cursor = con._cnx.cursor()

            command = "DELETE FROM Person WHERE id={}".format(person.get_id())
            cursor.execute(command)

            con._cnx.commit()
            cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
        result = PersonMapper.find_all()
        for p in result:
            print(p) 