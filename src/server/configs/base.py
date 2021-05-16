from src.server.db import MySQLDatabaseConnector

from flask_restx import Api


class BaseConfigs:
    """Base Configs."""

    DEBUG = True


mysql_connector = MySQLDatabaseConnector()
api = Api(
    version="0.0.1",
    title="LernpartnerwebApp",
    description=(
        "It's an example project skeleton for Flask, "
        "FlaskRestful and Databases"
    )
)
