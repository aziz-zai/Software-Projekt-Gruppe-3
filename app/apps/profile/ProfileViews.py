from os import name
from app.apps.core.auth import AuthView
from app.configs.base import api
from .ProfileMarshalling import profile_marshalling
from app.apps.group.GroupMarshalling import group_marshalling
from .ProfileBO import ProfileObject
from .ProfileAdministration import ProfileAdministration
from app.apps.person.PersonAdministration import PersonAdministration
from app.apps.core.auth import AuthView


namespace = api.namespace(
    "/profile",
    description="Namespace for profile APIs."
)


@namespace.route("/")
class AllProfilesOperation(AuthView):
    @namespace.marshal_with(profile_marshalling)
    def get(self):
        profile_list = ProfileAdministration.get_all_profiles()
        return profile_list

@namespace.route("/")
class ProfileAPI(AuthView):
    """Basic API for profile."""
    @namespace.marshal_with(profile_marshalling)
    def get(self, person: int):
        pers = PersonAdministration.get_person_by_id(person)
        profile = ProfileAdministration.get_profile_of_person(pers)
        return profile

    @namespace.marshal_with(profile_marshalling)
    def put(self, person: int) -> dict:
        profile = ProfileObject(**api.payload)
        profile.person = person
        profile.id_ = person
        profile = ProfileAdministration.update_profile(profile=profile)
        return profile

@namespace.route("/match_person")
class ProfileMatchAPI(AuthView):
    """Basic API for Matchmaking"""
    @namespace.marshal_with(profile_marshalling)
    def get(self):
        matched_profiles, matched_groups = ProfileAdministration.matching(person=self.person.id_)
        return matched_profiles #PersonList zurückgeben

@namespace.route("/match_group")
class GroupMatchAPI(AuthView):
    """Basic API for Matchmaking"""
    @namespace.marshal_with(group_marshalling)
    def get(self):
        matched_profiles, matched_groups = ProfileAdministration.matching(person=self.person.id_)
        return matched_groups   #GroupList zurückgeben