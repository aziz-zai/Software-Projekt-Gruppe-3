from typing import Dict
from flask import request
from flask_restx import Resource
from app.configs.base import mysql_connector, api
from src.server.db import ORM


namespace = api.namespace(
    "/your_api",
    description="Namespace for dummy APIs."
)


@namespace.route("/")
class YourAPI(Resource):
    """Basic API for dummy."""

    pass
