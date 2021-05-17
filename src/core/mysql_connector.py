import os
import mysql.connector as connector


class MySQLConnector():
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
