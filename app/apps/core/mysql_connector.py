import os
from contextlib import AbstractContextManager
import mysql.connector as connector


class MySQLConnector(AbstractContextManager):
    """Abstrakte Basisklasse aller Mapper-Klassen"""

    def __init__(self):
        self._cnx = None

    def __enter__(self):
        """Was soll geschehen, wenn wir beginnen, mit dem Mapper zu arbeiten?"""

        """Wir testen, ob der Code im Kontext der lokalen Entwicklungsumgebung oder in der Cloud ausgeführt wird.
        Dies ist erforderlich, da die Modalitäten für den Verbindungsaufbau mit der Datenbank kontextabhängig sind."""
        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='root', password='Endgegner',
                                          unix_socket='/cloudsql/lernpartnerwebapp:europe-west3:lernapp-db-g3',
                                          database='mydb')
        else:
            self._cnx = connector.connect(
                user=os.getenv("DB_USER"),
                password=os.getenv("DB_PASSWORD"),
                host=os.getenv("DB_HOST"),
                database=os.getenv("DB_DATABASE"),
                port=os.getenv("DB_PORT"),
                )

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Was soll geschehen, wenn wir (evtl. vorübergehend) aufhören, mit dem Mapper zu arbeiten?"""
        self._cnx.close()
