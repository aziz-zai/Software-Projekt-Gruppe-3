from flask import Flask, Blueprint
from flask_cors import CORS
from flask_restx import Api
#from src.configs.base import BaseConfigs
#from src.configs.base import api


#from src.apps.profile.ProfileAPI import namespace as profile_namespace
#from src.apps.person.PersonAPI import namespace as person_namespace
#from src.apps.group.views import namespace as group_namespace
#from src.apps.conversation.views import namespace as conversation_namespace
#from src.apps.message.views import namespace as message_namespace


app = Flask(__name__)

CORS(app, resources=r'/LernApp/*')
api = Api(
    app, version='2.0', 
    title='LernApp',
    description='Murad ')

namespace = api.namespace(
    'LernApp',
    description='test')


if __name__ == '__main__':
    app.run(debug=True)
