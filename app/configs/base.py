from app.utils.core.mysql_connector import MySQLConnector
from flask_restx import Api


class BaseConfigs:
    """Base Configs."""

    DEBUG = True


db_connector = MySQLConnector()

api = Api(
    version="0.0.1",
    title="Dummy Project",
    description=(
        "It's an example project skeleton for Flask, "
        "FlaskRestful and Databases"
    )
)
