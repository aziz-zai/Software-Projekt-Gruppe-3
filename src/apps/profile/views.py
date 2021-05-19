from flask_restx import Resource
from src.configs.base import api
from .marshalling import profile_marshalling
from .business_object import Profile
from .mapper import ProfileMapper
from src.apps.profile.administration import Administration as ProfileAdm
from src.apps.person.administration import Administration as PersonAdm


namespace = api.namespace(
    "/profile",
    description="Namespace for profile APIs."
)

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class ProfileAPI(Resource):
    """Basic API for profile."""
    
    @api.marshal_with(profile_marshalling)
    def get(self):
        proadm = ProfileAdm()
        profiles = proadm.get_all_profiles()
        return profiles

    @api.marshal_with(profile_marshalling, code=200)
    @api.expect(profile_marshalling)
    @api.re
    
    class PersonRelatedPersonOperations(Resource): 
    
        @api.marshal_with(profile_marshalling)
        def get(self):
            persadm = PersonAdm()
            proadm = ProfileAdm()

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
            
            proadm = ProfileAdm()
            persadm = PersonAdm()

            p = persadm.get_person_by_id(id)

            if p is not None:
            # Jetzt erst macht es Sinn, für den Customer ein neues Konto anzulegen und dieses zurückzugeben.
                profile_of_person = proadm.create_profile_for_person(p)
                return profile_of_person
            else:
                return "Customer unknown", 500