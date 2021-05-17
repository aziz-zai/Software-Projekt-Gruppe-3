from flask_restx import fields
from src.configs.base import api

profile_marshalling = api.inherit('Profile', {
    'owner': fields.Integer(attribute='_owner', description='Owner einer Person', required=True),
    'interests': fields.String(attribute='_interests', description='Lerninteressen einer Person', required=True),
    'type': fields.String(attribute='_type', description='Lerntyp einer Person', required=True),
    'online': fields.String(attribute='_online', description='Online Lerntyp einer Person', required=True),
    'frequency': fields.String(attribute='_frequency', description='Frequenz des Lernens einer Person', required=True),
    'expertise': fields.String(attribute='_expertise', description='Vorkenntnisse einer Person',required=True),
    'extroversion': fields.String(attribute='extroversion', description='Extroversion einer Person', required=True)
})