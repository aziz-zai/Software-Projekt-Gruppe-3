from flask import request
from flask_restx import Resource
from google.auth.transport import requests
import google.oauth2.id_token
from app.apps.person.PersonAdministration import PersonAdministration


class AuthView(Resource):
    def dispatch_request(self, *args, **kwargs):
        firebase_request_adapter = requests.Request()
        person = self.authenticate_user(firebase_request_adapter)
        if not person:
            return {}, 401  # UNAUTHORIZED !!!
        self.person = person
        return super().dispatch_request(*args, **kwargs)

    def authenticate_user(self, firebase_request_adapter):
        id_token = request.cookies.get("token")
        email = request.cookies.get("email")
        google_user_id = request.cookies.get("google_user_id")
        claims = None
        if not id_token:
            return None
        try:
            # Verify the token against the Firebase Auth API. This example
            # verifies the token on each page load. For improved performance,
            # some applications may wish to cache results in an encrypted
            # session store (see for instance
            # http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
            claims = google.oauth2.id_token.verify_firebase_token(
                id_token, firebase_request_adapter)
            if not claims:
                return None
            google_user_id = claims.get("user_id")
            email = claims.get("email")
            person = PersonAdministration.get_person_by_google_user_id(google_user_id)
            if person is not None:
                """Fall: Der Benutzer ist unserem System bereits bekannt.
                Wir gehen davon aus, dass die google_user_id sich nicht ändert.
                Wohl aber können sich der zugehörige Klarname (name) und die
                E-Mail-Adresse ändern. Daher werden diese beiden Daten sicherheitshalber
                in unserem System geupdated."""
                person.email = email
                PersonAdministration.save_person(person)
            else:
                """Fall: Der Benutzer war bislang noch nicht eingelogged.
                Wir legen daher ein neues User-Objekt an, um dieses ggf. später
                nutzen zu können.
                """
                person = PersonAdministration.insert_person(
                    email=email,
                    google_user_id=google_user_id
                )
            return person
        except ValueError:
            # This will be raised if the token is expired or any other
            # verification checks fail.
            return None
