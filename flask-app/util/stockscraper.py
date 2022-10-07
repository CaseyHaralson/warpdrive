from bs4 import BeautifulSoup
import requests

def scrape(symbol):
    try:

        validateSymbol(symbol)

        url = f"https://www.marketwatch.com/investing/stock/{symbol}"
        page = requests.get(url)

        soup = BeautifulSoup(page.content, "html.parser")
        closeValue = soup.select('div.element--intraday div.intraday__close table tr td')[0].text

        return True, closeValue

    except ValueError as ex:
        return False, str(ex)
    except Exception as ex:
        return False, "There was a problem finding the symbol"



def validateSymbol(symbol):
    valid = True

    if valid and not isinstance(symbol, str):
        valid = False
    
    if valid and not symbol.isalnum():
        valid = False

    if valid and (len(symbol) == 0 or len(symbol) > 4):
        valid = False

    if not valid:
        raise ValueError("The symbol can only contain alphanumeric characters and can only be up to 4 characters long")