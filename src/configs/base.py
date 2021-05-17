from src.core.mysql_connector import MySQLConnector
from flask_restx import Api


class BaseConfigs:
    """Base Configs."""

    DEBUG = True


mysql_connector = MySQLConnector()
api = Api(
    version="0.0.1",
    title="LernpartnerWebApp",
    description=(
        "It's an example project skeleton for Flask, "
        "FlaskRestful and Databases"
    )
)
