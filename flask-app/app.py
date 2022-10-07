from flask import Flask

app = Flask(__name__)

from api.main import api
app.register_blueprint(api)