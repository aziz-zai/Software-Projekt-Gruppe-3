from flask_restx import fields
from flask_restx import Resource
from src.configs.base import api
from .GroupBO import Group
from .GroupMapper import GroupMapper
from .GroupAdmin import GroupAdmin

namespace = api.namespace(
    "/Group",
    description="Namespace for Group APIs."
)


group_marshalling = api.inherit('Group', {
    'personID': fields.Integer(attribute='_personID', description='ID einer Person', required=True),
    'groupID': fields.Integer(attribute='_interests', description='ID einer Gruppe', required=True),
})

@namespace.route(500, "Falls es zu einem Serverseitigen Fehler kommt")
@namespace.route("/")
class GroupAPI(Resource):
    """Basic API for Group."""
    
    @api.marshal_with(group_marshalling)
    def get(self):
        Groups = GroupAdmin.get_all_Groups()
        return Groups

    @api.marshal_with(group_marshalling, code=200)
    @api.expect(group_marshalling)
    @api.re
    def post(self) -> dict:
        """Create Group Endpoint."""
        
        #Group = GroupMapper.insert(object=Group)
        adm = GroupAdmin()
        Group = Group(api.payload)

        if Group is not None:
            p = adm.create_Group(
                Group.set_personID(),
                Group.set_groupID()
            )
            return p, 200
        else:

            return "", 500