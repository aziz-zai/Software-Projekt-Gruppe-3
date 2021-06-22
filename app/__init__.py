from flask import Flask, Blueprint
from flask_cors import CORS
from app.configs import BaseConfigs
from app.configs.base import api
from dotenv import load_dotenv

from app.apps.profile.ProfileViews import namespace as profile_namespace
from app.apps.person.PersonViews import namespace as person_namespace
from app.apps.message.MessageViews import namespace as message_namespace
from app.apps.conversation.ConversationViews import namespace as conversation_namespace
from app.apps.group.GroupViews import namespace as group_namespace
from app.apps.membership.MembershipViews import namespace as membership_namespace
from app.apps.chatroom.ChatRoomViews import namespace as chatroom_namespace


load_dotenv()


def create_app(config: BaseConfigs = BaseConfigs) -> Flask:
    """Return Flask app for project initialization."""
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(config)
    blueprint: Blueprint = Blueprint("api", __name__, url_prefix="/api")
    CORS(app, resources=r'/api/*',supports_credentials=True)
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
    api.add_namespace(message_namespace)
    api.add_namespace(conversation_namespace)
    api.add_namespace(group_namespace)
    api.add_namespace(membership_namespace)
    api.add_namespace(chatroom_namespace)

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="0.0.0.0")
