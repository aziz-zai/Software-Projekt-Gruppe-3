from src.apps.conversation.ConversationBO import Conversation
from src.core.mapper import Mapper
from src.configs.base import mysql_connector

class ConversationMapper (Mapper):
    """Mapper-Klasse, die Conversation-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller conversation unseres Systems.

        :return Eine Sammlung mit User-Objekten, die sämtliche Benutzer
                des Systems repräsentieren.
        """
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            cursor.execute("SELECT * from conversation")
            tuples = cursor.fetchall()

        for (id, person_id, group_id, conversationstatus) in tuples:
            conversation = Conversation()
            conversation.set_id(id)
            conversation.set_person_id(person_id)
            conversation.set_group_id(group_id)
            conversation.set_conversationstatus(conversationstatus)
            
            result.append(conversation)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            command = "SELECT id, person_id, group_id, conversationstatus FROM Conversation WHERE id={}".format(key)
            cursor.execute(command)
            tuples = cursor.fetchone()

        for (id, person_id, group_id, conversationstatus) in tuples:
            conversation = Conversation()
            conversation.set_id(id)
            conversation.set_person_id(person_id)
            conversation.set_group_id(group_id)
            conversation.set_conversationstatus(conversationstatus)
            result.append(Conversation)

        con._cnx.commit()
        cursor.close()

        return result


    def insert(self,conversation):
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
                INSERT INTO conversation (
                    person_id, group_id, conversationstatus
                ) VALUES (%s,%s,%s)
            """
            cursor.execute(command, (
                conversation.get._person_id(),
                conversation.get_group_id(),
                conversation.get_conversationstatus()

            ))
            cnx.commit()
            cursor.execute("SELECT MAX(id) FROM conversation")
            max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object

    def update(self, conversation):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param account das Objekt, das in die DB geschrieben werden soll
        """
        with mysql_connector as con:
            cursor = con._cnx.cursor()

            command = "UPDATE Conversation " + "SET person= %s, group_id=%s, conversationstatus=%s, WHERE id=%s"
            data = (conversation.get_owner(),conversation.get_interests(),   conversation.get_frequency(),  conversation.get_type_(), conversation.get_online(),   conversation.get_extroversion(),   conversation.get_expertise() )
            cursor.execute(command, data)

            con._cnx.commit()
            cursor.close()

    def delete(self,    conversation):
        """Löschen der Daten eines Account-Objekts aus der Datenbank.

        :param account das aus der DB zu löschende "Objekt"
        """
        with mysql_connector as con:
            cursor = con._cnx.cursor()

            command = "DELETE FROM Conversation WHERE id={}".format(conversation.get_id())
            cursor.execute(command)

            con._cnx.commit()
            cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
        result = ConversationMapper.find_all()
        for p in result:
            print(p) 
