from flask import Blueprint
from util import stockscraper, dbwriter
from datetime import date

stocks = Blueprint('stocks', __name__, url_prefix='/stocks')

@stocks.route("/scrape/<symbol>")
def scrape(symbol):
    success, value = stockscraper.scrape(symbol)

    if success:
        today = date.today().strftime("%Y-%m-%d")
        success, value = dbwriter.writeToDb(symbol, today, value)

    if success:
        return {'success': True, 'closeValue': value}
    else:
        return {'success': False, 'errorMessage': value}