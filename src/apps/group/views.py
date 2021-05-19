from flask_restx import Resource
from src.configs.base import api
from .marshalling import group_marshalling
from .business_object import Group
from .mapper import GroupMapper
from .administration import Administration


namespace = api.namespace(
    "/Group",
    description="Namespace for Group APIs."
)

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class GroupAPI(Resource):
    """Basic API for Group."""
    
    @api.marshal_with(group_marshalling)
    def get(self):
        Groups = Administration.get_all_Groups()
        return Groups

    @api.marshal_with(group_marshalling, code=200)
    @api.expect(group_marshalling)
    @api.re
    def post(self) -> dict:
        """Create Group Endpoint."""
        
        #Group = GroupMapper.insert(object=Group)
        adm = Administration()
        Group = Group(api.payload)

        if Group is not None:
            p = adm.create_Group(
                Group.set_personID(),
                Group.set_groupID()
            )
            return p, 200
        else:

            return "", 500