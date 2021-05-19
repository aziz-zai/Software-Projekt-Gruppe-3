from flask_restx import Resource
from flask_restx import fields
from src.configs.base import api
from src.apps.profile.ProfileAdmin import ProfileAdmin
from src.apps.person.PersonAdmin import PersonAdmin
from src.main import namespace




profile_marshalling = api.inherit('Profile', {
    'id': fields.String(attribute='id', description='individuelle id', ),
    'owner': fields.Integer(attribute='_owner', description='Owner einer Person', required=True),
    'interests': fields.String(attribute='_interests', description='Lerninteressen einer Person', required=True),
    'type_': fields.String(attribute='_type', description='Lerntyp einer Person', required=True),
    'online': fields.String(attribute='_online', description='Online Lerntyp einer Person', required=True),
    'frequency': fields.String(attribute='_frequency', description='Frequenz des Lernens einer Person', required=True),
    'expertise': fields.String(attribute='_expertise', description='Vorkenntnisse einer Person',required=True),
    'extroversion': fields.String(attribute='extroversion', description='Extroversion einer Person', required=True)
})

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class ProfileAPI(Resource):
    """Basic API for profile."""
    
    @api.marshal_with(profile_marshalling)
    def get(self):
        proadm = ProfileAdmin()
        profiles = proadm.get_all_profiles()
        return profiles

    @api.marshal_with(profile_marshalling, code=200)
    @api.expect(profile_marshalling)
    @api.response(500, "Server Fehler")
    class PersonRelatedPersonOperations(Resource): 
    
        @api.marshal_with(profile_marshalling)
        def get(self, id):
            persadm = PersonAdmin()
            proadm = ProfileAdmin()

            # Zunächst benötigen wir den durch id gegebenen Customer.
            p = persadm.get_person_by_id(id)

            # Haben wir eine brauchbare Referenz auf ein Customer-Objekt bekommen?
            if p is not None:
            # Jetzt erst lesen wir die Konten des Customer aus.
                profile_of_person = proadm.get_profile_of_person(p)
                return profile_of_person
            else:
                return "Profile not found", 500
        def post(self, id):
            
            proadm = ProfileAdmin()
            persadm = PersonAdmin()

            p = persadm.get_person_by_id(id)

            if p is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
                profile_of_person = proadm.create_profile_for_person(p)
                return profile_of_person
            else:
                return "Customer unknown", 500