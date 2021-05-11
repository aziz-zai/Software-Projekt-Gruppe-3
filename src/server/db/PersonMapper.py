from server.bo.Person import Person
from server.db.Mapper import Mapper


class PersonMapper (Mapper):
    """Mapper-Klasse, die Customer-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Personen.

        :return Eine Sammlung mit Personen-Objekten, die sämtliche User
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * from person")
        tuples = cursor.fetchall()

        for (id, firstname, lastname) in tuples:
            person = Person()
            person.set_profileID(id)
            person.set_firstname(firstName)
            person.set_surname(lastName)
            result.append(person)
            
        self._cnx.commit()
        cursor.close()

        return result

    def find_by_lastname(self, surname):
        """Auslesen aller Kunden anhand des Nachnamen.

        :param name Nachname der zugehörigen Kunden.
        :return Eine Sammlung mit Person-Objekten, die sämtliche Kunden
            mit dem gewünschten Nachnamen enthält.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, firstname, surename FROM persons WHERE surname LIKE '{}' ORDER BY surname".format(surname)
        
        

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, firstname, surname) in tuples:
            person = Person()
            person.set_id(id)
            person.set_firstname(firstname)
            person.set_surname(surname)
            result.append(person)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines User mit vorgegebener ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param key Primärschlüsselattribut (->DB)
        :return Person-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, firstname, surname FROM persons WHERE id={}".format(key)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, firstname, surname) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_firstname(firstname)
            person.set_lastname(surname)
            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, person):
        """Einfügen eines Person-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param person das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM person ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            person.set_id(maxid[0]+1)

        """
        Eine Möglichkeit, ein INSERT zu erstellen, ist diese:
            cursor.execute("INSERT INTO persons (id, firstname, surname) VALUES ('{}','{}','{}')"
                           .format(person.get_id(),person.get_firstname(),person.get_surname()))
        Dabei wird auf String-Formatierung zurückgegriffen.
        """
        """
        Eine andere Möglichkeit, ist diese:
        """
        command = "INSERT INTO persons (id, firstname, surname) VALUES (%s,%s,%s)"
        data = (person.get_id(), person.get_firstname(), person.get_surname())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

        return person

    def update(self, person):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param person das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._cnx.cursor()

        command = "UPDATE persons " + "SET firstname=%s, surname=%s WHERE id=%s"
        data = (person.get_firstname(), person.get_surname(), person.get_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self,person):
        """Löschen der Daten eines Person-Objekts aus der Datenbank.

        :param person das aus der DB zu löschende "Objekt"
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM persons WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with PersonMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)