from flask_restx import fields
from src.configs.base import api

person_marshalling = api.inherit('Person', {
    'firstname': fields.String(attribute='firstname', description='Firstname of a Person', required=True),
    'lastname': fields.String(attribute='lastname', description='Lastname of a Person', required=True),
    'semester': fields.Integer(attribute='semester', description='Semester of a Person', required=True)


})