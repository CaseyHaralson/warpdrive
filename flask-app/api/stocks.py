from flask import Blueprint
from util import stockscraper, dbwriter
from datetime import date

stocks = Blueprint('stocks', __name__, url_prefix='/stocks')

@stocks.route("/scrape/<symbol>", methods=['POST'])
def scrape(symbol):
    success, value = stockscraper.scrape(symbol)

    if success:
        today = date.today().strftime("%Y-%m-%d")
        success, value = dbwriter.writeToDb(symbol, today, value)

    # to catch or not catch server errors?
    # in this case I am returning results back to the UI so want the messages
    # but I don't want dirty responses, so the error messages have been cleaned up

    if success:
        return {'success': True, 'closeValue': value}
    else:
        return {'success': False, 'errorMessage': value}