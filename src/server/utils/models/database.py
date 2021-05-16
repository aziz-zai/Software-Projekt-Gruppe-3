import logging
import os
from typing import Any

import mysql.connector as connector


class MySQLDatabaseConnector:
    """Basic Connector for MySQL."""

    def __init__(self):
        self.cnx = None

    def __enter__(self):
        """Init your db connector here.

        Look at src > server > db > Mapper.py of your example code.
        """
        connection_arguments = {
            "user": os.getenv("DB_USER"),
            "password": os.getenv("DB_PASSWORD"),
            "host": os.getenv("DB_HOST"),
            "database": os.getenv("DB_DATABASE"),
            "port": os.getenv("DB_PORT")
        }
        self.cnx = connector.connect(**connection_arguments)
        self.cnx.autocommit = True

        logging.info("Connected to database at {}:{}".format(
            connection_arguments["host"], connection_arguments["port"]
        ))
        return self

    def __exit__(self, exc_type: Any, exc_val: Any, exc_tb: Any):
        """Define close conditions."""
        self.cnx.close()

        logging.info("Close Connection to database.")
