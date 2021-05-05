import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

class Mapper (AbstractContextManager, ABC):

    def __init__(self):
        self.cnx = None
    
    def __enter__(self):
        
        if os.getenv('GAE_ENV', '').startswith('standard'):

            self._cnx = connector.connect(user='root', password='Endgegner',
                                          unix_socket='/cloudsql/python-bankprojekt-thies:europe-west3:bank-db-thies',
                                          database='lernpartnerwebapp')
        else:
            self._cnx = connector.connect(user='root', password='Endgegner',
                                  host='127.0.0.1',
                                  database='mydb')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Was soll geschehen, wenn wir (evtl. vorübergehend) aufhören, mit dem Mapper zu arbeiten?"""
        self._cnx.close()


    @abstractmethod
    def find_all(self):
        pass

    @abstractmethod
    def find_by_key(self, key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

    @abstractmethod
    def insert(self, object):
        """Füge das folgende Objekt als Datensatz in die DB ein."""
        pass

    @abstractmethod
    def update(self, object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    @abstractmethod
    def delete(self, object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass
