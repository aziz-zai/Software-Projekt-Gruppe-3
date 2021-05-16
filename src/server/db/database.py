import logging
from typing import Any, List
import os

import mysql.connector as connector
 
    class MySQLDatabaseConnector:
        """Basic Connector for MySQL."""

    def __init__(self):
        self.cnx = None

    def __enter__(self):
        """Init your db connector here.

        """
        connection_arguments_cloud = {
            "user": "root",
            "password": "Endgegner",
            "unix_socket": "",
            "database": "mydb",
            "port": "3306"
        }

        connection_arguments_local = {
            "user": "root",
            "password": "Endgegner",
            "host": "127.0.0.1",
            "database": "mydb",
            "port": "3306"
        }
        
        
        if os.getenv('GAE_ENV', '').startswith('standard'):
                """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
                Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
                Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

                self._cnx = connector.connect(connection_arguments_cloud)
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._cnx = connector.connect(connection_arguments_local)

        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any):
        """Define close conditions."""
        self.cnx.close()

        logging.info("Close Connection to database.")
