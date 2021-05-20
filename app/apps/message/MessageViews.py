from flask_restx import Resource
from app.configs.base import api
from .ProfileMarshalling import profile_marshalling
from .ProfileBO import ProfileObject
from .ProfileAdministration import ProfileManager


namespace = api.namespace(
    "/profile",
    description="Namespace for profile APIs."
)


@namespace.route("/")
class ProfileAPI(Resource):
    """Basic API for profile."""

    @api.marshal_with(profile_marshalling, code=201)
    @api.expect(profile_marshalling)
    def post(self) -> dict:
        """Create Profile Endpoint."""
        profile = ProfileObject(**api.payload)
        profile = ProfileManager.insert_profile(profile=profile)
        return profile
