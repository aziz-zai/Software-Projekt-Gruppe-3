import mysql.connector as connector
import os
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

class Mapper (AbstractContextManager, ABC):

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