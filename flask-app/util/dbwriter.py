import os

# this is just going to write to a file
# instead of the project requiring a database as well

def writeToDb(symbol, date, value):
    try:

        documentPath = os.path.join(os.getcwd(), f"..\\fakedb\{symbol}.txt")

        # create the file if it doesn't exist
        if not os.path.isfile(documentPath):
            with open(documentPath, 'x') as f:
                f.write("")

        # add the new data to the top of the file
        with open(documentPath, 'r+') as f:
            content = f.read()
            f.seek(0, 0)
            f.write(date.rstrip() + " " + value.rstrip() + "\n" + content)
        
        return True, value

    except Exception as ex:
        return False, "There was a problem writing to the fakedb"