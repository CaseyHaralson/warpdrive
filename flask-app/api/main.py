from flask import Blueprint

api = Blueprint('api', __name__, url_prefix='/api')


from api.stocks import stocks
api.register_blueprint(stocks)



@api.route("/test")
def hello_world():
    return {"hello": "world"}