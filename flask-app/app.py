from flask import Flask

app = Flask(__name__)

# from application.app.folder.file import function
from api.main import api
app.register_blueprint(api)