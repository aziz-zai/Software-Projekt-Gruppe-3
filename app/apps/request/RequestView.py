from os import name
from app.apps.core.SecurityDecorator import secured
from flask_restx import Resource
from app.configs.base import api
from .RequestMarshalling import request_marshalling
from .RequestBO import RequestObject
from app.apps.core.SecurityDecorator import secured
from .RequestAdministration import RequestAdministration

namespace = api.namespace(
    "/request",
    description="Namespace for request APIs."
)


@namespace.route("/")
class AllRequestOperation(Resource):
    @namespace.marshal_with(request_marshalling)
    #@secured
    def get(self):
        request_list = RequestAdministration.get_all_requests()
        return request_list

@namespace.route("/<int:person>")
class RequestAPI(Resource):
    """Basic API for request."""
    @namespace.marshal_with(request_marshalling)
    #@secured
    def get(self, person: int):
        request = RequestAdministration.get_request_for_person(person)
        return request
@namespace.route("/<int:sender>/<int:receiver>")
class CreateRequestAPI(Resource):
    """Basic API for creating Requests"""
    @namespace.marshal_with(request_marshalling)
    #@secured
    def post(self, sender: int, receiver: int) -> dict:
        request = RequestObject
        request.sender=sender
        request.receiver=receiver
        request.is_open = False
        request.is_accepted = False
        request = RequestAdministration.send_request(request=request)
        return request