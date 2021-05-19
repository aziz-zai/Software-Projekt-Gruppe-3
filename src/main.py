from flask import Flask, Blueprint
from flask_cors import CORS
from src.configs.base import BaseConfigs
from src.configs.base import api


from src.apps.profile.ProfileAPI import namespace as profile_namespace
from src.apps.person.PersonAPI import namespace as person_namespace
#from src.apps.group.views import namespace as group_namespace
#from src.apps.conversation.views import namespace as conversation_namespace
#from src.apps.message.views import namespace as message_namespace




def create_app(config: BaseConfigs = BaseConfigs) -> Flask:
    """Return Flask app for project initialization."""
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)
    blueprint: Blueprint = Blueprint("api", __name__, url_prefix="/api")
    CORS(app, resources=r'/api/*')
    init_lazily(blueprint)
    app.register_blueprint(blueprint)
    init_routes()

    return app


def init_lazily(blueprint: Blueprint) -> None:
    """Lazy init."""
    api.init_app(blueprint)


def init_routes() -> None:
    """Init Routes by using namespaces."""
    api.add_namespace(profile_namespace)
    api.add_namespace(person_namespace)
   # api.add_namespace(group_namespace)
   # api.add_namespace(conversation_namespace)
   # api.add_namespace(message_namespace)

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0")
