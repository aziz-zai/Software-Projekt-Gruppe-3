from app.apps.core.mapper import Mapper
from .RequestBO import RequestObject
from app.configs.base import db_connector


class RequestMapper(Mapper):
    def find_all(cnx: db_connector):
        
        result = []
        cursor = cnx.cursor()
        cursor.execute("""
        SELECT id, is_accepted, sender, is_open, receiver
        FROM request
        """)
        tuples = cursor.fetchall()

        for (id, is_accepted, sender, is_open, receiver) in tuples:
            request = RequestObject()
            request.id_ = id
            request.is_accepted = is_accepted
            request.sender = sender
            request.is_open= is_open
            request.receiver=receiver

            result.append(request)

        cnx.commit()
        cursor.close()

        return result

    def find_by_request_id(cnx: db_connector, id: int) -> RequestObject:
        
        result = None
        cursor = cnx.cursor(buffered=True)
        
        command = """
        SELECT
         id,
         is_accepted, 
         sender,
         is_open,
         receiver

        FROM request WHERE id=%s
        """
        cursor.execute(command,(id, ))
        entity = cursor.fetchone()

        try:
            (id, is_accepted, sender, is_open, receiver ) = entity
            result = RequestObject(
                id_=id,
                is_accepted=is_accepted,
                sender=sender,
                is_open=is_open,
                receiver=receiver
           )
        except IndexError:
            result = None

        cursor.close()

        return result

    def find_by_person_id(cnx: db_connector, receiver: int) -> RequestObject:
        
        result = []
        cursor = cnx.cursor(buffered=True)
        
        command = """
        SELECT
         id,
         is_accepted, 
         is_open,
         sender,
         receiver,
        FROM request WHERE receiver=%s
        """
        cursor.execute(command,(receiver, ))
        tuples = cursor.fetchall()

        for (id, is_accepted, sender, is_open, receiver) in tuples:
            request = RequestObject()
            request.id_ = id
            request.is_accepted = is_accepted
            request.sender = sender
            request.is_open = is_open
            request.receiver = receiver

            result.append(request)

        cursor.close()

        return result

    @staticmethod
    def insert(cnx: db_connector, object: RequestObject) -> RequestObject:
        """Create Request Object."""
        cursor = cnx.cursor(buffered=True)
        command = """
            INSERT INTO request (
                is_accepted, 
                sender,
                is_open,
                receiver
            ) VALUES (%s,%s,%s,%s)
        """
        cursor.execute(command, (
            object.is_accepted,
            object.sender,
            object.is_open,
            object.receiver
        ))
        cnx.commit()
        cursor.execute("SELECT MAX(id) FROM request")
        max_id = cursor.fetchone()[0]
        object.id_ = max_id
        return object


    def delete(object):
        pass
