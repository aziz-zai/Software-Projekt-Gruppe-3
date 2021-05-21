from abc import ABC, abstractmethod


class Mapper (ABC):
    @staticmethod
    @abstractmethod
    def find_all():
        """Lies alle Tupel aus und gib sie als Objekte zurück."""
        pass

    @staticmethod
    @abstractmethod
    def find_by_key(key):
        """Lies den einen Tupel mit der gegebenen ID (vgl. Primärschlüssel) aus."""
        pass

    @staticmethod
    @abstractmethod
    def insert(object):
        """Füge das folgende Objekt als Datensatz in die DB ein."""
        pass

    @staticmethod
    @abstractmethod
    def update(object):
        """Ein Objekt auf einen bereits in der DB enthaltenen Datensatz abbilden."""
        pass

    @staticmethod
    @abstractmethod
    def delete(object):
        """Den Datensatz, der das gegebene Objekt in der DB repräsentiert löschen."""
        pass
