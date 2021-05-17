from flask_restx import Resource
from src.configs.base import api
from .marshalling import profile_marshalling
from .business_object import Profile
from .mapper import ProfileMapper
from .administration import Administration


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
        profiles = Administration.get_all_profiles()
        return profiles

    @api.marshal_with(profile_marshalling, code=200)
    @api.expect(profile_marshalling)
    @api.re
    def post(self) -> dict:
        """Create Profile Endpoint."""
        
        #profile = ProfileMapper.insert(object=profile)
        adm = Administration()
        profile = Profile(api.payload)

        if profile is not None:
            p = adm.create_profile(
                profile.set_owner(),
                profile.set_frequency(),
                profile.set_interests(),
                profile.set_extroversion,
                profile.set_expertise(),
                profile.set_online(),
                profile.set_type_())
            return p, 200
        else:

            return "", 500