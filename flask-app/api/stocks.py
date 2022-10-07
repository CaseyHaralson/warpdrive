from flask import Blueprint
from util import stockscraper

stocks = Blueprint('stocks', __name__, url_prefix='/stocks')

@stocks.route("/scrape/<symbol>")
def scrape(symbol):
    success, value = stockscraper.scrape(symbol)

    if success:
        return {'success': True, 'closeValue': value}
    else:
        return {'success': False, 'errorMessage': value}