from src.apps.message.MessageBO import Message
from src.core.mapper import Mapper
from src.configs.base import mysql_connector


class MessageMapper (Mapper):
    """Mapper-Klasse, die Message-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Messages unseres Systems.

        :return Eine Sammlung mit Message-Objekten, die sämtliche Nachrichten
                des Systems repräsentieren.
        """
        with mysql_connector as con:
            result = []
            cursor = con._cnx.cursor()
            cursor.execute("SELECT * from Message")
            tuples = cursor.fetchall()

        for (content) in tuples:
            message = Message()
            message.set_content(content)
            result.append(message)

        con._cnx.commit()
        cursor.close()

        return result