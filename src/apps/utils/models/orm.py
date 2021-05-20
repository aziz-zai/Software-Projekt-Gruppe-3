import logging
from typing import List

import mysql.connector as connector
from .model import Model


def get_model_fields(model: Model) -> List[str]:
    """Get fields from table_obj dataclass."""
    return [field for field in model.table_obj.__dataclass_fields__]


class ORM:
    """Basic Database Handler."""

    @classmethod
    def insert(cls, cnx: connector, model: Model, **cells) -> Model:
        """Insert Row.

        Returns the Dataclass of the inserted Row.
        """
        names, values = zip(*cells.items())
        fieldstring = ",".join(names)
        value_placeholder_string = ",".join(["%s" for _ in values])
        sql = f"""
            INSERT INTO {model.__tablename__} ({fieldstring})
            VALUES ({value_placeholder_string})
        """
        cursor = cnx.cursor()
        cursor.execute(sql, values)
        obj = cls.get_last_entry(cnx=cnx, model=model)
        logging.info(f"Row for table {model.__tablename__} with id {obj.id} inserted.")
        return obj

    @classmethod
    def get_last_entry(cls, cnx: connector, model: Model) -> Model:
        """Get latest entry."""
        fields = get_model_fields(model=model)
        fieldstring = ",".join(fields)
        sql = f"""
            SELECT {fieldstring} FROM {model.__tablename__}
            WHERE id=(SELECT MAX(id) FROM {model.__tablename__})
        """
        cursor = cnx.cursor()
        cursor.execute(sql)
        response = cursor.fetchone()
        entry = dict(zip(fields, response))
        dummy_object = model(**entry)
        logging.info(f"Last entry in table {model.__tablename__} selected.")
        return dummy_object

    @classmethod
    def find_by_id(cls, cnx: connector, model: Model, id: int) -> Model:
        """Select single row by any filtertype.

        Returns a dataclass of the selected row.
        """
        fields = get_model_fields(model=model)
        fieldstring = ",".join(fields)
        sql = f"SELECT {fieldstring} FROM {model.__tablename__} WHERE id=%s"
        cursor = cnx.cursor()
        cursor.execute(sql, (id, ))
        response = cursor.fetchone()
        entry = dict(zip(fields, response))
        obj = model(**entry)
        logging.info(f"1 row in table {model.__tablename__} selected.")
        return obj

    @classmethod
    def find_all(cls, cnx: connector, model: Model) -> List[Model]:
        """Select multiple rows by any filtertype.

        Returns a list of dataclasses of the selected rows.
        """
        fields = get_model_fields(model=model)
        fieldstring = ",".join(fields)
        sql = f"SELECT {fieldstring} FROM {model.__tablename__}"
        cursor = cnx.cursor()
        cursor.execute(sql)
        response = cursor.fetchall()
        objects = []
        for entry in response:
            row = dict(zip(fields, entry))
            objects.append(model(**row))
        logging.info(f"{len(objects)} rows in table {model.__tablename__} selected.")
        return objects

    @classmethod
    def update(cls, cnx: connector, model: Model, id: int, **cells) -> Model:
        """Update Row.

        Returns the Dataclass of the updated Row.
        """
        names, values = zip(*cells.items())
        set_statement = ",".join([f"{name}=%s" for name in names])
        sql = f"""
            UPDATE {model.__tablename__}
            SET {set_statement}
            WHERE id=%s
        """
        cursor = cnx.cursor()
        cursor.execute(sql, list(values) + [id])
        logging.info(f"Row in table {model.__tablename__} with id {id} updated.")
        obj = model(id=id, **cells)
        return obj

    @classmethod
    def delete(cls, cnx: connector, model: Model, id: int) -> None:
        """Delete Row."""
        sql = f"DELETE FROM {model.__tablename__} WHERE id=%s"
        cursor = cnx.cursor()
        cursor.execute(sql, (id, ))
        logging.info(f"Row in table {model.__tablename__} with id {id} deleted.")
